"use client";

import * as React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { IconLoading } from "@/components/icons/icon-loading";

export default function SSOCallbackRedirect() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-3/4 lg:w-1/2 p-4 rounded-md">
        <h1>
          Redirecting{" "}
          <span>
            <IconLoading />
          </span>
        </h1>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}
