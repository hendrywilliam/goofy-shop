"use client";

import { Avatar } from "@/components/ui/avatar";
import { IconHamburger } from "@/components/icons/icon-hamburger";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { IconLogout } from "@/components/icons/icon-logout";
import { IconSetting } from "@/components/icons/icon-setting";
import { IconAccount } from "@/components/icons/icon-account";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuHeader,
} from "@/components/ui/dropdown-menu";
import { IconDashboard } from "../icons/icon-dashboard";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function AccountNavigationMenu() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  function logOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="flex w-full justify-between mt-4 lg:mt-0 lg:w-1/3 lg:justify-end items-center">
      <Link href="/become-a-host" className="mr-2">
        <Button custom="w-max" variant="primary">
          Become a host
        </Button>
      </Link>
      <DropdownMenuRoot>
        <DropdownMenuTrigger custom="flex justify-between">
          <IconHamburger className="self-center" />
          <Avatar src={user?.imageUrl} />
        </DropdownMenuTrigger>
        <DropdownMenuContent custom="mt-4 lg:mt-2">
          <DropdownMenuHeader>
            {!isSignedIn ? (
              <div className="flex flex-col p-2">
                <p className="text-sm">Welcome, guest!</p>
              </div>
            ) : (
              <div className="flex flex-col p-2">
                <p className="text-xs text-start">You are signed in as:</p>
                <p className="font-bold text-sm">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            )}
          </DropdownMenuHeader>
          <div>
            <ul>
              <li>
                <Button
                  custom="flex flex-row w-full justify-center gap-2"
                  variant="ghost"
                  onClick={() => router.push("/dashboard/account")}
                >
                  <IconAccount className="flex self-center" />
                  Account
                </Button>
              </li>
              <li>
                <Button
                  custom="flex flex-row w-full justify-center gap-2"
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                >
                  <IconDashboard className="flex self-center" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  custom="flex flex-row w-full justify-center gap-2"
                  variant="ghost"
                >
                  <IconSetting className="flex self-center" />
                  Settings
                </Button>
              </li>
              <li>
                <Button
                  custom="flex flex-row w-full justify-center gap-2"
                  variant="destructive"
                  onClick={() => logOut()}
                >
                  <IconLogout className="flex self-center" />
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
}
