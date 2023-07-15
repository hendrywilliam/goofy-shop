import { type PropsWithChildren } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex w-1/2 h-full relative">
        <Image
          src="/images/image-auth-layout.webp"
          alt="Image from unsplash.com - Kevin Yudhistira"
          sizes="100vw"
          fill
          className="absolute inset-0 object-cover opacity-75"
        />
      </div>
      <div className="w-1/2 h-full">{children}</div>
    </div>
  );
}
