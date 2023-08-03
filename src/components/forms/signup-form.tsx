"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/validation/user";
import { Form, FormField, FormInput, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { captureError } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { addUserToDatabase } from "@/app/_actions/auth";
import { ClerkDataUser } from "@/types";

type RegistrationInput = z.infer<typeof authValidation>;

export default function RegistrationForm() {
  const { isLoaded, signUp } = useSignUp();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(authValidation),
  });

  async function onSubmit(data: RegistrationInput) {
    if (!isLoaded) return;

    try {
      //add user to vendor
      const res = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      //passing plain object (serialization)
      const userData = {
        createdUserId: res.createdUserId,
        firstName: res.firstName,
        lastName: res.lastName,
      } satisfies ClerkDataUser;

      //add user to database
      if (res) {
        await addUserToDatabase(userData);
      }
      toast(`Success created a new account, you may login now.`);
    } catch (error) {
      captureError(error);
    }
  }

  function onError(error: FieldErrors<RegistrationInput>) {
    const firstError = Object.values(error)[0];
    toast(firstError.message?.toString());
  }
  return (
    <Form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormField className="flex flex-col">
        <FormLabel className="text-sm" htmlFor="email">
          Email
        </FormLabel>
        <FormInput
          {...register("email")}
          type="text"
          name="email"
          color={errors.email?.message ? "error" : "primary"}
          custom="w-full"
        />
        {errors.email ? (
          <FormMessage variant="error" size="sm">
            {errors.email.message}
          </FormMessage>
        ) : (
          <FormMessage size="sm" variant="muted">
            (e.g: cutielofigirl@gmail.com)
          </FormMessage>
        )}
      </FormField>
      <FormField className="flex flex-col">
        <FormLabel className="text-sm" htmlFor="password">
          Password
        </FormLabel>
        <FormInput
          {...register("password")}
          type="password"
          name="password"
          color={errors.password?.message ? "error" : "primary"}
          custom="w-full"
        />
        {errors.password ? (
          <FormMessage variant="error" size="sm">
            {errors.password?.message}
          </FormMessage>
        ) : (
          <FormMessage size="sm" variant="muted">
            (Password minimum 8 characters & atleast 1 number.)
          </FormMessage>
        )}
      </FormField>
      <FormField>
        <p className="text-sm my-2">
          Already have an account?{" "}
          <span>
            <Link className="font-semibold" href="/sign-in">
              Sign in
            </Link>
          </span>
        </p>
        <FormInput
          custom="w-full bg-black text-white"
          type="submit"
          value="Register"
        />
      </FormField>
    </Form>
  );
}
