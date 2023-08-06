import { PropsWithChildren } from "react";
import SiteHeader from "@/components/layouts/site-header";
import SiteFooter from "@/components/layouts/site-footer";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
