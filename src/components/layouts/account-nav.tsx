"use client";

import { Avatar } from "../ui/avatar";
import { IconHamburger } from "../icons/icon-hamburger";
import * as React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";

export default function AccountNavigationMenu() {
  const { userId } = useAuth();

  return (
    <div className="flex w-1/3 justify-end items-center">
      <div className="flex flex-row p-2 border rounded-md cursor-pointer hover:bg-[#f9f9f9] gap-2">
        <p>Logged in as: {userId}</p>
        <IconHamburger className="self-center" />
        <Avatar />
        <Button>Logout</Button>
      </div>
    </div>
  );
}
