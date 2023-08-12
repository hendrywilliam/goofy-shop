"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconGoogle } from "@/components/icons/icon-google";
import { OAuthStrategy } from "@clerk/types";
import { IconGithub } from "@/components/icons/icon-github";
import { useSignIn } from "@clerk/nextjs";

const oAuthProvider = [
  {
    name: "Google",
    strategy: "oauth_google",
    icon: <IconGoogle className="flex self-center" />,
  },
  {
    name: "Github",
    strategy: "oauth_github",
    icon: <IconGithub className="flex self-center w-[2em] h-[1.5em]" />,
  },
] satisfies {
  name: string;
  strategy: OAuthStrategy;
  icon: JSX.Element;
}[];

function OAuthLogin() {
  const { signIn, isLoaded } = useSignIn();

  function signInWith(strategy: OAuthStrategy) {
    if (!isLoaded) return;

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  }

  return (
    <div className="w-full flex flex-row gap-2">
      {oAuthProvider.map((item, index) => {
        return (
          <Button
            custom="flex flex-row gap-2"
            key={index}
            onClick={() => signInWith(item.strategy)}
          >
            {item.icon} {item.name}
          </Button>
        );
      })}
    </div>
  );
}

export { OAuthLogin };
