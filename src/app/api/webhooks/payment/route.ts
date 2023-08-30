import { prisma } from "@/server/db";
import CryptoJS from "crypto-js";
import { resend } from "@/lib/resend";
import { ReservationSuccessEmail } from "@/components/emails/reservation-success-email";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try {
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      fraud_status,
      transaction_status,
    } = body;

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

    if (transaction_status === "settlement") {
      const reservationId = order_id.split("-")[2];
      //update reservation data
      const reservationData = await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          paymentStatus: "PAID",
        },
        select: {
          guestId: true,
          spaceId: true,
          id: true,
        },
      });
      const { guestId, spaceId, id } = reservationData;

      //obtain space details from db
      const spaceName = await prisma.space.findFirst({
        where: {
          id: spaceId,
        },
        select: {
          name: true,
        },
      });

      if (!spaceName) {
        throw new Error("Unable to find space");
      }

      //obtain guest data from db
      const guestData = await prisma.user.findFirst({
        where: {
          clerkId: guestId,
        },
        select: {
          firstName: true,
        },
      });

      if (!guestData) {
        throw new Error("Unable to find guest data");
      }

      await resend.sendEmail({
        from: "nurdana@resend.dev",
        to: "hendriwilliam29@gmail.com",
        subject: "Thanks my G!🎉",
        react: ReservationSuccessEmail({
          fullName: guestData?.firstName as string,
          itemName: spaceName?.name,
          orderId: id,
        }),
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
