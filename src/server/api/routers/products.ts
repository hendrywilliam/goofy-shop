import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { productValidation } from "@/lib/validation/product";

export const productsRouter = createTRPCRouter({
  createProduct: publicProcedure
    .input(productValidation)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: input,
      });
      return product;
    }),
});
