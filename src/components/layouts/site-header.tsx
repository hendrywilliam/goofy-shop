import Link from "next/link";
import { IconGlobe } from "../icons/icon-globe";
import MainNavigationMenu from "./main-nav";
import AccountNavigationMenu from "./account-nav";

export default function SiteHeader() {
  return (
    <nav className="flex flex-row w-full h-[80px] border-b px-20">
      <div className="flex w-1/3 items-center">
        <Link href="/" className="flex flex-row font-semibold gap-1">
          <IconGlobe className="self-center" />
          SPACESHOP
        </Link>
      </div>
      <MainNavigationMenu />
      <AccountNavigationMenu />
    </nav>
  );
}
