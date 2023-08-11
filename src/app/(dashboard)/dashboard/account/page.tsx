import * as React from "react";
import { Shell } from "@/components/ui/shell";
import ManageAccountForm from "@/components/forms/manage-account-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Account",
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

export default async function DashboardAccountPage() {
  return (
    <Shell custom="flex flex-col h-[700px] lg:h-screen justify-center lg:items-center p-2 lg:px-20">
      <ManageAccountForm />
    </Shell>
  );
}
