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
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "../ui/button";

export type ProductInput = z.infer<typeof spaceValidation>;

export default function BecomeHostForm() {
  const { userId } = useAuth();
  const [files, setFiles] = React.useState<File[]>([]);

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 3,
  });

  const { startUpload } = useUploadThing("imageUploader");

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();

  const onSubmit: SubmitHandler<ProductInput> = (data: ProductInput) => {
    console.log(data);
    console.log(userId);
    toast("Ngab");
  };

  return (
    <>
      <Form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
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
        <div
          className="border border-dashed w-[200px] h-[200px]"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div>
            {files.length > 0 && (
              <Button onClick={() => startUpload(files)}>
                You`ve selected {files.length} files
              </Button>
            )}
          </div>
          Drop files here!
        </div>
        <FormInput type="submit" value="Submit" />
      </Form>
    </>
  );
}
