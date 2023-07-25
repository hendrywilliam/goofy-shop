import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { cityValidation, idCityValidation } from "@/lib/validation/city";

export const cityRouter = createTRPCRouter({
  createCity: publicProcedure
    .input(cityValidation)
    .mutation(async ({ ctx, input }) => {
      const city = ctx.prisma.city.create({
        data: {
          name: input.name,
        },
      });
      return city;
    }),
  deleteCity: publicProcedure
    .input(idCityValidation)
    .mutation(async ({ ctx, input }) => {
      const deleteCity = ctx.prisma.city.delete({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return deleteCity;
    }),
  getAllCity: protectedProcedure.query(async ({ ctx }) => {
    const cities = ctx.prisma.city.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return cities;
  }),
});
