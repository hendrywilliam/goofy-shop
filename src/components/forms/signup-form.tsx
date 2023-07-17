"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { authValidation } from "@/lib/validation/auth";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

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
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  return (
    <div className="w-max h-max p-6 border rounded-md">
      <p className="">Sign up</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            {...register("email")}
            type="text"
            name="email"
          />
          <p>{errors.email?.message}</p>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            className="border"
            {...register("password")}
            type="password"
            name="password"
          />
          <p>{errors.password?.message}</p>
        </fieldset>
        <input type="Submit" value="Submit" />
      </form>
    </div>
  );
}
