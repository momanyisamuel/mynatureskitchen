import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "@/lib/auth";
import cookie from "cookie";
import { TRPCError } from "@trpc/server";
import { s3Client } from "@/lib/s3";
import { MAX_FILE_SIZE } from "@/constants/config";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { req, res } = ctx;
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
  createPresignedUrl: adminProcedure
    .input(z.object({ filetype: z.string() }))
    .mutation(async ({ input }) => {
      const id = nanoid();
      const ex = input.filetype.split("/")[1];
      const key = `${id}.${ex}`;

      const { url, fields } = (await new Promise((resolve, reject) => {
        s3Client.createPresignedPost(
          {
            Bucket: "mynatureskitchen",
            Fields: { key },
            Expires: 60,
            Conditions: [
              ["content-length-range", 0, MAX_FILE_SIZE],
              ["starts-with", "$Content-type", "image/"],
            ],
          },
          (err, data) => {
            if (err) return reject(err);
            resolve(data);
          }
        );
      })) as any as { url: string; fields: any };

      console.log(url, key)

      return { url, fields, key };
    }),
  addCookingClass: adminProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      product: z.string(),
      imageUrl: z.string(),
      availability: z.array(
        z.object({
          startDate: z.string(),
          endDate: z.string(),
        })
      ),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { title, description, product, imageUrl, availability } = input;

    // Create the `CookingClass` in the database
    const cookingClass = await ctx.prisma.cookingClass.create({
      data: { title, description, product, imageUrl },
    });

    console.log(availability)

    // Create the `Availability` objects and associate them with the `CookingClass`
    
    const availabilityData = availability.map((avail) => ({
      startDate: new Date(avail.startDate),
      endDate: new Date(avail.endDate),
      classId: cookingClass.id,
    }));

    console.log(availabilityData)

    const createdAvailability = await ctx.prisma.availability.createMany({
      data: availabilityData,
    });

    console.log(createdAvailability)

    return { ...cookingClass, availability: createdAvailability };
  }),
  deleteCookingClass: adminProcedure
    .input(z.object({ imageUrl: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, imageUrl } = input;

      await s3Client
        .deleteObject({ Bucket: "mynatureskitchen", Key: imageUrl })
        .promise();

        await ctx.prisma.availability.deleteMany({
          where: { classId: id },
        });

        const cookingClass = await ctx.prisma.cookingClass.delete({
          where: { id },
        });
    
        return cookingClass;
    }),
});


