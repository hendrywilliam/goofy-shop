import { z } from "zod";

export const cityValidation = z.object({
  name: z.string(),
});
