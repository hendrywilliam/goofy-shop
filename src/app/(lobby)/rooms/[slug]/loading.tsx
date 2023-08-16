import React from "react";
import { Shell } from "@/components/ui/shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingRoomPage() {
  return (
    <Shell custom="border min-h-screen h-full px-2 lg:px-20">
      <div className="flex flex-col min-h-screen h-full pt-4 w-full lg:w-2/3 mx-auto gap-2">
        <Skeleton custom="w-2/4" />
        <Skeleton custom="w-1/4" />
        <Skeleton custom="w-1/4" />
        <div className="flex flex-col lg:flex-row w-full h-full mt-2 gap-4">
          <Skeleton custom="h-[300px] lg:h-[510px] w-full" />
          <div className="w-full lg:w-1/2 h-full lg:h-[510px] hidden lg:grid lg:grid-cols-2 gap-4">
            <Skeleton custom="w-full h-full" />
            <Skeleton custom="w-full h-full" />
            <Skeleton custom="w-full h-full" />
            <Skeleton custom="w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-max lg:h-[800px] gap-2">
          <section className="w-full h-max xl:w-1/2">
            <div className="flex flex-col border-y w-full h-[200px] justify-center gap-2">
              <Skeleton custom="w-1/2" />
              <div className="flex flex-row gap-2">
                <Skeleton custom="w-[10%]" />
                <Skeleton custom="w-[10%]" />
                <Skeleton custom="w-[10%]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
