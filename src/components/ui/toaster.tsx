"use client";

import { Toaster as CustomToaster } from "sonner";

interface ToasterProps {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

export default function Toaster({ position }: ToasterProps) {
  return <CustomToaster position={position} />;
}
