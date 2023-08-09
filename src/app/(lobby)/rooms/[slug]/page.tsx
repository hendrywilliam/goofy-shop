import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { getSpecificSpace, getSpecificCity } from "@/app/_actions/space";
import Image from "next/image";
import BookingSpace from "@/components/booking-space";
import { localizedDate } from "@/lib/utils";
import AmenitiesListDialog from "@/components/amenities-list-dialog";
import { getAllAmenities } from "@/app/_actions/space";

export default async function RoomPage({
  params,
}: {
  params: { slug: string };
}) {
  const space = await getSpecificSpace(params.slug);
  const city = await getSpecificCity(space?.cityId!);
  const amenities = await getAllAmenities(space?.amenities!);

  const topTenAmenities =
    amenities.length > 10 ? amenities.slice(0, 10) : amenities;

  return (
    <Shell custom="border min-h-screen h-full px-2 lg:px-20">
      <div className="flex flex-col min-h-screen h-full pt-4 w-full lg:w-2/3 mx-auto">
        <div className="flex flex-col my-4">
          <h1 className="font-calsans text-xl">{space?.name}</h1>
          <p className="text-muted">{city?.name}</p>
          {/* <p>{space?.review}</p> */}
          {/* <p>{space.totalreview}</p> */}
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full mt-2 gap-4">
          <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[510px]">
            <Image
              src={space?.photos[0].fileUrl!}
              fill
              style={{ objectFit: "fill" }}
              alt={`${space?.name}'s photos.`}
              className="rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2 h-full lg:h-[510px] hidden lg:grid lg:grid-cols-2 gap-4">
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
        <div className="flex flex-col lg:flex-row w-full h-max lg:h-[800px] gap-2">
          <section className="w-full h-max lg:w-1/2">
            <div className="flex flex-col border-y w-full h-[200px] justify-center">
              <h1 className="font-calsans text-xl">
                {/* please change later */}
                Hosted by <span>Freyanashifa Jayawardana</span>
              </h1>
              <p className="flex flex-row gap-2 text-muted">
                {space?.maxGuest! > 1 ? (
                  <span>{space?.maxGuest} guests</span>
                ) : (
                  <span>{space?.maxGuest} guest</span>
                )}
                <span>∙</span>
                {space?.numberRooms! > 1 ? (
                  <span>{space?.numberRooms} rooms</span>
                ) : (
                  <span>{space?.numberRooms} room</span>
                )}
                <span>∙</span>
                {space?.numberRooms! > 1 ? (
                  <span>{space?.numberBathrooms} bathrooms</span>
                ) : (
                  <span>{space?.numberBathrooms} room</span>
                )}
              </p>
              <p className="mt-2">Available from</p>
              {space?.availableDates.to ? (
                <p className="text-muted">
                  {`${localizedDate(
                    space.availableDates.from as Date
                  )} to ${localizedDate(space.availableDates.to)}`}
                </p>
              ) : (
                <p className="text-muted">
                  {localizedDate(space?.availableDates.from as Date)}
                </p>
              )}
            </div>
            <div className="flex flex-col border-b w-full min-h-[200px] h-max py-8 justify-center">
              <h1 className="font-calsans text-xl">About this space</h1>
              <p className="text-muted">{space?.description}</p>
            </div>
            <div className="flex flex-col border-b w-full min-h-[200px] h-max py-8 justify-center gap-2">
              <h1 className="font-calsans text-xl">What this place offers</h1>
              <ul className="grid grid-cols-2 gap-2 text-muted">
                {topTenAmenities.map((item) => {
                  return (
                    <li className="p-2 border rounded-md" key={item.id}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <AmenitiesListDialog data={amenities} />
            </div>
          </section>
          <section className="flex flex-col w-full h-full lg:w-1/2">
            <BookingSpace spaceId={params.slug} />
          </section>
        </div>
        <div className="flex flex-col w-full h-[200px] justify-center">
          <h1 className="font-calsans text-xl">Reviews</h1>
          {/* <p>{space?.description}</p> */}
          <p>Please add reviews later</p>
        </div>
      </div>
    </Shell>
  );
}
