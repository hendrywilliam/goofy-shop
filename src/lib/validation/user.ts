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

export const checkEmailValidation = z.object({
  email: authValidation.shape.email,
});

export const stepTwoCodeValidation = z
  .object({
    code: z.string().length(6, {
      message: "Verification only accepts code with 6 characters",
    }),
    newPassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: "Password must contains atleast 8 characters, with one number.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password does not match with new confirm password.",
    path: ["confirmPassword"],
  });
