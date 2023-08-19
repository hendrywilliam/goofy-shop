import { prisma } from "@/server/db";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const { order_id, status_code, gross_amount, signature_key, transaction_id } =
    body;

  //verify signature
  const hashedData = CryptoJS.SHA512(
    `${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
  );

  if (hashedData != signature_key) {
    console.log("reached failed");
    return new Response("Operation rejected, signature key is not valid", {
      status: 400,
    });
  }

  // its confusing :/
  // any idea how to obtain custom_field / metadata?

  // if (body.transaction_status === "pending") {
  //   const a = await prisma.reservation.create({
  //     data: {
  //       endDate: new Date(metadata.endDate),
  //       startDate: new Date(metadata.startDate),
  //       guestId: metadata.guestId,
  //       placeId: metadata.spaceId,
  //       totalPrice: gross_amount,
  //       transactionId: transaction_id,
  //     },
  //   });
  // }

  // if (body.transaction_status === "settlement") {
  //   await prisma.reservation.update({
  //     where: {
  //       transactionId: transaction_id,
  //     },
  //     data: {
  //       paymentStatus: "PAID",
  //     },
  //   });
  // }

  return new Response(null, { status: 200 });
}
