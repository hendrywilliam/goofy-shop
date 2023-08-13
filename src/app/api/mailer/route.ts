import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";
import { NewComerEmail } from "@/components/emails/new-comer-email";

//@todo please make this fancier
export async function POST(request: Request) {
  const id = await resend.sendEmail({
    from: "ska73punk@resend.dev",
    //test mode only able send an email to registered account
    to: "hendriwilliam29@gmail.com",
    subject: "hello world",
    react: NewComerEmail(),
  });
  return NextResponse.json({
    success: true,
    email_id: id,
  });
}
