import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingPageLoading() {
  return (
    <Shell custom="flex min-h-screen h-full px-2 lg:px-20 justify-center">
      <div className="border w-full xl:w-1/2 h-max text-sm p-4 rounded-md my-12">
        <Skeleton custom="w-1/4 my-2" />
        <div className="flex flex-col gap-2 my-2">
          <Skeleton custom="w-full h-[300px]" />
        </div>
        <div className="border my-4 w-full rounded-md p-4">
          <ul className="flex flex-col gap-2">
            <li>
              <Skeleton custom="w-1/4 my-2" />
              <Skeleton custom="w-1/2" />
            </li>
            <li>
              <Skeleton custom="w-1/4 my-2" />
              <Skeleton custom="w-1/3" />
            </li>
            <li>
              <Skeleton custom="w-1/4 my-2" />
              <Skeleton custom="w-1/3" />
            </li>
            <li>
              <Skeleton custom="w-1/4 my-2" />
              <Skeleton custom="w-1/3" />
            </li>
          </ul>
        </div>
      </div>
    </Shell>
  );
}
