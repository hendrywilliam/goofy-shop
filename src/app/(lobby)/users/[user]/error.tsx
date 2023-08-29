"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HostErrorPage({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="relative flex w-full h-screen justify-center items-center">
      <div className="absolute flex flex-col rounded-md p-10 top-20 text-center gap-2">
        <h1 className="font-bold">Spaceshop</h1>
        <p className="text-muted">Oopsie, something went wrong :(</p>
        <Button onClick={reset}>Reset</Button>
        <Button variant="bordered" onClick={() => router.push("/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
