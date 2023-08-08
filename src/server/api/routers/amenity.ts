import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  amenityValidation,
  onlyIdAmenityValidation,
} from "@/lib/validation/amenity";

export const amenityRouter = createTRPCRouter({
  createAmenity: publicProcedure
    .input(amenityValidation)
    .mutation(async (context) => {
      const createAmenity = await context.ctx.prisma.amenity.create({
        data: {
          name: context.input.name,
        },
      });

      return createAmenity;
    }),
  deleteAmenity: publicProcedure
    .input(onlyIdAmenityValidation)
    .mutation(async (context) => {
      const deleteAmenity = await context.ctx.prisma.amenity.delete({
        where: {
          id: context.input.id,
        },
        select: {
          name: true,
        },
      });
      return deleteAmenity;
    }),
  getAllAmenities: protectedProcedure.query(async ({ ctx }) => {
    const allAmenities = await ctx.prisma.amenity.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!allAmenities) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No amenity data found.",
      });
    }
    return allAmenities;
  }),
});
