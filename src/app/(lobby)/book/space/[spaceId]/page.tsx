import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { getSpecificSpace } from "@/app/_actions/space";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PaymentController from "@/components/payment-controller";
import { type Metadata, type ResolvingMetadata } from "next";

interface PageProps {
  params: { spaceId: string };
  searchParams: { start: string; end: string; total: string };
}

//will generate dynamic metadata based on dynamic information
//either comes from parent segment (closest parent), or by PageProps
export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const spaceInfo = await getSpecificSpace(params.spaceId);

  return {
    title: `Request a book - ${spaceInfo?.name}`,
    description: `Request a book for ${spaceInfo?.name}`,
    keywords: [
      "Next.js",
      "React",
      "Typescript",
      "Freya",
      "Nashifa",
      "Jayawardana",
    ],
    authors: [{ name: "yrdneh", url: "https://www.instagram.com/jkt48.freya" }],
    creator: "Freyanashifa Jayawardana",
    applicationName: "spaceshop",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
  };
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const { start, end, total } = searchParams;
  const { spaceId } = params;
  const spaceInfo = await getSpecificSpace(spaceId);

  return (
    <Shell custom="flex min-h-screen h-full px-2 lg:px-20 justify-center">
      <div className="border w-full xl:w-1/2 h-max text-sm p-4 rounded-md my-12">
        <h1 className="font-calsans mt-2 text-xl">Request booking</h1>
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
                <h1 className="font-calsans text-xl">Total payment</h1>
                <p className="text-muted text-xl">
                  {total ? formatCurrency(parseInt(total)) : 0}
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full h-max border p-4 rounded-md">
            <h1 className="font-calsans text-xl">1. Select payment channels</h1>
            <PaymentController
              totalPrice={total}
              spaceName={spaceInfo?.name as string}
              spaceId={spaceId}
              end={end}
              start={start}
            />
          </div>
        </div>
      </div>
    </Shell>
  );
}
