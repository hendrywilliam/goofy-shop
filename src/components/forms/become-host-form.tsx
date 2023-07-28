"use client";

import dynamic from "next/dynamic";
import {
  useForm,
  SubmitHandler,
  ResolverError,
  ResolverResult,
} from "react-hook-form";
import { api } from "@/lib/api/api";
import { spaceValidation } from "@/lib/validation/space";
import { z, ZodError } from "zod";
import { useAuth } from "@clerk/nextjs";
import type { FileWithPath } from "react-dropzone";
import * as React from "react";
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
import "leaflet/dist/leaflet.css";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { toast } from "sonner";

const Map = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
});

const DraggableMarker = dynamic(() => import("@/components/ui/map-marker"), {
  ssr: false,
});

export type SpaceInput = z.infer<typeof spaceValidation>;

export default function BecomeHostForm() {
  const { userId } = useAuth();
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  //custom hooks
  const { latitude, longitude, setLongitude, setLatitude } = useGeoLocation();
  const mounted = useIsMounted();

  //react-query-hooks
  const cities = api.city.getAllCity.useQuery();

  //react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpaceInput>({
    resolver: zodResolver(spaceValidation),
  });

  const onSubmit: SubmitHandler<SpaceInput> = (data: SpaceInput) => {
    console.log("Files", files);
    console.log(`Data: `, data);
  };

  //latitude longitude integrate react hook form
  React.useEffect(() => {
    reset({ latitude: latitude, longitude: longitude });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  //integrate userId to authorId in react hook form
  React.useEffect(() => {
    if (userId) {
      reset({
        authorId: userId,
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  //integrate files into photo field in react hook form
  React.useEffect(() => {
    reset({
      photo: files,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <>
      <Shell custom="flex p-4 lg:p-0 border-b w-full lg:w-1/4 lg:border-r lg:border-b-0">
        <div className="flex flex-col w-full h-max text-start pt-2">
          <h1 className="font-calsans text-3xl">Become a host</h1>
          <p className="text-muted">Host anything you want</p>
          <p className="text-muted">Your place your rules.</p>
        </div>
      </Shell>
      <Shell custom="pr-0 h-max w-full px-2 lg:px-20">
        <Form
          className="flex flex-col gap-8 py-4"
          onSubmit={handleSubmit(onSubmit)}
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
              <select
                className="p-2 border rounded-md focus:ring-2 ring-muted outline-none text-sm"
                {...register("cityId")}
                name="cityId"
                id="cityId"
              >
                <option value="">(Select your country)</option>
                {cities.data?.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
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
          <div className="relative flex flex-row w-full h-[400px] mt-2 rounded-md">
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
                <AddSpace setFile={setFiles} files={files} />
              </AlertDialogContent>
            </AlertDialog>
          </FormField>
          <FormField>
            <FormInput type="submit" value="Submit" />
          </FormField>
        </Form>
      </Shell>
    </>
  );
}
