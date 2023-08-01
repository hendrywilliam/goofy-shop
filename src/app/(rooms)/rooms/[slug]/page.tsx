import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { getSpecificSpace, getSpecificCity } from "@/app/_actions/space";
import Image from "next/image";

export default async function RoomPage({
  params,
}: {
  params: { slug: string };
}) {
  const space = await getSpecificSpace(params.slug);
  const city = await getSpecificCity(space?.cityId!);

  return (
    <Shell custom="border">
      <div className="min-h-screen pt-4 w-2/3 mx-auto">
        <h1 className="font-calsans text-xl">{space?.name}</h1>
        <div className="flex flex-row gap-2 text-sm">
          <p>{city?.name}</p>
          {/* <p>{space?.review}</p> */}
          {/* <p>{space.totalreview}</p> */}
        </div>
        <div className="flex flex-row w-full h-max mt-2 gap-4">
          <div className="relative w-1/2 h-[510px]">
            <Image
              src={space?.photos[0].fileUrl!}
              fill
              style={{ objectFit: "fill" }}
              alt={`${space?.name}'s photos.`}
              className="rounded-md"
            />
          </div>
          <div className="w-1/2 grid grid-cols-2 gap-4">
            {space?.photos.length! < 2
              ? [...Array(4)].map((_, index) => {
                  return (
                    <div className="relative w-full h-full" key={index}>
                      <Image
                        src={space?.photos[0].fileUrl!}
                        alt={space!.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="h-full rounded-md"
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="border w-full rounded-md mt-4 p-2">
          <h1 className="font-calsans text-xl">Description</h1>
          <p>{space?.description}</p>
        </div>
      </div>
    </Shell>
  );
}
