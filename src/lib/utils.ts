import { type FilteredValue } from "@/types";
import { toast } from "sonner";
import { z } from "zod";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { DateRange } from "react-day-picker";
import isSameDay from "date-fns/isSameDay";
import { TRPCError } from "@trpc/server";
import { isClerkAPIResponseError } from "@clerk/nextjs";

export function searchParamsBuilder(entity: Record<string, any>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(entity)) {
    //value -> value as string
    searchParams.set(key, value);
  }
  //without toString - URLSearchParams { 'a' => '10', 'b' => '20' }
  return searchParams.toString();
}

export function captureError(err: unknown) {
  const unknownError = "Something went wrong, please try again later.";

  if (isClerkAPIResponseError(err)) {
    toast.error(err.errors[0].message ?? unknownError);
  } else if (err instanceof z.ZodError) {
    toast.error(err.issues[0].message);
  } else if (err instanceof TRPCError) {
    toast.error(`${err.cause?.cause} ${err.message}`);
    //move instance error to the bottom so it wont be checked first
  } else if (err instanceof Error) {
    toast.error(err.message);
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
  //https://www.iso.org/iso-8601-date-and-time-format.html
  return date ? date.toISOString().slice(0, 10) : null;
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

export function orderNumberGenerator() {
  //pattern: [MIDTRANS][DATE ORDERED][RANDOM 4DIGIT]
  //this will fill date ordered in iso format YYYYMMDD
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  //generate 4/3 random digits
  const random4Digits = Math.floor(Math.random() * 10000);

  return `MIDTRANS-${date}-${random4Digits}`;
}
