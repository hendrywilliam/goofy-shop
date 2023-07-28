"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authValidation } from "@/lib/validation/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/hooks/use-is-mounted";

type AuthValidation = z.infer<typeof authValidation>;

export default function SignInForm() {
  //hooks
  const { signIn } = useSignIn();
  const mounted = useIsMounted();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidation>({
    resolver: zodResolver(authValidation),
  });

  const onSubmit: SubmitHandler<AuthValidation> = async (data) => {
    console.log(data);

    await signIn
      ?.create({
        identifier: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          //please use toast later
          //@todo add sign 0auth
          alert("Success login");
          if (mounted) {
            router.push("/");
          }
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.log(err));
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
