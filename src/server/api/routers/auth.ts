import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

const registerInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerOutput = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
  }),
  token: z.string(),
});
export const authRouter = createTRPCRouter({
  addUser: publicProcedure
    .input(registerInput)
    .mutation(({ ctx, input }) => {
        const {email, password} = input
        const createUser = ctx.prisma
    }),
  login: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id, userId } = input;
    }),
});
