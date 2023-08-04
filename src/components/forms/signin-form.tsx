"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authValidation } from "@/lib/validation/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { captureError } from "@/lib/utils";

type Input = z.infer<typeof authValidation>;

export default function SignInForm() {
  //hooks
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(authValidation),
  });

  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (!isLoaded) {
      return;
    }
    try {
      const loginResult = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });

      if (loginResult.status === "complete") {
        toast("Login success.");
        await setActive({ session: loginResult.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      captureError(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField className="flex flex-col">
          <FormLabel className="text-sm" htmlFor="email">
            Email
          </FormLabel>
          <FormInput {...register("email")} type="email" name="email" />
          <FormMessage variant="error">{errors.email?.message}</FormMessage>
        </FormField>
        <FormField className="flex flex-col">
          <FormLabel className="text-sm" htmlFor="password">
            Password
          </FormLabel>
          <FormInput
            {...register("password")}
            type="password"
            name="password"
          />
          <FormMessage variant="error">{errors.password?.message}</FormMessage>
        </FormField>
        <p className="text-sm my-2">
          Dont have an account?{" "}
          <span>
            <Link className="font-semibold" href="/sign-up">
              Sign up
            </Link>
          </span>
        </p>
        <FormInput
          custom="w-full bg-black text-white cursor-pointer"
          type="submit"
          value="Login"
        />
      </Form>
    </>
  );
}
