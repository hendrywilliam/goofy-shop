import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  spaceValidation,
  idSpaceValidation,
  updateBookingDates,
} from "@/lib/validation/space";

export const spaceRouter = createTRPCRouter({
  createSpace: protectedProcedure
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
          availableDates: input.availableDates,
          latitude: input.latitude,
          amenities: input.amenities,
          photos: input.photo,
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
  //get all dates (available, and booked dates)
  getSpaceDetails: publicProcedure
    .input(idSpaceValidation)
    .query(async ({ ctx, input }) => {
      const dates = await ctx.prisma.space.findFirst({
        where: {
          id: input.id,
        },
        select: {
          availableDates: true,
          bookedDates: true,
          price: true,
        },
      });
      return dates;
    }),
  updateBookingDates: protectedProcedure
    .input(updateBookingDates)
    .mutation(async ({ ctx, input }) => {
      //is it even exist
      const isSpaceExist = await ctx.prisma.space.findFirst({
        where: {
          id: input.id,
        },
        select: {
          bookedDates: true,
        },
      });

      if (!isSpaceExist) {
        throw new TRPCError({
          message: "There is no such space.",
          code: "NOT_FOUND",
        });
      }

      const previousBookDates = isSpaceExist.bookedDates;
      const updateSpaceBookdates = await ctx.prisma.space.update({
        where: {
          id: input.id,
        },
        data: {
          bookedDates: [...previousBookDates, ...input.bookedDates],
        },
        select: {
          bookedDates: true,
        },
      });
      return updateSpaceBookdates;
    }),
});
