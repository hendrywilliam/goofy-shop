"use client";

import { ImgHTMLAttributes, forwardRef } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

/**
 * replace original src (only accepts string | undefined) with our new "src"
 * that accepts a StaticImport
 * example:
 * import LofiGirl from "./lofi-girl.png"
 * <Avatar src={LofiGirl} alt="lofi-girl"/>
 */

export interface Avatar
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | StaticImport;
}

type AvatarRef = HTMLImageElement;
export const Avatar = forwardRef<AvatarRef, Avatar>((props, ref) => {
  return (
    <div className="relative w-10 h-10 p-2 rounded-full">
      {props.src ? (
        <Image
          className="rounded-full"
          src={props.src}
          alt={props.alt ? props.alt : "Avatar"}
          ref={ref}
          fill
        />
      ) : (
        // fallback avatar
        <Image
          className="rounded-full"
          src="/images/image-lofi-girl.webp"
          alt={props.alt ? props.alt : "Default Avatar"}
          ref={ref}
          fill
        />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";
