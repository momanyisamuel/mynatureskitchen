import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "@/lib/auth";
import cookie from "cookie";
import { TRPCError } from "@trpc/server";
import { s3Client } from "@/lib/s3";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx;
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
          .sign(new TextEncoder().encode(getJWTSecretKey()));

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );

        return { success: true };
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }),
  addCookingClass: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        product: z.string(),
        availability: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, product,  availability } = input;

      try {
        // Create the `CookingClass` in the database
        const cookingClass = await ctx.prisma.cookingClass.create({
          data: { title, description, product },
        });

        // Create the `Availability` objects and associate them with the `CookingClass`

        const availabilityData = {
          date: availability,
          classId: cookingClass.id,
        };

        const createdAvailability = await ctx.prisma.availability.createMany({
          data: availabilityData,
        });

        return { ...cookingClass, availability: createdAvailability };
      } catch (error) {
        console.log(error);
      }
    }),
  deleteCookingClass: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {

        await ctx.prisma.availability.deleteMany({
          where: { classId: id },
        });

        const cookingClass = await ctx.prisma.cookingClass.delete({
          where: { id },
        });

        return cookingClass;

      } catch (error) {
        console.log(error)
      }
    }),
});


