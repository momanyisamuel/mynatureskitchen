import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import _stripe from "stripe";
import { env } from "@/env.mjs";
const stripe = new _stripe(env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const CheckoutRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const productList = await stripe.prices.list({
      active: true,
      limit: 10,
      expand: ['data.product']
    })

    return productList.data
  }),
});
