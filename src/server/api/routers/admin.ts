import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "@/lib/auth";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { req } = ctx;
      const { email, password } = input;
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(new TextEncoder().encode(getJWTSecretKey()))
      }
    }),
});
