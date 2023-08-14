"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { type DateRange } from "react-day-picker";
import { getEachDayOfInterval } from "@/lib/utils";
import { api } from "@/lib/api/api";
import { toast } from "sonner";
import { captureError } from "@/lib/utils";

interface ReserveSpaceButton {
  spaceId: string;
  dateRange: DateRange;
  refetch: () => void;
  setIsBookable: React.Dispatch<React.SetStateAction<boolean>>;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const ReserveSpaceButton = React.memo(function ReserveSpaceButton({
  spaceId,
  dateRange,
  refetch,
  setIsBookable,
  setDateRange,
}: ReserveSpaceButton) {
  const [isPending, startTransition] = React.useTransition();
  const updateBookDates = api.space.updateBookingDates.useMutation();

  const onSubmit = React.useCallback(() => {
    startTransition(async () => {
      try {
        if (typeof dateRange === "undefined") {
          throw new Error("Please select dates to book.");
        }
        const datesSequence = getEachDayOfInterval(dateRange as DateRange);
        await updateBookDates.mutateAsync(
          {
            id: spaceId,
            bookedDates: datesSequence as Date[],
          },
          {
            onSuccess() {
              toast("Success add new booking for space.");
              setDateRange(undefined);
              setIsBookable(false);
              refetch();
            },
          }
        );
      } catch (err) {
        captureError(err);
      }
    });
    /* eslint-disable-next-line */
  }, [dateRange]);

  return (
    <Button
      custom="w-full lg:w-3/4 self-center"
      onClick={onSubmit}
      disabled={isPending}
      type="button"
    >
      Reserve
    </Button>
  );
});
