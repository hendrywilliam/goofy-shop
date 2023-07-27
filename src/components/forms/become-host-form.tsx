"use client";

import dynamic from "next/dynamic";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import { api } from "@/lib/api/api";
import { spaceValidation } from "@/lib/validation/space";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import type { FileWithPath } from "react-dropzone";
import * as React from "react";
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

/**
 * dynamic import for lazy component (client side)
 * map and draggable marker (both leaflet components) is using window instance
 * thats why you need to import them dynamically and escape ssr.
 *
 * and import components after importing the leaflet css
 * import "leaflet/dist/leaflet.css"
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#importing-client-components
 */

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
    formState: { errors },
  } = useForm<SpaceInput>();

  const onSubmit: SubmitHandler<SpaceInput> = (data: SpaceInput) => {
    console.log("Files", files);
    console.log(data);
  };

  return (
    <>
      <Shell custom="flex p-4 lg:p-0 border-b w-full lg:w-1/4 lg:border-r lg:border-b-0">
        <div className="flex flex-col w-full h-max text-start pt-2">
          <h1 className="font-calsans text-xl">Become a host</h1>
          <p className="text-muted">Host anything you want</p>
          <p className="text-muted">Your place your rules.</p>
        </div>
      </Shell>
      <Shell custom="pr-0 h-max w-full">
        <Form
          className="flex flex-col p-4 pr-0 gap-8"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <FormField className="flex flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="name">Your place name</FormLabel>
              <FormInput
                custom="w-full"
                {...register("name")}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="cityId">Select City</FormLabel>
              <select
                className="p-2 border rounded-md h-full focus:ring-2 ring-muted outline-none"
                {...register("cityId")}
                name="cityId"
                id="cityId"
              >
                {cities.data?.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </FormField>
          <FormField className="flex flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="numberRooms">Number of room(s)</FormLabel>
              <FormInput
                id="numberRooms"
                custom="w-full"
                {...register("numberRooms")}
                type="number"
                name="numberRooms"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="numberBathrooms">
                Number of bathroom(s)
              </FormLabel>
              <FormInput
                id="numberBathrooms"
                custom="w-full"
                {...register("numberBathrooms")}
                type="number"
                name="numberBathrooms"
                min={1}
                defaultValue={1}
              />
            </div>
          </FormField>
          <FormField className="flex flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="maxGuest">Max guest(s)</FormLabel>
              <FormInput
                id="maxGuest"
                custom="w-full"
                {...register("maxGuest")}
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
                {...register("price")}
                type="number"
                name="price"
                min={1}
                defaultValue={10000}
              />
            </div>
          </FormField>
          <FormField className="flex flex-row w-full justify-between gap-4">
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="longitude">Longitude</FormLabel>
              <FormInput
                id="longitude"
                custom="w-full"
                {...register("longitude", {
                  onChange(e: React.FormEvent<HTMLInputElement>) {
                    setLongitude(e.currentTarget.valueAsNumber);
                  },
                })}
                type="number"
                name="longitude"
                value={longitude}
              />
            </div>
            <div className="flex flex-col w-full">
              <FormLabel htmlFor="latitude">Latitude</FormLabel>
              <FormInput
                id="latitude"
                custom="w-full"
                {...register("latitude", {
                  onChange(e: React.FormEvent<HTMLInputElement>) {
                    setLatitude(e.currentTarget.valueAsNumber);
                  },
                })}
                type="number"
                name="latitude"
                value={latitude}
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
            </div>
          </FormField>
          <FormField className="flex flex-col w-full justify-between gap-2">
            <p>Upload your images - ({files.length}/3) selected</p>
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
