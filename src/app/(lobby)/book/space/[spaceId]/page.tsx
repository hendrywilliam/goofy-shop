import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { getSpecificSpace } from "@/app/_actions/space";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

//achieve searchparams

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: { spaceId: string };
  searchParams: { start: string; end: string; total: string };
}) {
  const { start, end, total } = searchParams;
  const { spaceId } = params;
  const spaceInfo = await getSpecificSpace(spaceId);

  return (
    <Shell custom="flex min-h-screen h-full px-2 lg:px-20 justify-center">
      <div className="border w-full xl:w-1/2 h-max text-sm p-2 rounded-md mt-12">
        <h1 className="font-calsans mt-2 text-xl">Complete Payment</h1>
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-[300px] rounded-md my-4">
            <Image
              src={spaceInfo?.photos[0].fileUrl as string}
              fill
              style={{ objectFit: "cover" }}
              alt="Image"
              className="rounded-md"
            />
          </div>
          <div className="border my-4 w-full rounded-md p-4">
            <ul className="flex flex-col gap-2">
              <li>
                <h1 className="font-calsans text-xl">{spaceInfo?.name}</h1>
              </li>
              <li>
                <p>Owner</p>
                <p className="text-muted">Freyanashifa Jayawardana</p>
              </li>
              <li>
                <p>Start date</p>
                <p className="text-muted">{start}</p>
              </li>
              <li>
                <p>End date</p>
                <p className="text-muted">{end}</p>
              </li>
              <li>
                <p>Total payment</p>
                <p className="text-muted">
                  {total ? formatCurrency(parseInt(total)) : 0}
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full h-max border p-4 rounded-md">
            <h1>Please select payment channels</h1>
          </div>
        </div>
      </div>
    </Shell>
  );
}
