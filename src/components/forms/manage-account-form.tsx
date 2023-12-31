"use client";

import * as React from "react";
import { Form, FormField, FormLabel, FormInput } from "@/components/ui/form";
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
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { profileValidation } from "@/lib/validation/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { captureError } from "@/lib/utils";

type ProfileInput = z.infer<typeof profileValidation>;

export default function ManageAccountForm() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isPending, startTransition] = React.useTransition();

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileValidation),
  });

  function onSubmit(data: ProfileInput) {
    startTransition(async () => {
      try {
        console.log(data);
        if (!isLoaded || !isSignedIn) {
          return;
        }

        if (data.firstName || data.lastName) {
          await user.update({
            firstName: data.firstName,
            lastName: data.lastName,
          });
        }

        if (data.newPassword) {
          await user.updatePassword({
            newPassword: data.newPassword,
          });
        }
        toast("Update data successfully.");
      } catch (err) {
        captureError(err);
      }
    });
  }

  function onError(error: FieldErrors<ProfileInput>) {
    const firstError = Object.values(error)[0];
    toast(firstError?.message?.toString());
  }

  return (
    <div className="w-full lg:w-1/2 lg:h-[600px]">
      <h1 className="text-3xl font-bold">Manage your account</h1>
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
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4"
      >
        <FormField>
          <FormLabel className="text-muted">First Name</FormLabel>
          <FormInput
            {...register("firstName")}
            defaultValue={user?.firstName ?? ""}
          />
        </FormField>
        <FormField>
          <FormLabel className="text-muted">Last Name</FormLabel>
          <FormInput
            {...register("lastName")}
            defaultValue={user?.lastName ?? ""}
          />
        </FormField>
        <FormField>
          <FormLabel className="text-muted">New Password</FormLabel>
          <FormInput {...register("newPassword")} type="password" />
        </FormField>
        <FormField>
          <FormLabel className="text-muted">Confirm New Password</FormLabel>
          <FormInput {...register("confirmPassword")} type="password" />
        </FormField>
        <FormField custom="col-span-full">
          <FormInput
            custom="w-full disabled:text-muted"
            type="submit"
            value="Submit Changes"
            disabled={isPending}
          />
        </FormField>
      </Form>
    </div>
  );
}
