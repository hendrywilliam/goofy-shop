import { ImgHTMLAttributes, forwardRef } from "react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import LofiGirl from "/public/images/image-lofi-girl.webp";
import { tv, type VariantProps } from "tailwind-variants";

export interface Avatar
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src">,
    VariantProps<typeof avatarImageVariant> {
  src?: string | StaticImport;
  custom?: string;
}

const avatarImageVariant = tv({
  base: "relative w-6 h-6 p-2 rounded-full self-center",
});

type AvatarRef = HTMLImageElement;
export const Avatar = forwardRef<AvatarRef, Avatar>((props, ref) => {
  return (
    <div className={avatarImageVariant({ class: props.custom })}>
      {props.src ? (
        <Image
          src={props.src}
          alt={props.alt ? props.alt : "Avatar"}
          ref={ref}
          className="rounded-full cover"
          fill
        />
      ) : (
        // fallback avatar
        <Image
          className="rounded-full cover"
          // src="/images/image-lofi-girl.webp"
          src={LofiGirl}
          alt={props.alt ? props.alt : "Default Avatar"}
          ref={ref}
          fill
        />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";
