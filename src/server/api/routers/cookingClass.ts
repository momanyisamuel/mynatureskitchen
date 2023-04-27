import { publicProcedure, createTRPCRouter } from "../trpc";
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
      date: availability.date,
      title: availability.class.title,
      description: availability.class.description,
    }));

    return formattedData;
  }),
  checkClassesStatus: publicProcedure.query(async () => {
    await sleep(1000);
    return true;
  }),
});
