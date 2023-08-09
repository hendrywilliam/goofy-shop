"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCurrency,
  getEachDayOfInterval,
  captureError,
  localizedDate,
} from "@/lib/utils";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";

interface BookingSpace {
  spaceId: string;
}

export default function BookingSpace({ spaceId }: BookingSpace) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
  });
  const [isPending, startTransition] = React.useTransition();
  const updateBookDates = api.space.updateBookingDates.useMutation();
  const { status, data, refetch } = api.space.getSpaceDetails.useQuery(
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
      const numberOfDays = dateSequence.length === 0 ? 1 : dateSequence.length;
      return numberOfDays * data?.price;
    } else {
      return 0;
    }
  }, [dateRange, data?.price]);

  const onSubmit = React.useCallback(() => {
    startTransition(async () => {
      try {
        if (typeof dateRange === "undefined") {
          throw new Error("Please select dates to book.");
        } else {
          const datesSequence = getEachDayOfInterval(dateRange as DateRange);
          const updated = await updateBookDates.mutateAsync(
            {
              id: spaceId,
              bookedDates: datesSequence as Date[],
            },
            {
              onSuccess() {
                toast(updated.bookedDates.toString());
                refetch();
              },
            }
          );
        }
      } catch (err) {
        captureError(err);
      }
    });
    /* eslint-disable-next-line */
  }, [dateRange]);

  return (
    <div className="lg:sticky flex flex-col top-56 mt-4 h-max w-full lg:w-2/3 gap-2 justify-center p-4 border rounded-md self-center shadow-md">
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
      <DropdownMenuRoot custom="gap-4 w-full lg:w-3/4 self-center">
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
            <div className="w-full p-2 text-center">
              <p className="text-muted">Select dates to book.</p>
            </div>
          </DropdownMenuHeader>
          <div className="w-full p-4 h-max">
            {data?.availableDates && (
              <Calendar
                selected={dateRange}
                mode="range"
                disabled={[
                  ...data.bookedDates,
                  {
                    before: data?.availableDates?.from as Date,
                    after: data?.availableDates?.to as Date,
                  },
                ]}
                onSelect={setDateRange}
              />
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <Button
        custom="w-full lg:w-3/4 self-center"
        onClick={onSubmit}
        disabled={isPending}
        type="button"
      >
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
