"use client";

import * as React from "react";
import { DayPicker, type DayPickerRangeProps } from "react-day-picker";

type Calendar = React.ComponentPropsWithoutRef<typeof DayPicker> &
  DayPickerRangeProps;

export function Calendar({
  className,
  classNames,
  selected,
  showOutsideDays = true,
  numberOfMonths = 1,
  disabled,
  mode = "range",
  onSelect,
  ...props
}: Calendar) {
  return (
    <DayPicker
      mode={mode}
      numberOfMonths={numberOfMonths}
      className={className}
      selected={selected}
      onSelect={onSelect}
      showOutsideDays
      disabled={disabled}
      classNames={{
        caption_label: "text-center text-xl w-full font-calsans",
        tbody: "w-10 h-full",
        root: "flex flex-row w-full h-full items-center justify-center left-1/2",
        table: "w-full h-full border-collapse",
        day_selected: "rounded-full w-full bg-black text-white",
        day_disabled: "text-muted line-through",
        day: "h-10 w-10",
        row: "w-full h-max",
        nav: "flex flex-row py-4 justify-between",
        month: "h-full w-max",
        months: "w-max",
        ...classNames,
      }}
      {...props}
    />
  );
}
