import { PropsWithChildren } from "react";
import SiteNavbar from "@/components/layouts/site-nav";

export default function LobbyLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <SiteNavbar />
      {children}
    </div>
  );
}
