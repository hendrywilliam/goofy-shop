import { z } from "zod";

export const cityValidation = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export const idCityValidation = cityValidation.pick({
  id: true,
});
