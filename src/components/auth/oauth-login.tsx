"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconGoogle } from "@/components/icons/icon-google";
import { OAuthStrategy } from "@clerk/types";
import { IconGithub } from "@/components/icons/icon-github";
import { useSignIn } from "@clerk/nextjs";
import { IconLoading } from "@/components/icons/icon-loading";
import { captureError } from "@/lib/utils";

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
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  const [isPending, startTransition] = React.useTransition();

  async function signInWith(strategy: OAuthStrategy) {
    try {
      if (!isLoaded) return;
      setIsLoading(strategy);
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setIsLoading(null);
      captureError(err);
    }
  }

  return (
    <div className="w-full flex flex-row gap-2">
      {oAuthProvider.map((item, index) => {
        return (
          <Button
            type="button"
            custom="flex flex-row gap-2"
            key={index}
            onClick={() => signInWith(item.strategy)}
          >
            {isLoading === item.strategy ? (
              <IconLoading className="flex self-center" />
            ) : (
              item.icon
            )}
            {item.name}
          </Button>
        );
      })}
    </div>
  );
}

export { OAuthLogin };
