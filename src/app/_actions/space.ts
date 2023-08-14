"use server";

import { type FilteredValue } from "@/types";
import { prisma } from "@/server/db";
import { currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";

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

//get specific space with its slug
export async function getSpecificSpace(id: string) {
  try {
    const result = await prisma.space.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  } catch (err) {
    //@todo make it fancier
    notFound();
  }
}

//get cities for city selection in become a host
export async function getSpecificCity(id: string) {
  const result = await prisma.city.findUnique({
    where: {
      id: id,
    },
  });
  return result;
}

//get owned spaces data for table
export async function getOwnedSpaces() {
  const user = await currentUser();
  if (!user) {
    throw new Error("You are not logged in");
  }
  const { id } = user;
  const ownedSpaces = await prisma.space.findMany({
    where: {
      authorId: id,
    },
  });
  return ownedSpaces;
}

//get amenities for specific page
//id comes from getSpecific amenities result
export async function getAllAmenities(amenitiesId: string[]) {
  const amenities = await prisma.amenity.findMany({
    where: {
      id: {
        in: amenitiesId,
      },
    },
  });
  return amenities;
}

export async function isSpaceBookable(spaceId: string, dateSequence: Date[]) {
  const result = await prisma.space.findFirst({
    where: {
      id: spaceId,
    },
    select: {
      bookedDates: true,
    },
  });

  //first element found in intersection will return false
  const convertedDates = result?.bookedDates?.map((item) => {
    return item.toDateString();
  });

  for (const date of dateSequence) {
    if (convertedDates?.includes(date.toDateString())) {
      return false;
    }
  }

  return true;
}
