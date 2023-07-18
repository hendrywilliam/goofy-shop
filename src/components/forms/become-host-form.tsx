"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api/api";
import { spaceValidation } from "@/lib/validation/space";
import { z } from "zod";

export type ProductInput = z.infer<typeof spaceValidation>;

export default function BecomeHostForm() {
  const productMutation = api.space.createSpace.useMutation();

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>();

  const onSubmit: SubmitHandler<ProductInput> = (data: ProductInput) => {
    console.log(data);
  };

  return (
    <div>
      <p>Under construction</p>
    </div>
  );
}
