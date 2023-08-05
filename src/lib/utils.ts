import { type FilteredValue } from "@/types";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { toast } from "sonner";
import { z } from "zod";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
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
    toast.error(err.errors[0].message);
  } else if (err instanceof z.ZodError) {
    toast.error(err.issues[0].message ?? unknownError);
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

export function getEachDayOfInterval(from: Date, to: Date) {
  return eachDayOfInterval({
    start: from,
    end: to,
  });
}

export function localizedDate(date: Date) {
  return format(date, "PPPP");
}
