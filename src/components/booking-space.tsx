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
import { type DisabledDays } from "@/types";
import { getEachDayOfInterval } from "@/lib/utils";

interface BookingSpace {
  date: DisabledDays[];
}

export default function BookingSpace() {
  const [dateRange, setDateRange] = React.useState<DateRange>();
  const disabledDays = getEachDayOfInterval(
    new Date(2023, 7, 3),
    new Date(2023, 7, 8)
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex h-full w-full justify-center">
        <DropdownMenuRoot custom="self-center gap-4">
          <DropdownMenuTrigger custom="w-max">
            Choose start date and end date
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
                  before: new Date(2023, 7, 3),
                  after: new Date(2023, 7, 10),
                }}
              />
              <Button onClick={() => console.log(dateRange)}>
                Check date range
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
    </div>
  );
}
