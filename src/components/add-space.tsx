"use client";

import * as React from "react";
import { FileWithPreview } from "@/types";
import { useDropzone, type Accept, type FileWithPath } from "react-dropzone";
import Image from "next/image";

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
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
        className="flex justify-center text-center items-center w-full h-[200px] border-2 border-dashed rounded-md"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        Drop your files here. Only accepts image file with maximum 4MB.
      </div>
      <div className="relative mt-2 h-max">
        {files.length > 0 && <p>You have selected {files.length} files</p>}
        <div className="flex flex-col gap-2">
          {files?.length
            ? files.map((item, i) => {
                return (
                  <Image
                    className="rounded-md"
                    src={item.preview as string}
                    key={i}
                    width={50}
                    height={50}
                    alt={item.name}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
