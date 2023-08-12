"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { FieldErrors, useForm } from "react-hook-form";
import { api } from "@/lib/api/api";
import { spaceValidation } from "@/lib/validation/space";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormTextarea,
} from "@/components/ui/form";
import AddSpace from "@/components/add-space";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import { FileWithPreview } from "@/types";
import { Shell } from "@/components/ui/shell";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { toast } from "sonner";
import { useUploadThing } from "@/lib/uploadthing";
import { captureError } from "@/lib/utils";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { SpaceAmenitySelector } from "@/components/space-amenity-selector";
import { Skeleton } from "@/components/ui/skeleton";

import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
});

const DraggableMarker = dynamic(() => import("@/components/ui/map-marker"), {
  ssr: false,
});

export type SpaceInput = z.infer<typeof spaceValidation>;

export default function BecomeHostForm() {
  const { userId, isSignedIn } = useAuth();
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(),
    }
  );
  const [selectedAmenity, setSelectedAmenity] = React.useState<string[]>([]);

  //custom hooks
  const { latitude, longitude, setLongitude, setLatitude } = useGeoLocation();
  const mounted = useIsMounted();
  const { startUpload } = useUploadThing("imageUploader");

  //react-query-hooks
  const { data: cityData, status } = api.city.getAllCity.useQuery();
  const mutateSpace = api.space.createSpace.useMutation();

  //react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SpaceInput>({
    resolver: zodResolver(spaceValidation),
  });

  function onSubmit(data: SpaceInput) {
    startTransition(async () => {
      try {
        if (!isSignedIn) {
          throw new Error("You are not logged in");
        }
        const uploadedFiles = await startUpload(files);
        await mutateSpace.mutateAsync({
          authorId: data.authorId,
          cityId: data.cityId,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          price: data.price,
          numberBathrooms: data.numberBathrooms,
          maxGuest: data.maxGuest,
          numberRooms: data.numberRooms,
          availableDates: data.availableDates,
          amenities: data.amenities,
          photo: uploadedFiles,
        });
        toast("Success created a new place.");
      } catch (err) {
        captureError(err);
      }
    });
  }
  //callback when there is an error occurs
  function onError(error: FieldErrors<SpaceInput>) {
    const firstError = Object.values(error)[0];
    toast(firstError.message?.toString());
  }

  React.useEffect(() => {
    setValue("latitude", latitude);
    setValue("longitude", longitude);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  React.useEffect(() => {
    setValue("availableDates", selectedDate as DateRange);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  React.useEffect(() => {
    setValue("authorId", userId as string);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <Shell custom="pr-0 h-max w-full px-2 lg:px-20">
        <Form
          className="flex flex-col gap-8 py-4"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FormField className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <div className="flex-col w-full hidden">
              <FormInput
                custom="w-full"
                {...register("authorId")}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="name">Your place name</FormLabel>
              <FormInput
                custom="w-full"
                {...register("name")}
                type="text"
                name="name"
                id="name"
              />
              {errors.name?.message && (
                <FormMessage variant="error">
                  {errors.name?.message}
                </FormMessage>
              )}
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="cityId">Select City</FormLabel>
              {status === "success" ? (
                <select
                  className="p-2 border rounded-md focus:ring-2 ring-muted outline-none text-sm"
                  {...register("cityId")}
                  name="cityId"
                  id="cityId"
                >
                  <option value="">(Select city)</option>
                  {cityData?.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <Skeleton custom="w-full h-[38px]" />
              )}

              {errors.cityId?.message && (
                <FormMessage variant="error">
                  {errors.cityId?.message}
                </FormMessage>
              )}
            </div>
          </FormField>
          <FormField className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="numberRooms">Number of room(s)</FormLabel>
              <FormInput
                id="numberRooms"
                custom="w-full"
                {...register("numberRooms", {
                  valueAsNumber: true,
                })}
                type="number"
                name="numberRooms"
                min={1}
                defaultValue={1}
              />
              {errors.numberRooms?.message && (
                <FormMessage variant="error">
                  {errors.numberRooms?.message}
                </FormMessage>
              )}
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="numberBathrooms">
                Number of bathroom(s)
              </FormLabel>
              <FormInput
                id="numberBathrooms"
                custom="w-full"
                {...register("numberBathrooms", {
                  valueAsNumber: true,
                })}
                type="number"
                name="numberBathrooms"
                min={1}
                defaultValue={1}
              />
            </div>
          </FormField>
          <FormField className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="maxGuest">Max guest(s)</FormLabel>
              <FormInput
                id="maxGuest"
                custom="w-full"
                {...register("maxGuest", {
                  valueAsNumber: true,
                })}
                type="number"
                name="maxGuest"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="price">Price (IDR)</FormLabel>
              <FormInput
                id="price"
                custom="w-full"
                {...register("price", {
                  valueAsNumber: true,
                })}
                type="number"
                name="price"
                min={1}
                defaultValue={10000}
              />
            </div>
          </FormField>
          <div className="flex flex-col w-full h-max border justify-center align-middle items-center py-4 rounded-md gap-4">
            <h1>Pick available dates</h1>
            <Calendar
              mode="range"
              selected={selectedDate}
              onSelect={setSelectedDate}
              //set default and prohibit navigate to past
              defaultMonth={new Date(2023, 7)}
              fromMonth={new Date(2023, 7)}
              disabled={{
                before: new Date(),
              }}
            />
          </div>
          <FormField className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="longitude">Longitude</FormLabel>
              <FormInput
                id="longitude"
                custom="w-full"
                {...register("longitude", {
                  valueAsNumber: true,
                })}
                type="number"
                name="longitude"
                defaultValue={longitude}
                step="0.01"
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="latitude">Latitude</FormLabel>
              <FormInput
                id="latitude"
                custom="w-full"
                {...register("latitude", {
                  valueAsNumber: true,
                })}
                type="number"
                name="latitude"
                defaultValue={latitude}
                step="0.01"
              />
            </div>
          </FormField>
          <div className="relative flex flex-col w-full h-[400px] mt-2 rounded-md">
            <h1>Set your position</h1>
            {mounted && (
              <Map
                latitude={latitude}
                longitude={longitude}
                popupMessage="Test Map"
              >
                <DraggableMarker
                  lat={latitude}
                  lng={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </Map>
            )}
          </div>
          <FormField custom="gap-1">
            <FormLabel>Select amenities</FormLabel>
            <SpaceAmenitySelector
              setValue={setValue}
              setSelectedAmenity={setSelectedAmenity}
              selectedAmenity={selectedAmenity}
            />
          </FormField>
          <FormField className="flex flex-row w-full justify-between gap-2">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormTextarea
                id="description"
                custom="rounded-md p-2"
                {...register("description")}
                name="description"
                cols={30}
                rows={10}
              ></FormTextarea>
              {errors.description?.message && (
                <FormMessage variant="error">
                  {errors.description?.message}
                </FormMessage>
              )}
            </div>
          </FormField>
          <FormField className="flex flex-col w-full justify-between gap-2">
            <p>Upload your images - ({files.length}/3) selected</p>
            {errors.photo?.message && (
              <FormMessage variant="error">
                {errors.photo.message.toString()}
              </FormMessage>
            )}
            <AlertDialog custom="w-full">
              <AlertDialogTrigger custom="w-full" type="button">
                Select image
              </AlertDialogTrigger>
              <AlertDialogContent custom="w-[500px] h-max">
                <AlertDialogHeader>
                  <div className="flex">
                    <p className="self-center">Select image</p>
                  </div>
                  <AlertDialogClose />
                </AlertDialogHeader>
                <AddSpace
                  setValue={setValue}
                  setFile={setFiles}
                  files={files}
                />
              </AlertDialogContent>
            </AlertDialog>
          </FormField>
          <FormField>
            <FormInput type="submit" value="Submit" disabled={isPending} />
          </FormField>
        </Form>
      </Shell>
    </>
  );
}
