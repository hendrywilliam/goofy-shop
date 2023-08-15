import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingPageLoading() {
  return (
    <Shell custom="flex min-h-screen h-full px-2 lg:px-20 justify-center">
      <div className="border w-full xl:w-1/2 h-max text-sm p-4 rounded-md my-12">
        <Skeleton custom="w-1/4" />
      </div>
    </Shell>
  );
}
