import { createTRPCRouter, publicProcedure } from "../trpc";
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
          spaceId: context.input.spaceId,
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
});
