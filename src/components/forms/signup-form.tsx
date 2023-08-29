"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { authValidation } from "@/lib/validation/user";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { captureError } from "@/lib/utils";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegistrationInput = z.infer<typeof authValidation>;

export default function RegistrationForm() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(authValidation),
  });

  async function onSubmit(data: RegistrationInput) {
    if (!isLoaded) return;

    try {
      const res = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.first_name,
        lastName: data.last_name,
      });

      if (res.status === "complete") {
        router.push("/");
        toast(`Account created. Redirecting to homepage.`);
      }
    } catch (error) {
      captureError(error);
    }
  }

  function onError(error: FieldErrors<RegistrationInput>) {
    const firstError = Object.values(error)[0];
    toast(firstError.message?.toString());
  }
  return (
    <Form
      className="flex-col w-full gap-2"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormField>
        <h1 className="font-bold text-3xl">Register</h1>
      </FormField>
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
        <FormMessage size="sm" variant="muted">
          (e.g: cutielofigirl@gmail.com)
        </FormMessage>
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
        <FormMessage size="sm" variant="muted">
          (Password must contains atleast 8 characters (with 1 number))
        </FormMessage>
      </FormField>
      <FormField className="flex flex-col">
        <FormLabel className="text-sm" htmlFor="first_name">
          First Name
        </FormLabel>
        <FormInput
          {...register("first_name")}
          name="first_name"
          color={errors.first_name?.message ? "error" : "primary"}
          custom="w-full"
        />
        <FormMessage size="sm" variant="muted">
          (e.g Lofi)
        </FormMessage>
      </FormField>
      <FormField className="flex flex-col">
        <FormLabel className="text-sm" htmlFor="lastName">
          Last Name
        </FormLabel>
        <FormInput
          {...register("last_name")}
          name="last_name"
          color={errors.last_name?.message ? "error" : "primary"}
          custom="w-full"
        />
        <FormMessage size="sm" variant="muted">
          (e.g Girl)
        </FormMessage>
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
