"use server";

import { prisma } from "@/server/db";
import { type ClerkDataUser } from "@/types";
import { resend } from "@/lib/resend";

export async function addUserToDatabase(data: ClerkDataUser) {
  const res = await prisma.user.create({
    data: {
      clerkId: data.createdUserId as string,
      description: "",
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });
  return res;
}
