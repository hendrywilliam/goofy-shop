import { prisma } from "@/server/db";
import { Event } from "@/types";
import { resend } from "@/lib/resend";
import { NewComerEmail } from "@/components/emails/new-comer-email";

export async function POST(req: Request) {
  try {
    const request = await req.json();

    const event: Event = request;
    const { type, data, object } = event;

    if (type === "user.created" && object === "event") {
      const userCreated = await prisma.user.create({
        data: {
          email: data.email_addresses[0].email_address,
          clerkId: data.id,
          description: "",
          isPartner: false,
          location: "",
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          avatar: data.image_url,
        },
      });

      const { firstName, lastName } = userCreated;

      await resend.sendEmail({
        from: "nurdana@resend.dev",
        to: "hendriwilliam29@gmail.com",
        subject: "Welcome my G!🎉",
        react: NewComerEmail({ fullName: `${firstName} ${lastName}` }),
      });

      return new Response("User created", { status: 201 });
    }

    if (type === "user.updated" && object === "event") {
      const user = await prisma.user.findFirst({
        where: {
          clerkId: data.id,
        },
      });

      if (!user) throw new Error("Unable to find user");

      await prisma.user.update({
        where: {
          id: user.id,
          clerkId: data.id,
        },
        data: {
          //description update is not happened here
          firstName: data.first_name,
          lastName: data.last_name,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, {
        status: 400,
      });
    }

    return new Response("Something went wrong.", {
      status: 400,
    });
  }
}
