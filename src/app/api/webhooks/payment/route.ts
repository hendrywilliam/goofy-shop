import { prisma } from "@/server/db";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try {
    const { order_id, status_code, gross_amount, signature_key, fraud_status } =
      body;

    //verify signature
    const hashedData = CryptoJS.SHA512(
      `${order_id}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
    );

    //fraud detected and we ballin
    if (fraud_status === "deny") {
      throw new Error(
        "Transaction rejected, transaction considered as a fraud."
      );
    }

    if (hashedData != signature_key) {
      throw new Error("Transaction rejected, signature key is not valid.");
    }

    if (body.transaction_status === "settlement") {
      const reservationId = order_id.split("-")[2];

      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          paymentStatus: "PAID",
        },
      });
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, {
        status: 400,
      });
    }

    return new Response("Something went wrong, please try again later.", {
      status: 400,
    });
  }
}
