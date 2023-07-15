import { z } from "zod";

// export const authValidation = z.object({
//   email: z.string().email(),

//   password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
//   name: z.string().nullable(),
//   emailVerified: z.boolean().nullable(),
//   reviews: z.number().default(0),
//   stars: z.string().nullable(),
//   description: z.string().max(255).nullable(),
//   avatar: z.string().nullable(),
// });

export const authValidation = z.object({
  email: z.string().email(),
  //Minimum eight characters, at least one letter and one number:
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
