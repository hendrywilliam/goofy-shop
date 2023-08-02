import { FileWithPath } from "react-dropzone";
import { type SignUpResource } from "@clerk/types";

export interface FooterNavItem {
  [key: string]: string | Record<string, string>[];
}

export interface MainNavItem {
  title: string;
  href: string;
}

export interface FileWithPreview extends FileWithPath {
  preview: string;
}

export interface FilteredValue {
  min_price?: number;
  max_price?: number;
  rooms?: number;
  bathrooms?: number;
  guest?: number;
}

export type ClerkDataUser = Pick<
  SignUpResource,
  "createdUserId" | "firstName" | "lastName"
>;
