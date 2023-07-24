"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api/api";
import { spaceValidation } from "@/lib/validation/space";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { useDropzone } from "react-dropzone";
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
import { toast } from "sonner";
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

export type ProductInput = z.infer<typeof spaceValidation>;

export default function BecomeHostForm() {
  const { userId } = useAuth();
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();

  const onSubmit: SubmitHandler<ProductInput> = (data: ProductInput) => {
    console.log("ok");
    console.log(files);
  };

  return (
    <>
      <Shell custom="flex px-0 border-r w-1/4">
        <p className="flex self-center">Host</p>
      </Shell>
      <Shell custom="pr-0 h-max w-full">
        <Form
          className="p-4 pr-0"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <FormField className="flex flex-col">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput {...register("name")} type="text" name="name" />
          </FormField>
          <FormField className="flex flex-col">
            <FormLabel htmlFor="cityId">City</FormLabel>
            <FormInput {...register("cityId")} type="text" name="cityId" />
          </FormField>
          <FormField>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormTextarea
              {...register("description")}
              name="description"
              id=""
              cols={30}
              rows={10}
            ></FormTextarea>
          </FormField>
          <FormField>
            <FormInput type="submit" value="Submit" />
          </FormField>
        </Form>
        <AlertDialog>
          <AlertDialogTrigger>Select image</AlertDialogTrigger>
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
      </Shell>
    </>
  );
}
