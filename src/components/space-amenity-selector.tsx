import * as React from "react";
import { api } from "@/lib/api/api";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox, CheckboxContainer } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconLoading } from "@/components/icons/icon-loading";
import { toast } from "sonner";
import { captureError } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceInput } from "@/components/forms/become-host-form";
import { type UseFormSetValue } from "react-hook-form";

interface SpaceAmenitySelector {
  selectedAmenity: string[];
  setSelectedAmenity: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<SpaceInput>;
}

const SpaceAmenitySelector = React.memo(function SpaceAmenitySelector({
  selectedAmenity,
  setSelectedAmenity,
  setValue,
}: SpaceAmenitySelector) {
  const [newAmenity, setNewAmenity] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const { data, status, refetch } = api.amenity.getAllAmenities.useQuery();
  const amenityMutation = api.amenity.createAmenity.useMutation();

  const submitAmenity = React.useCallback(() => {
    startTransition(async () => {
      try {
        await amenityMutation.mutateAsync(
          {
            name: newAmenity,
          },
          {
            onError(error) {
              throw new Error(error.message);
            },
            onSuccess() {
              toast("Success created a new amenity");
              refetch();
            },
          }
        );
      } catch (err) {
        captureError(err);
      }
    });
    //eslint-disable-next-line
  }, [newAmenity]);

  return (
    <div className="border w-full h-[300px] rounded-md p-2">
      <div className="h-[230px] overflow-y-auto">
        <div className="h-max grid grid-cols-1 lg:grid-cols-4 gap-2 overflow-y-auto auto-cols-min">
          {status === "success"
            ? data?.map((item) => {
                return (
                  <CheckboxContainer key={item.id} id="checkbox_container">
                    <Checkbox
                      id={item.name}
                      value={item.id}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSelectedAmenity([
                          ...selectedAmenity,
                          e.currentTarget.value,
                        ]);
                        startTransition(() => {
                          setValue("amenities", selectedAmenity);
                        });
                      }}
                    />
                    <Label
                      htmlFor={item.name}
                      custom="text-muted cursor-pointer"
                    >
                      {item.name}
                    </Label>
                  </CheckboxContainer>
                );
              })
            : [...Array(12)].map((_, i) => {
                return (
                  <CheckboxContainer key={i}>
                    <Skeleton custom="flex w-full self-center" />
                  </CheckboxContainer>
                );
              })}
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <AlertDialog custom="w-full">
          <AlertDialogTrigger type="button" custom="mt-2 w-full">
            Add new amenity
          </AlertDialogTrigger>
          <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max gap-2">
            <AlertDialogHeader>
              <div className="flex">
                <p className="self-center">Add new amenity</p>
              </div>
              <AlertDialogClose />
            </AlertDialogHeader>
            <div className="h-full flex flex-col gap-2">
              <Input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewAmenity(e.target.value)
                }
              />
              <Button
                custom="flex flex-row justify-center gap-2"
                type="button"
                onClick={submitAmenity}
                disabled={isPending}
              >
                {isPending && <IconLoading className="flex self-center" />}Add
                new amenity
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
});

export { SpaceAmenitySelector };
