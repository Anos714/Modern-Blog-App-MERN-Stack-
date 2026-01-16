import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const profileSchema = z.object({
  avatar: z.any().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
});

export const blogSchema = z.object({
  title: z.string().min(1, "title is required"),
  subTitle: z.string().min(1, "sub title is required"),
  category: z.string().min(1, "category is required"),
  content: z.string().min(1, "content is required"),
  image: z.any(),
  isFeatured: z.boolean(),
});
