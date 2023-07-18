import { z } from "zod";

export const spaceValidation = z.object({
  id: z.string().optional(),
  authorId: z.string(),
  name: z.string().min(10).max(30),
  cityId: z.string(),
  description: z.string().min(25).max(500),
  numberRooms: z.number().positive().default(0),
  numberBathrooms: z.number().positive().default(0),
  maxGuest: z.number().positive().default(0),
  price: z.number().positive().default(0),
  longitude: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
});
