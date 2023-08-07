import { type FilteredValue } from "@/types";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { toast } from "sonner";
import { z } from "zod";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { DateRange } from "react-day-picker";

export function searchParamsBuilder(filteredValue: FilteredValue) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filteredValue)) {
    searchParams.set(key, value);
  }
  return searchParams.toString();
}

export function captureError(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof Error) {
    toast.error(err.message);
  } else if (isClerkAPIResponseError(err)) {
    toast.error(err.errors[0].message ?? unknownError);
  } else if (err instanceof z.ZodError) {
    toast.error(err.issues[0].message);
  } else {
    toast.error(unknownError);
  }
}

export function truncate(word: string, length: number) {
  if (word.length > length) {
    return word.substring(0, length) + "...";
  }
  return word;
}

export function getEachDayOfInterval({ from, to }: DateRange) {
  if (to) {
    return eachDayOfInterval({
      start: from as Date,
      end: to as Date,
    });
  } else {
    return [from];
  }
}

export function localizedDate(date: Date) {
  return date ? date.toLocaleDateString() : null;
}

export function formatCurrency(n: number) {
  if (typeof n !== "undefined") {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(n);
  }
  return 0;
}
