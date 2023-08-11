"use client";

import * as React from "react";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoCodeValidation } from "@/lib/validation/user";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { captureError } from "@/lib/utils";
import { toast } from "sonner";

type StepTwoInputValidation = z.infer<typeof stepTwoCodeValidation>;

export default function ForgetPasswordStepTwoForm() {
  const [isPending, startTransition] = React.useTransition();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepTwoInputValidation>({
    resolver: zodResolver(stepTwoCodeValidation),
    mode: "onSubmit",
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: StepTwoInputValidation) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const attemptFirstFactor = await signIn?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: data.code,
          password: data.confirmPassword,
        });
        console.log(attemptFirstFactor);

        const { status, createdSessionId } = attemptFirstFactor;

        if (status === "complete") {
          setActive({ session: createdSessionId });
          router.push("/");
          toast.message("All set!", {
            description: "Password changed, redirecting you to login page.",
          });
        }
      } catch (err) {
        captureError(err);
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField custom="h-[120px]">
        <FormLabel className="text-sm font-calsans">
          Input verification code
        </FormLabel>
        <FormInput {...register("code")} max={6} />
        {errors.code?.message ? (
          <FormMessage custom="text-sm" variant="error">
            {errors.code.message}
          </FormMessage>
        ) : (
          <FormMessage custom="text-sm text-muted">
            (Please check your email for the verification code.)
          </FormMessage>
        )}
      </FormField>
      <FormField>
        <FormLabel className="text-sm font-calsans">
          Input new password
        </FormLabel>
      </FormField>
      <FormField custom="mt-2">
        <FormLabel className="text-sm">New password</FormLabel>
        <FormInput {...register("newPassword")} />
        {errors.newPassword?.message ? (
          <FormMessage custom="text-sm" variant="error">
            {errors.newPassword?.message}
          </FormMessage>
        ) : (
          <FormMessage custom="text-sm text-muted">
            (Input new password, contains: 8 characters with atleast 1 number)
          </FormMessage>
        )}
      </FormField>
      {/* avoid cumulative layout shift */}
      <FormField custom="h-[106px] mt-2">
        <FormLabel className="text-sm">Confirm new password</FormLabel>
        <FormInput {...register("confirmPassword")} />
        <FormMessage custom="text-sm" variant="error">
          {errors.confirmPassword?.message}
        </FormMessage>
      </FormField>
      <FormField custom="mt-2">
        <FormInput
          disabled={isPending}
          type="submit"
          value="Submit"
          custom="bg-black text-white"
        />
      </FormField>
    </Form>
  );
}
