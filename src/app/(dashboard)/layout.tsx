import { PropsWithChildren } from "react";
import SiteHeader from "@/components/layouts/site-header";
import SiteFooter from "@/components/layouts/site-footer";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
