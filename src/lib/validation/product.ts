import { z } from "zod";

export const productValidation = z.object({
  name: z.string().min(3).max(255),
  //price from string -> number
  price: z.string(),
  description: z.string().min(5).max(255),
  isAvailable: z.boolean().default(true),
  region: z.string(),
  photos: z.string().array(),
  features: z.string().array(),
  tags: z.string().array(),
  authorId: z.string(),
});
