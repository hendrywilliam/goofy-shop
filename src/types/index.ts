import { FileWithPath } from "react-dropzone";
import { type SignUpResource } from "@clerk/types";
import { DateRange } from "react-day-picker";
import { type ClerkAPIError } from "@clerk/types";
import { type User } from "@clerk/nextjs/api";

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

export type DisabledDays = DateRange | Date | Date[] | string;

export type UnwantedKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers";

export interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  primary_email_address_id: string;
  first_name: string;
  last_name: string;
  primary_phone_number_id: string;
  phone_numbers: {
    phone_number: string;
    id: string;
  }[];
}

export type EventType = "user.created" | "user.updated" | "*";

export type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};
