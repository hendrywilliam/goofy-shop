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
import { searchParamsBuilder } from "@/lib/utils";
import { captureError } from "@/lib/utils";

export default function FilterController() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const [filteredValue, setFilteredValue] = React.useState({});

  const generateSearchParams = React.useCallback(() => {
    let urlSearchParams = `${pathname}?`;
    startTransition(() => {
      try {
        //zod validation before proceed (parsed)
        const parsedFilteredValue = spaceFilterValidation.parse(filteredValue);
        //generate search params
        const generateSearchParams = searchParamsBuilder(parsedFilteredValue);
        //final urlSearchParams
        const final = urlSearchParams.concat(generateSearchParams);
        //navigate to url with searchParams
        router.push(final);
      } catch (err) {
        captureError(err);
      }
    });

    /* eslint-disable-next-line */
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
                    defaultValue={15000}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setFilteredValue({
                        ...filteredValue,
                        min_price: e.currentTarget.valueAsNumber,
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
                      setFilteredValue({
                        ...filteredValue,
                        max_price: e.currentTarget.valueAsNumber,
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
                      setFilteredValue({
                        ...filteredValue,
                        rooms: e.currentTarget.valueAsNumber,
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
                      setFilteredValue({
                        ...filteredValue,
                        bathrooms: e.currentTarget.valueAsNumber,
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
                      setFilteredValue({
                        ...filteredValue,
                        guest: e.currentTarget.valueAsNumber,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <Button
                variant="destructive"
                onClick={() => {
                  setFilteredValue({});
                  startTransition(() => {
                    router.push("/");
                  });
                }}
              >
                Clear filter
              </Button>
              <Button onClick={generateSearchParams}>Apply filter</Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
