import { z } from "zod";

export const reviewValidation = z.object({
  userId: z.string(),
  placeId: z.string(),
  //max 255 characters
  content: z.string().max(255),
  stars: z.number().default(5),
});
