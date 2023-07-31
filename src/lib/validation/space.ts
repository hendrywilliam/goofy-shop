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
  photo: z.any().refine((files) => files?.length > 0, {
    message: "Image is required",
  }),
  numberBathrooms: z.number().positive().min(1).default(1),
  maxGuest: z.number().positive().default(0).default(1),
  price: z.number().positive(),
  longitude: z.number(),
  latitude: z.number(),
});
