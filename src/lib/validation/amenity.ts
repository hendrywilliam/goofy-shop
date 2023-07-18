import { z } from "zod";

export const amenityValidation = z.object({
  id: z.string().optional(),
  name: z.string(),
  spaceId: z.string(),
});

export const onlyIdAmenityValidation = amenityValidation.pick({ id: true });
