import * as React from "react";
import ForgotPasswordForm from "@/components/forms/forget-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget password",
  description: "Reset your password",
  applicationName: "spaceshop",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "Typescript", "Fureya"],
  authors: [{ name: "yrdneh", url: "https://www.instagram.com/jkt48.freya" }],
  creator: "yrdneh",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function ForgetPassword() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-3/4 lg:w-1/2 p-4 rounded-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
