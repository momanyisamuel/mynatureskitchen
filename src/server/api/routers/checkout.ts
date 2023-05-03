import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import _stripe from "stripe";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { type Price } from "@/types/types";
import { useRouter } from 'next/router';
const stripe = new _stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

interface ProductModel {
  id: string;
  name: string;
  unit_amount: number | null;
}

const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  price: z.object({
    id: z.string(),
    unit_amount: z.number(),
  }),
  product: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
  }),
});

const ProductListSchema = z.array(ProductSchema);

export const CheckoutRouter = createTRPCRouter({
  getPrices: publicProcedure.query(async ({ }) => {
    const result: ProductModel[] = []
    const prices = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    })
    for (const price of prices.data) {
      const product: ProductModel = {
        id: price.id,
        unit_amount: price.unit_amount,
        name: 'Unnamed Product',
      };

      if (typeof price.product === 'string') {
        const stripeProduct = await stripe.products.retrieve(price.product);
        product.name = stripeProduct.name;
      } else if (price.product !== null && typeof price.product === 'object') {
        product.name = (price?.product as _stripe.Product).name;
      }
      result.push(product);
    }
    return result;
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

    const filteredClasses: Price[] = availableClasses.filter(availableClass => productIds.includes(availableClass.class.product))
      .map(filteredClass => {
        const { date, class: cookingClass } = filteredClass;
        const price = productList?.data.find(product => product.id === filteredClass.class.product);
        const product = productList?.data.find(product => product.id === filteredClass.class.product)?.product;

        // Type guard to check whether 'product' is of type 'Product'
        const productObj = typeof product === 'object' && product !== null &&
          ('name' in product) && ('description' in product) && ('images' in product)
          ? product
          : undefined;

        if (price && product && productObj) {
          return {
            id: cookingClass.id,
            title: cookingClass.title,
            description: cookingClass.description,
            date: new Date(date),
            price: {
              id: price.id,
              unit_amount: price.unit_amount,
            },
            product: {
              id: productObj.id,
              name: productObj.name,
              description: productObj.description,
              images: productObj.images,
            }
          }
        }

        return undefined

        // return {startDate, endDate, price, product, cookingClass};
      }).filter(price => price !== undefined) as Price[];

    if (!filteredClasses) {
      throw new Error("No classes available")
    }

    return filteredClasses
  }),
  checkoutSession: publicProcedure.input(z.object({
    products: ProductListSchema
  })).mutation(async ({ input }) => {
    const { products } = input
    if (products.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No products" })
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.product.name,
          },
          unit_amount: product.price.unit_amount,
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
      success_url: `https://mynatureskitchen.com/success`,
      cancel_url: `https://mynatureskitchen.com/classes`,
    })

    if (!session) {
      throw new Error("could not create session")
    }

    return {
      url: session.url,
      session: session
    }
  })
});
