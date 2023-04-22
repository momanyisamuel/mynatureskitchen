import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import _stripe from "stripe";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
const stripe = new _stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const ProductSchema = z.object({
  id: z.string(),
  object: z.string(),
  active: z.boolean(),
  billing_scheme: z.string(),
  created: z.number(),
  currency: z.string(),
  custom_unit_amount: z.nullable(z.number()),
  livemode: z.boolean(),
  lookup_key: z.nullable(z.string()),
  metadata: z.record(z.unknown()),
  nickname: z.nullable(z.string()),
  product: z.object({
    id: z.string(),
    object: z.string(),
    active: z.boolean(),
    attributes: z.array(z.string()),
    created: z.number(),
    default_price: z.string(),
    description: z.string(),
    images: z.array(z.string()),
    livemode: z.boolean(),
    metadata: z.record(z.unknown()),
    name: z.string(),
    package_dimensions: z.nullable(z.unknown()),
    shippable: z.nullable(z.unknown()),
    statement_descriptor: z.nullable(z.unknown()),
    tax_code: z.nullable(z.unknown()),
    type: z.string(),
    unit_label: z.nullable(z.unknown()),
    updated: z.number(),
    url: z.nullable(z.unknown()),
  }),
  recurring: z.object({
    aggregate_usage: z.nullable(z.unknown()),
    interval: z.string(),
    interval_count: z.number(),
    trial_period_days: z.nullable(z.unknown()),
    usage_type: z.string(),
  }),
  tax_behavior: z.string(),
  tiers_mode: z.nullable(z.unknown()),
  transform_quantity: z.nullable(z.unknown()),
  type: z.string(),
  unit_amount: z.number(),
  unit_amount_decimal: z.string(),
});

const ProductListSchema = z.array(ProductSchema);

export const CheckoutRouter = createTRPCRouter({
  getPrices: publicProcedure.query(async({})=>{
    const prices = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    })

    return prices.data
  }),
  getAvailableClasses: publicProcedure.query(async ({ ctx }) => {

    const availableClasses = await ctx.prisma.availability.findMany({
      include: { class: true },
    });
    
    if (!availableClasses) {
      throw new Error("No available classes")
    }
    
    const productList = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    })
    
    const productIds = productList.data.map(product => product.id);
    
    const filteredClasses = availableClasses.filter(availableClass => productIds.includes(availableClass.class.product))
    .map(filteredClass => {
      const { startDate, endDate, class: cookingClass } = filteredClass;
      const price = productList?.data.find(product => product.id === filteredClass.class.product);
      const product = productList?.data.find(product => product.id === filteredClass.class.product)?.product;
  
      return {startDate, endDate, price, product, cookingClass};
    });

    if(!filteredClasses) {
      throw new Error("No classes available")
    }
  
  console.log(filteredClasses);
  

    return filteredClasses
  }),
  checkoutSession: publicProcedure.input(z.object({
    products: ProductListSchema
  })).mutation(async ({ ctx, input }) => {
    const { products } = input
    if (products.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No products" })
    }
    try {
      console.log(products)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: products.map((product) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.product.name,
            },
            unit_amount: product.unit_amount,
          },
          quantity: 1,
        })),
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Pickup in store',
            },
          },
        ],
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/classes`,
      })

      return {
        url: session.url || ""
      }

    } catch (error) {
      let msg = ''
      if (error instanceof Error) {
        msg = error.message
      }
      throw new TRPCError({
        message: msg || 'Payment failed',
        code: 'INTERNAL_SERVER_ERROR',
      })
    }
  })
});
