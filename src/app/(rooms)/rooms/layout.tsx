import * as React from "react";
import SiteHeader from "@/components/layouts/site-header";

export default function RoomsLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}
