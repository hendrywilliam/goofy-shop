"use client";

import * as React from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function UserSetPicture() {
  const [crop, setCrop] = React.useState<Crop>();
  const [imageSource, setImageSource] = React.useState<string>();
  const [croppedImage, setCroppedImage] = React.useState<Blob | null>(null);

  const { user, isLoaded, isSignedIn } = useUser();

  const canvasRef = React.useRef<React.ElementRef<"canvas">>(null);
  const imgRef = React.useRef<React.ElementRef<"img">>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const preview = URL.createObjectURL(e.target.files[0]);
      setImageSource(preview);
    }
  }

  function cropImage() {
    const canvas = canvasRef.current;
    const image = imgRef.current;
    if (image && canvas && crop) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      ctx!.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas?.toBlob((blob) => {
        setCroppedImage(blob);
        toast("Image crop successfully");
      });
    }
  }

  const uploadPhoto = React.useCallback(async () => {
    try {
      if (!user) return;
      await user.setProfileImage({ file: croppedImage });
      toast("Avatar updated successfully.");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    }
  }, [croppedImage]);

  React.useEffect(() => {
    return () => {
      if (imageSource) {
        URL.revokeObjectURL(imageSource);
      }
    };
  }, [imageSource]);

  return (
    <div className="w-full h-max">
      <label
        htmlFor="file_input"
        className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
      >
        Select Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
        id="file_input"
      />
      {/* eslint-disable */}
      <ReactCrop
        className="min-h-[300px] max-h-[500px] w-full my-4 border border-dashed rounded-md"
        crop={crop}
        onChange={(c) => setCrop(c)}
      >
        <img className="overflow-y" src={imageSource} ref={imgRef} />
      </ReactCrop>
      <div className="w-full flex justify-between">
        <Button onClick={cropImage} variant="bordered" custom="mr-2">
          Crop Image
        </Button>
        <Button onClick={uploadPhoto}>Upload image</Button>
      </div>
      {/* hidden preview */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
