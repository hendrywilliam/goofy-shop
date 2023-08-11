import SignInForm from "@/components/forms/signin-form";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage account",
  description: "Manage your account, change password and avatar.",
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

export default async function SigninPage() {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-3/4 lg:w-1/2 p-4 rounded-md">
        <SignInForm />
      </div>
    </div>
  );
}
