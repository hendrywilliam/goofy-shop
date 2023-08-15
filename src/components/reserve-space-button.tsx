import * as React from "react";
import { Button } from "@/components/ui/button";
import { type DateRange } from "react-day-picker";
import { captureError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { searchParamsBuilder } from "@/lib/utils";
import { localizedDate } from "@/lib/utils";

interface ReserveSpaceButton {
  spaceId: string;
  dateRange: DateRange;
  totalPayment: number;
}

export const ReserveSpaceButton = React.memo(function ReserveSpaceButton({
  spaceId,
  dateRange,
  totalPayment,
}: ReserveSpaceButton) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const onSubmit = React.useCallback(() => {
    startTransition(async () => {
      try {
        if (typeof dateRange === "undefined") {
          throw new Error("Please select dates to book.");
        }

        const searchParams = searchParamsBuilder({
          start: localizedDate(dateRange.from as Date),
          end: dateRange.to
            ? localizedDate(dateRange.to)
            : localizedDate(dateRange?.from as Date),
          total: totalPayment,
        });

        router.push(`/book/space/${spaceId}?${searchParams}`, {
          scroll: true,
        });
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
