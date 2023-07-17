import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { spaceValidation } from "@/lib/validation/product";

export const spaceRouter = createTRPCRouter({
  createSpace: publicProcedure
    .input(spaceValidation)
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.prisma.space.create({
        data: {
          authorId: input.authorId,
          name: input.name,
          cityId: input.cityId,
          description: input.description,
          numberRooms: input.numberRooms,
          numberBathrooms: input.numberBathrooms,
          maxGuest: input.maxGuest,
          price: input.price,
          longitude: input.longitude,
          latitude: input.latitude,
        },
      });
      return space;
    }),
  updateSpace: publicProcedure
    .input(spaceValidation)
    .mutation(async ({ ctx, input }) => {
      const isSpaceExist = await ctx.prisma.space.findFirst({
        where: {
          id: input.id,
        },
      });

      //is it even exist?
      if (!isSpaceExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "There is no such data.",
        });
      }

      const updatedSpace = await ctx.prisma.space.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          cityId: input.cityId,
          description: input.description,
          numberRooms: input.numberRooms,
          numberBathrooms: input.numberBathrooms,
          maxGuest: input.maxGuest,
          price: input.price,
          longitude: input.longitude,
          latitude: input.latitude,
        },
      });

      return updatedSpace;
    }),
  deleteSpace: publicProcedure
    .input(spaceValidation)
    .mutation(async ({ ctx, input }) => {
      const isSpaceExist = await ctx.prisma.space.findFirst({
        where: {
          id: input.id,
        },
      });

      //check data
      if (!isSpaceExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "There is no such data.",
        });
      }

      const deleteSpaceData = await ctx.prisma.space.delete({
        where: {
          id: input.id,
        },
        // this will return a plain object contains id and name {id: data.id, name: data.name}
        select: {
          name: true,
        },
      });

      return deleteSpaceData;
    }),
});
