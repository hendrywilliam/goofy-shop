import { PropsWithChildren } from "react";
import SiteHeader from "@/components/layouts/site-header";

export default function LobbyLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}
