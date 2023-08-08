import { type FilteredValue } from "@/types";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { toast } from "sonner";
import { z } from "zod";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { DateRange } from "react-day-picker";
import isSameDay from "date-fns/isSameDay";
import { TRPCError } from "@trpc/server";

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
  } else if (err instanceof TRPCError) {
    toast.error(`${err.cause?.cause} - ${err.message}`);
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
  //check if "to" isnt undefined
  if (typeof to !== "undefined") {
    //check if from to "to" are the same.
    if (isSameDay(from!, to)) {
      return [from];
    } else {
      return eachDayOfInterval({
        start: from as Date,
        end: to as Date,
      });
    }
  }
  return [from];
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
