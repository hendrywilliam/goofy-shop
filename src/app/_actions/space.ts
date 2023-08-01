"use server";

import { type FilteredValue } from "@/types";
import { prisma } from "@/server/db";

//@todo make it fancier
export async function getSpaces(searchParams: FilteredValue) {
  if (Object.keys(searchParams).length > 0) {
    let queries = [];

    //searchParams returns a plain javascript object.
    for (const [key, value] of Object.entries(searchParams)) {
      if (key === "min_price") {
        queries.push({
          price: {
            gte: +value,
          },
        });
      } else if (key === "max_price") {
        queries.push({
          price: {
            lte: +value,
          },
        });
      } else if (key === "rooms") {
        queries.push({
          numberRooms: {
            equals: +value,
          },
        });
      } else if (key === "bathrooms") {
        queries.push({
          numberBathrooms: {
            equals: +value,
          },
        });
      } else if (key === "guest") {
        queries.push({
          maxGuest: {
            equals: +value,
          },
        });
      }
    }
    const result = await prisma.space.findMany({
      where: {
        AND: [...queries],
      },
    });
    return result;
  }
  const results = await prisma.space.findMany();
  return results;
}

export async function getSpecificSpace(id: string) {
  const result = await prisma.space.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}

export async function getSpecificCity(id: string) {
  const result = await prisma.city.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}
