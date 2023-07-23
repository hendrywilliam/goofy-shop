import { FileWithPath } from "react-dropzone";

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
