"use client";

import { Avatar } from "../ui/avatar";
import { IconHamburger } from "../icons/icon-hamburger";
import * as React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function AccountNavigationMenu() {
  const { userId } = useAuth();

  return (
    <div className="flex w-1/3 justify-end items-center">
      <Link href="/become-a-host" className="mr-2">
        <Button custom="w-max">Become a host</Button>
      </Link>
      <div className="flex flex-row p-2 border rounded-md cursor-pointer hover:bg-[#f9f9f9] gap-2">
        <p>Logged in as: {userId}</p>
        <IconHamburger className="self-center" />
        <Avatar />
      </div>
    </div>
  );
}
