"use client";

import * as React from "react";
import { FileWithPreview } from "@/types";
import {
  useDropzone,
  type Accept,
  type FileWithPath,
  FileRejection,
} from "react-dropzone";
import Image from "next/image";
import { toast } from "sonner";
import { IconDelete } from "./icons/icon-delete";
import { Button } from "@/components/ui/button";

interface AddSpace {
  setFile: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  files: FileWithPreview[];
  maxFiles?: number;
  accept?: Accept;
  maxSize?: number;
}

export default function AddSpace({
  setFile,
  // mime type
  accept = {
    "image/*": [],
  },
  files,
  maxFiles = 3,
  // bytes binary
  maxSize = 1024 * 1024 * 4,
}: AddSpace) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [setFile, files]
  );

  const onDropRejected = React.useCallback(
    (fileRejections: FileRejection[]) => {
      const firstRejection = fileRejections[0].errors[0];
      toast.error(`Operation rejected - ${firstRejection.message}`);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxFiles,
    maxSize,
  });

  React.useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full border rounded-md p-4">
      <div
        className="flex flex-col justify-center text-center items-center w-full h-[200px] border-2 border-dashed rounded-md"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Drop your files here. </p>
        <p>Only accepts image file with maximum 4MB each.</p>
      </div>
      <div className="relative mt-2 h-max">
        {files.length > 0 && <p>You have selected ({files.length}/3) files</p>}
        <div className="flex flex-col gap-2">
          {files?.length
            ? files.map((item, i) => {
                return (
                  // <Image
                  //   className="rounded-md"
                  //   src={item.preview}
                  //   key={i}
                  //   width={50}
                  //   height={50}
                  //   alt={item.name}
                  // />
                  <ImagePreview image={item} key={i} />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

interface ImagePreview {
  image: FileWithPreview;
  setFile?: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

export const ImagePreview = ({ image, setFile }: ImagePreview) => {
  const lastModified = new Date(image.lastModified).toDateString();

  return (
    <div className="flex flex-row mt-2 justify-between">
      <div className="flex flex-row w-16 relative h-12 rounded-md">
        <Image
          objectFit="cover"
          className="rounded-md"
          src={image.preview}
          fill={true}
          alt={image.name}
        />
      </div>
      <div className="flex flex-col w-full mx-2 truncate justify-center">
        <p>{image.name}</p>
        <p className="text-xs text-muted">Last modified - {lastModified}</p>
      </div>
      <Button custom="border p-2 h-1/2 rounded-md self-center">
        <IconDelete className="stroke-1" />
      </Button>
    </div>
  );
};
