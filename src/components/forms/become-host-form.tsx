"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api/api";
import { productValidation } from "@/lib/validation/product";
import { z } from "zod";

export type ProductInput = z.infer<typeof productValidation>;

export default function BecomeHostForm() {
  const productMutation = api.products.createProduct.useMutation();

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
      <p>Are you ready to become a host?</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="border"
            {...register("name")}
            type="text"
            name="name"
          />
          <p>{errors.name?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            className="border"
            {...register("price")}
            type="number"
            name="price"
          />
          <p>{errors.price?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            className="border"
            {...register("description")}
            type="text"
            name="description"
          />
          <p>{errors.description?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="is_available">Is Available?</label>
          <input
            className="border"
            {...register("isAvailable")}
            type="text"
            name="is_available"
          />
          <p>{errors.description?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="region">Set region</label>
          <input
            className="border"
            {...register("region")}
            type="text"
            name="region"
          />
          <p>{errors.region?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="photos">Photos</label>
          <input
            className="border"
            {...register("photos")}
            type="text"
            name="photos"
          />
          <p>{errors.photos?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="features">Features</label>
          <input
            className="border"
            {...register("features")}
            type="text"
            name="features"
          />
          <p>{errors.features?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="tags">Tags</label>
          <input
            className="border"
            {...register("tags")}
            type="text"
            name="tags"
          />
          <p>{errors.tags?.message}</p>
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="authorId">Author id</label>
          <input
            className="border"
            {...register("authorId")}
            type="text"
            name="authorId"
          />
          <p>{errors.authorId?.message}</p>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
