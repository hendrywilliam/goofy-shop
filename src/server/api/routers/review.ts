import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { reviewValidation, idReviewValidation } from "@/lib/validation/review";

export const reviewRouters = createTRPCRouter({
  createReview: publicProcedure
    .input(reviewValidation)
    .mutation(async (context) => {
      const createReview = await context.ctx.prisma.review.create({
        data: {
          userId: context.input.userId,
          content: context.input.content,
          spaceId: context.input.spaceId,
        },
      });
      return createReview;
    }),
  deleteReview: publicProcedure
    .input(idReviewValidation)
    .mutation(async (context) => {
      const deleteReview = await context.ctx.prisma.review.delete({
        where: {
          id: context.input.id,
        },
        select: {
          content: true,
        },
      });
      return deleteReview;
    }),
});
