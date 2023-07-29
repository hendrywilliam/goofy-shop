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

export const profileValidation = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .partial()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
