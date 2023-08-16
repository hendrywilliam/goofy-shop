import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBecomeAHostPage() {
  return (
    <Shell custom="min-h-screen h-max flex flex-col lg:flex-row px-0 lg:px-20">
      <Shell custom="flex p-4 lg:p-0 border-b w-full lg:w-1/4 lg:border-r lg:border-b-0">
        <div className="flex flex-col w-full h-max text-start pt-2 gap-2">
          <Skeleton custom="w-1/2 h-[30px]" />
          <Skeleton custom="w-1/2" />
          <Skeleton custom="w-1/2" />
        </div>
      </Shell>
      <Shell custom="pr-0 h-max w-full px-2 lg:px-20">
        <div className="flex flex-col gap-8 py-4">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <Skeleton custom="w-full h-[38px]" />
            <Skeleton custom="w-full h-[38px]" />
          </div>
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <Skeleton custom="w-full h-[38px]" />
            <Skeleton custom="w-full h-[38px]" />
          </div>
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <Skeleton custom="w-full h-[38px]" />
            <Skeleton custom="w-full h-[38px]" />
          </div>
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <Skeleton custom="w-full h-[38px]" />
            <Skeleton custom="w-full h-[38px]" />
          </div>
        </div>
      </Shell>
    </Shell>
  );
}
