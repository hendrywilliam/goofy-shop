import { PropsWithChildren } from "react";
import SiteHeader from "@/components/layouts/site-header";

export default function BecomeHostLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <SiteHeader />
      {children}
    </main>
  );
}
