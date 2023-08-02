import { type FilteredValue } from "@/types";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { toast } from "sonner";
import { z } from "zod";

export function searchParamsBuilder(filteredValue: FilteredValue) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filteredValue)) {
    searchParams.set(key, value);
  }
  return searchParams.toString();
}

export function captureError(err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else if (isClerkAPIResponseError(err)) {
    toast.error(err.errors[0].message);
  } else if (err instanceof z.ZodError) {
    toast.error(err.issues[0].message);
  } else {
    toast.error("Something went wrong, please try again later.");
  }
}
