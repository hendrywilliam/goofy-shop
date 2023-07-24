import { PropsWithChildren } from "react";
import SiteHeader from "@/components/layouts/site-header";
import SiteFooter from "@/components/layouts/site-footer";

export default function BecomeHostLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
