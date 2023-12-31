import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query((opts) => {
    return {
      user: opts.ctx.auth?.userId,
    };
  }),
  helloProtected: protectedProcedure.query((opts) => {
    return {
      user: opts.ctx.auth.userId,
      message: "You are connected into protected procedure",
    };
  }),
});
