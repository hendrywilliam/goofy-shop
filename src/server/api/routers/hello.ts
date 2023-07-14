import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      data: "hello world",
    };
  }),
  greeting: publicProcedure.query(({ ctx }) => {
    return {
      data: "good morning",
    };
  }),
});
