import { type FilteredValue } from "@/types";

export function searchParamsBuilder(filteredValue: FilteredValue) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filteredValue)) {
    searchParams.set(key, value);
  }
  return searchParams.toString();
}
