"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/validation/auth";
import { Form, FormField, FormInput, FormLabel, FormMessage } from "../ui/form";

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

  return (
    <div className="w-max h-max p-6 border rounded-md">
      <p className="">Sign up</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField className="flex flex-col">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            className="border p-2 rounded-md"
            {...register("email")}
            type="text"
            name="email"
          />
          <FormMessage color="error" size="sm">
            {errors.email?.message}
          </FormMessage>
        </FormField>
        <FormField className="flex flex-col">
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            className="border p-2 rounded-md"
            {...register("password")}
            type="password"
            name="password"
          />
          <FormMessage color="error" size="sm">
            {errors.password?.message}
          </FormMessage>
        </FormField>
        <FormField>
          <FormInput
            className="border p-2 mt-4 rounded-md"
            type="submit"
            value="Submit"
          />
        </FormField>
      </Form>
    </div>
  );
}
