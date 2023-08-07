"use client";

import * as React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { localizedDate } from "@/lib/utils";
import { api } from "@/lib/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, getEachDayOfInterval } from "@/lib/utils";
import { toast } from "sonner";

interface BookingSpace {
  spaceId: string;
}

export default function BookingSpace({ spaceId }: BookingSpace) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
  });
  const [isPending, startTransition] = React.useTransition();
  const updateBookDates = api.space.updateBookingDates.useMutation();
  const { status, data } = api.space.getSpaceDetails.useQuery(
    {
      id: spaceId,
    },
    {
      refetchOnMount: true,
    }
  );

  const totalChargeCalculation = React.useMemo(() => {
    if (dateRange && data?.price) {
      const dateSequence = getEachDayOfInterval(dateRange);
      return (dateSequence.length as number) * data?.price;
    }
  }, [dateRange, data?.price]);

  const onSubmit = React.useCallback(() => {
    startTransition(async () => {
      const datesSequence = getEachDayOfInterval(dateRange as DateRange);
      const updated = await updateBookDates.mutateAsync({
        id: spaceId,
        bookedDates: datesSequence as Date[],
      });
      toast(updated.bookedDates.toString());
    });
    //
  }, [dateRange]);

  return (
    <div className="sticky flex flex-col top-56 mt-4 h-max w-2/3 gap-2 justify-center p-4 border rounded-md self-center shadow-md">
      <div className="w-full flex justify-center">
        {status === "success" ? (
          <p>
            <span className="text-2xl font-calsans">
              {formatCurrency(data?.price as number)}
            </span>
            <span>/night</span>
          </p>
        ) : (
          <Skeleton custom="h-10 w-1/2" />
        )}
      </div>
      <DropdownMenuRoot custom="gap-4 w-3/4 self-center">
        <DropdownMenuTrigger custom="w-full">
          <p>Pick available date here</p>
          <div className="w-full h-full rounded-md">
            {status === "loading" && <Skeleton custom="w-full" />}
            {status === "success" && data?.availableDates.to ? (
              <div className="flex gap-2 self-center w-full justify-center text-muted">
                <p>{localizedDate(data?.availableDates?.from as Date)}</p>—
                <p>{localizedDate(data?.availableDates?.to as Date)}</p>
              </div>
            ) : (
              <p>{localizedDate(data?.availableDates?.from as Date)}</p>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuHeader>
            <div className="p-4">
              <p>Please select start date and end date</p>
            </div>
          </DropdownMenuHeader>
          <div className="w-max h-max p-4">
            <DayPicker
              mode="range"
              numberOfMonths={1}
              selected={dateRange}
              onSelect={setDateRange}
              // disabled={disabledDays}
              modifiersStyles={{
                selected: {
                  backgroundColor: "black",
                  color: "white",
                },
                disabled: {
                  color: "hsl(0,0%,58.4%)",
                  textDecoration: "line-through",
                },
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <Button custom="w-3/4 self-center" onClick={() => onSubmit()}>
        Reserve
      </Button>
      <div className="flex flex-col w-full h-max py-2 items-center">
        <p className="text-muted">Your total charge</p>
        <div className="flex text-2xl font-calsans w-full h-full text-center justify-center">
          {status === "success" ? (
            <p>{formatCurrency(totalChargeCalculation as number)}</p>
          ) : (
            <Skeleton custom="flex h-10 w-1/2" />
          )}
        </div>
      </div>
    </div>
  );
}
