import { z } from "zod";

export const reviewValidation = z.object({
  id: z.string().optional(),
  userId: z.string(),
  spaceId: z.string(),
  //max 255 characters
  content: z.string().max(255),
  stars: z.number().default(5),
});

export const idReviewValidation = reviewValidation.pick({ id: true });
