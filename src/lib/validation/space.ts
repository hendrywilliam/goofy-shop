import { z } from "zod";

export const spaceValidation = z.object({
  id: z.string().optional(),
  authorId: z.string(),
  name: z
    .string()
    .min(10, {
      message: "Name must contains 10 characters",
    })
    .max(200),
  cityId: z.string(),
  description: z
    .string()
    .min(25, {
      message: "Please describe your place with minimal 25 characters",
    })
    .max(500),
  numberRooms: z.number().positive().min(1).default(1),
  availableDates: z.object({
    from: z.coerce
      .date({
        required_error: "Please provide available dates",
        invalid_type_error: "Type error",
      })
      .optional(),
    to: z.coerce
      .date({
        invalid_type_error: "Type error",
      })
      .optional(),
  }),
  numberBathrooms: z.number().positive().min(1).default(1),
  maxGuest: z.number().positive().default(0).default(1),
  price: z.number().positive(),
  longitude: z.number(),
  latitude: z.number(),
  photo: z.any().refine((files) => files?.length > 0, {
    message: "Image is required",
  }),
});

export const spaceFilterValidation = z
  .object({
    min_price: z.number().min(15000, "Minimum price is 15000").default(15000),
    max_price: z
      .number()
      .max(21000000, "Maximum price is 21000000")
      .default(21000000),
    rooms: z.number().min(1, "Minimum room is 1").default(1),
    bathrooms: z.number().min(1, "Minimum bathrooms is 1").default(1),
    guest: z.number().min(1, "Minimum guest is 1").default(1),
  })
  .refine((data) => data?.min_price <= data?.max_price, {
    message: "Minimum price cannot higher than maximum price",
  });
