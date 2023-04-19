import { createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { cookingClassRouter } from "./routers/cookingClass";
import { CheckoutRouter } from "./routers/checkout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  cookingClass: cookingClassRouter,
  checkout: CheckoutRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
