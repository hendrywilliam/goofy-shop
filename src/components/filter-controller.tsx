"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import { IconFiltering } from "@/components/icons/icon-filtering";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { spaceFilterValidation } from "@/lib/validation/space";
import { z } from "zod";
import { toast } from "sonner";

export default function FilterController() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const [filteredValue, setFilteredValue] = React.useState({});
  console.log("rendered");

  const generateSearchParams = React.useCallback(() => {
    let urlSearchParams = `${pathname}`;

    //validation before proceed
    try {
      const a = spaceFilterValidation.parse(filteredValue);
      console.log(a);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues);
        toast.error(err.issues[0].message);
      }
    }

    // router.push("/?price=20000")

    console.log(filteredValue);
  }, [filteredValue]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger custom="flex flex-row space-x-2">
          <IconFiltering className="self-center" />
          <span>Filter</span>
        </AlertDialogTrigger>
        <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max">
          <AlertDialogHeader>
            <p>Apply specific filters</p>
            <AlertDialogClose />
          </AlertDialogHeader>
          <div className="h-full box-border">
            <div className="w-full p-2 overflow-y-auto border rounded-md mb-4">
              <p>Price range</p>
              <div className="flex flex-col lg:flex-row justify-between mt-2">
                <div>
                  <p>Minimal price</p>
                  <Input
                    custom="w-full"
                    type="number"
                    defaultValue={10000}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      startTransition(() => {
                        setFilteredValue({
                          ...filteredValue,
                          minPrice: e.currentTarget.valueAsNumber,
                        });
                      });
                    }}
                  />
                </div>
                <div>
                  <p>Maximal price</p>
                  <Input
                    custom="w-full"
                    type="number"
                    defaultValue={21000000}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      startTransition(() => {
                        setFilteredValue({
                          ...filteredValue,
                          maxPrice: e.currentTarget.valueAsNumber,
                        });
                      });
                    }}
                  />
                </div>
              </div>
              <p className="mt-2">Rooms</p>
              <div className="flex flex-col lg:flex-row justify-between mt-2">
                <div>
                  <p>Number of rooms</p>
                  <Input
                    custom="w-full"
                    defaultValue={1}
                    min={1}
                    type="number"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      startTransition(() => {
                        setFilteredValue({
                          ...filteredValue,
                          numberOfRooms: e.currentTarget.valueAsNumber,
                        });
                      });
                    }}
                  />
                </div>
                <div>
                  <p>Number of bathrooms</p>
                  <Input
                    custom="w-full"
                    defaultValue={1}
                    min={1}
                    type="number"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      startTransition(() => {
                        setFilteredValue({
                          ...filteredValue,
                          numberOfBathrooms: e.currentTarget.valueAsNumber,
                        });
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between mt-2">
                <div>
                  <p>Minimum guest</p>
                  <Input
                    custom="w-full"
                    defaultValue={1}
                    min={1}
                    type="number"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      startTransition(() => {
                        setFilteredValue({
                          ...filteredValue,
                          minimumGuest: e.currentTarget.valueAsNumber,
                        });
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              disabled={Object.entries(filteredValue).length === 0}
              onClick={generateSearchParams}
            >
              Apply filter
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
