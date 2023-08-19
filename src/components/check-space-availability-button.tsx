"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { isSpaceBookable } from "@/app/_actions/space";
import { type DateRange } from "react-day-picker";
import { getEachDayOfInterval } from "@/lib/utils";
import { IconLoading } from "@/components/icons/icon-loading";
import { toast } from "sonner";

interface CheckAvailabilityButton {
  spaceId: string;
  setIsBookable: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: DateRange;
}

export const CheckAvailabilityButton = React.memo(
  function CheckAvailabilityButton({
    spaceId,
    setIsBookable,
    dateRange,
  }: CheckAvailabilityButton) {
    const [isPending, startTransition] = React.useTransition();

    function checkavailabilitySpace() {
      startTransition(async () => {
        if (typeof dateRange !== "undefined") {
          const dateSequence = getEachDayOfInterval(dateRange) as Date[];
          const res = await isSpaceBookable(spaceId, dateSequence as Date[]);
          if (!res) {
            setIsBookable(false);
            toast.error(
              "Space is not available for now. Try switching to available dates"
            );
          } else {
            setIsBookable(true);
            toast.success("Space is available to book.");
          }
        } else {
          setIsBookable(false);
          toast.error("Please select dates before checking availability");
        }
      });
    }

    return (
      <Button
        custom="flex flex-row justify-center gap-2"
        onClick={checkavailabilitySpace}
      >
        {isPending && <IconLoading className="flex self-center" />} Check
        availability space
      </Button>
    );
  }
);
