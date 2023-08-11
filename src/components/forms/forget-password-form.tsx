"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { checkEmailValidation } from "@/lib/validation/user";
import { z } from "zod";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type InputForgetPassword = z.infer<typeof checkEmailValidation>;

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForgetPassword>({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(checkEmailValidation),
  });
  const { isLoaded, signIn } = useSignIn();

  function onSubmit(data: InputForgetPassword) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const firstFactor = await signIn?.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        });

        if (firstFactor?.status === "needs_first_factor") {
          toast.message("Check your email", {
            description: "We have sent verification code to your email",
          });
          router.push("/forget-password/step-2");
        }
      } catch (err) {
        captureError(err);
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel className="text-xl mb-2 font-calsans">
          Find your account
        </FormLabel>
        <FormInput
          {...register("email")}
          placeholder="cutelofigirl@gmail.com"
        />
        {/* avoid cumulative layout shift*/}
        {errors.email?.message ? (
          <FormMessage variant="error" custom="text-sm h-10">
            {errors.email?.message}
          </FormMessage>
        ) : (
          <FormMessage custom="text-sm h-10" variant="muted">
            (Enter the email associated with your account to change your
            password)
          </FormMessage>
        )}
      </FormField>
      <FormField>
        <FormInput
          custom="w-full border mt-2 bg-black text-white"
          type="submit"
          value="Submit"
          disabled={isPending}
        />
      </FormField>
    </Form>
  );
}
