import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  phone: z
    .string()
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number format")
    .optional(),
  email: z.email(),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must not exceed 20 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateAddressSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
  addressLine1: z.string(),
  country: z.string({ message: "Country is required" }).array(),
  state: z.string(),
  city: z.string(),
  zipCode: z.string().optional(),
  phone: z
    .string()
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number format")
    .optional(),
  email: z.email(),
});
