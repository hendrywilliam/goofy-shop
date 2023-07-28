"use client";

import * as React from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormInput,
  FormMessage,
  FormTextarea,
} from "@/components/ui/form";
import { Avatar } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/dialog";
import UserSetPicture from "@/components/user-set-picture";
import { useUser } from "@clerk/nextjs";

export default function ManageAccountForm() {
  const { user } = useUser();

  return (
    <div className="w-full lg:w-1/2 lg:h-[600px]">
      <h1 className="font-calsans text-3xl">Manage your account</h1>
      <Avatar custom="w-24 h-24 mt-2" src={user?.imageUrl} />
      <AlertDialog>
        <AlertDialogTrigger custom="mt-4" type="button">
          Set your picture
        </AlertDialogTrigger>
        <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max">
          <AlertDialogHeader>
            <p>Set your profile picture</p>
            <AlertDialogClose />
          </AlertDialogHeader>
          <UserSetPicture />
        </AlertDialogContent>
      </AlertDialog>
      <Form className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <FormField>
          <FormLabel>First Name</FormLabel>
          <FormInput />
        </FormField>
        <FormField>
          <FormLabel>Last Name</FormLabel>
          <FormInput></FormInput>
        </FormField>
        <FormField>
          <FormLabel>Description</FormLabel>
          <FormTextarea></FormTextarea>
        </FormField>
      </Form>
    </div>
  );
}
