"use server";
import { prisma } from "@/server/db";

export async function createReservation({
  endDate,
  guestId,
  spaceId,
  startDate,
  totalPrice,
}: {
  endDate: string;
  startDate: string;
  guestId: string;
  spaceId: string;
  totalPrice: string;
}) {
  const reservationId = await prisma.reservation.create({
    data: {
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      guestId,
      spaceId,
      totalPrice: +totalPrice,
    },
    select: {
      id: true,
    },
  });
  return reservationId;
}

export async function updateReservation({
  id,
  transaction_id,
}: {
  id: string;
  transaction_id: string;
}) {
  await prisma.reservation.update({
    where: {
      id,
    },
    data: {
      transactionId: transaction_id,
    },
  });
  return;
}
