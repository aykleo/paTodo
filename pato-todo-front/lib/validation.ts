import { z } from "zod";

export const userRegisterValidation = z
  .object({
    username: z.string().min(3, "Password must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z
      .string()
      .min(10, "Password must be at least 10 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const userLoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const todoValidation = z.object({
  title: z
    .string()
    .min(5, "Title must have at least 5 characters")
    .max(20, "Title must be at most 20 characters"),
  description: z
    .string()
    .min(10, "Description must have at least 10 characters")
    .max(100, "Description must be at most 100 characters"),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date")
    .transform((val) => new Date(val)),
});
