"use client";

import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getEachDayOfInterval, localizedDate } from "@/lib/utils";
import { api } from "@/lib/api/api";

interface BookingSpace {
  spaceId: string;
}

export default function BookingSpace({ spaceId }: BookingSpace) {
  const [dateRange, setDateRange] = React.useState<DateRange>();
  //get all available dates and booked dates
  const { status, data, error } = api.space.getAllDatesFromASpace.useQuery({
    id: spaceId,
  });

  const disabledDays = getEachDayOfInterval(
    data?.availableDates.from as Date,
    data?.availableDates.to as Date
  );

  return (
    <div className="flex flex-col h-1/2 w-full justify-center items-center gap-2">
      <DropdownMenuRoot custom="gap-4 text-sm w-3/4">
        <DropdownMenuTrigger custom="w-full">
          <div className="w-full h-full border p-4 rounded-md">
            {data?.availableDates.to && status === "success" ? (
              <p className="flex text-sm gap-2 justify-center text-muted">
                <span>{localizedDate(data?.availableDates.from as Date)}</span>
                <span>to</span>
                <span>{localizedDate(data?.availableDates.to as Date)}</span>
              </p>
            ) : (
              <p>{localizedDate(data?.availableDates.from as Date)}</p>
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
              numberOfMonths={2}
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{
                before: disabledDays[0],
                after: disabledDays[disabledDays.length - 1],
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenuRoot>
      <Button custom="w-3/4">Check availability</Button>
    </div>
  );
}
