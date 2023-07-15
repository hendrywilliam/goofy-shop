import { createTRPCRouter, publicProcedure } from "../trpc";
import { authValidation } from "@/lib/validation/auth";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  /**
   * mutation accepts a function which accepts an object called "opts"
   * opts contains ctx (context), and an input from the user.
   */

  signup: publicProcedure
    .input(authValidation)
    .mutation(async ({ ctx, input }) => {
      const userWithEmail = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (userWithEmail && userWithEmail.email) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "The email address you're trying to add, has been registered as an account already",
        });
      }

      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
        },
      });

      return {
        code: "SUCCESS",
        data: user.id,
        message: `Success created a new account: ${user.id}`,
      };
    }),
});
