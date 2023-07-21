import { z } from "zod";

export const authValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid email. Please provide proper email." }),
  // minimal 8 chars, one letter and one number
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Password must contains atleast 8 characters, with one number.",
  }),
});
