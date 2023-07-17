import { z } from "zod";

export const amenityValidation = z.object({
  name: z.string(),
});
