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

type AuthValidation = z.infer<typeof authValidation>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidation>({
    resolver: zodResolver(authValidation),
  });

  const onSubmit: SubmitHandler<AuthValidation> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <FormLabel htmlFor="email">Input your email</FormLabel>
          <FormInput {...register("email")} type="email" name="email" />
          <FormMessage color="error">{errors.email?.message}</FormMessage>
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Input your password</FormLabel>
          <FormInput {...register("password")} type="string" name="password" />
          <FormMessage color="error">{errors.password?.message}</FormMessage>
        </FormField>
        <FormInput type="submit" value="Submit" />
      </Form>
    </>
  );
}
