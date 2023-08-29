import { prisma } from "@/server/db";
import { notFound } from "next/navigation";

//host profile
export async function getHostProfile(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      firstName: true,
      lastName: true,
      description: true,
      location: true,
      avatar: true,
    },
  });

  if (!user) {
    notFound();
  }

  //otherwise return user
  return user;
}
