import BecomeHostForm from "@/components/forms/become-host-form";
import { Shell } from "@/components/ui/shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Host spaces",
  description: "Host your places and spaces",
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

export default function BecomeAHostPage() {
  return (
    <Shell custom="min-h-screen h-max flex flex-col lg:flex-row px-0 lg:px-20">
      <Shell custom="flex p-4 lg:p-0 border-b w-full lg:w-1/4 lg:border-r lg:border-b-0">
        <div className="flex flex-col w-full h-max text-start pt-2">
          <h1 className="font-calsans text-3xl">Become a host</h1>
          <p className="text-muted">Host anything you want</p>
          <p className="text-muted">Your place your rules.</p>
        </div>
      </Shell>
      <BecomeHostForm />
    </Shell>
  );
}
