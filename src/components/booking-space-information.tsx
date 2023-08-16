"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCurrency,
  getEachDayOfInterval,
  localizedDate,
} from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CheckAvailabilityButton } from "@/components/check-space-availability-button";
import { ReserveSpaceButton } from "@/components/reserve-space-button";

interface BookingSpace {
  spaceId: string;
}

export default function BookingSpaceInformation({ spaceId }: BookingSpace) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
  });
  const [isBookable, setIsBookable] = React.useState(false);

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

  React.useEffect(() => {
    setIsBookable(false);
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
      <DropdownMenuRoot custom="gap-4 w-full xl:w-3/4 self-center">
        <DropdownMenuTrigger custom="w-full">
          <p>Pick available date here</p>
          <div className="w-full h-full rounded-md">
            {status === "loading" && <Skeleton custom="w-full" />}
            {status === "success" && data?.availableDates.to ? (
              <div className="flex gap-2 self-center w-full justify-center text-muted text-sm">
                <p>{localizedDate(data?.availableDates?.from as Date)}</p>—
                <p>{localizedDate(data?.availableDates?.to as Date)}</p>
              </div>
            ) : (
              <p className="text-sm text-muted">
                {localizedDate(data?.availableDates?.from as Date)}
              </p>
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
      {isBookable ? (
        <ReserveSpaceButton
          dateRange={dateRange as DateRange}
          spaceId={spaceId}
          totalPayment={totalChargeCalculation}
        />
      ) : (
        <CheckAvailabilityButton
          spaceId={spaceId}
          dateRange={dateRange as DateRange}
          setIsBookable={setIsBookable}
        />
      )}

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
