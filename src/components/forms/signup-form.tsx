"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/validation/user";
import { Form, FormField, FormInput, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";

type RegistrationInput = z.infer<typeof authValidation>;

export default function RegistrationForm() {
  /**
   * useSignUp is a custom hook that gives an access to signup object
   * this will allow us to build our "own" sign-up flow
   * its an alternative for "prebuilt-component"
   * @see https://clerk.com/docs/authentication/usesignup-and-usesignin
   */

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
    console.log(data);
    if (!isLoaded) return;

    try {
      //@todo add more functionality
      //like "prepareForVerification"
      const res = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      console.log(res);
      // await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (e) {
      //@ts-ignore
      console.log(e.errors[0].longMessage);
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  //@todo add 0auth

  return (
    <Form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
