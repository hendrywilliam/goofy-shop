import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import { type Amenity } from "@prisma/client";

//main purpose is only for showing all amenities
export default function AmenitiesListDialog({ data }: { data: Amenity[] }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          Show all amenities ({data?.length})
        </AlertDialogTrigger>
        <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max">
          <AlertDialogHeader>
            <div className="flex">
              <p className="self-center">Show all amenities ({data?.length})</p>
            </div>
            <AlertDialogClose />
          </AlertDialogHeader>
          <div className="w-full h-[300px] border p-4 overflow-y-auto rounded-md">
            <ul className="w-full grid gap-2">
              {data?.map((item) => {
                return (
                  <li
                    className="w-full p-2 border rounded-md text-muted"
                    key={item.id}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
