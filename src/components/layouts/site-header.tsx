import Link from "next/link";
import MainNavigationMenu from "./main-nav";
import AccountNavigationMenu from "./account-nav";

export default function SiteHeader() {
  return (
    <nav className="flex flex-col lg:flex-row w-full h-max lg:h-[80px] border-b px-2 py-2 lg:py-0 lg:px-20">
      <div className="flex w-full lg:w-1/3 lg:p-0 items-center justify-center lg:justify-start">
        <Link href="/" className="flex flex-row font-semibold gap-1">
          SPACESHOP
        </Link>
      </div>
      <MainNavigationMenu />
      <AccountNavigationMenu />
    </nav>
  );
}
