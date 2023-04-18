import { s3Client } from "@/lib/s3";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getImageUrls = async (key: string) => {
  await s3Client.getSignedUrlPromise("getObject", {
    Bucket: "mynatureskitchen",
    key: key,
  });
};

export const cookingClassRouter = createTRPCRouter({
  getClasses: publicProcedure.query(async ({ ctx }) => {
    const cookingClasses = await ctx.prisma.cookingClass.findMany();
    return cookingClasses;
  }),
  getAvailability: publicProcedure.query(async ({ ctx }) => {
    
    const availableClasses = await ctx.prisma.availability.findMany({
      include: { class: true },
    });

    const formattedData = availableClasses.map((availability) => ({
      date: availability.startDate,
      title: availability.class.title,
      description: availability.class.description,
    }));
  
    return formattedData;
  }),
  bookClasses: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id, userId } = input;
    }),
  checkClassesStatus: publicProcedure.query(async () => {
    await sleep(1000);
    return true;
  }),
});
