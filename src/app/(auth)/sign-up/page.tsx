import RegistrationForm from "@/components/forms/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account to get started",
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

export default function SignupPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-1/2 p-4 rounded-md">
        <RegistrationForm />
      </div>
    </div>
  );
}
