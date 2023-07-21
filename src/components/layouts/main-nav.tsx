"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { buttonVariants } from "../ui/button";

const { mainNavigation } = siteConfig;

export default function MainNavigationMenu() {
  const path = usePathname();

  return (
    <div className="flex w-1/3 justify-center items-center gap-4">
      {mainNavigation.map((item, index) => {
        return (
          <div className="flex flex-col h-full items-center" key={index}>
            <div className="flex grow items-center">
              <Link
                className={`${buttonVariants({
                  color: "ghost",
                  // add additional classes improve readibility
                  class: "flex h-max border font-medium ",
                })}`}
                href={item.href}
              >
                {item.title}
              </Link>
            </div>

            <div
              className={`h-1 w-full ${
                path === item.href ? `border-b border-black` : ``
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
