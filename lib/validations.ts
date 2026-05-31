import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: emailSchema,
  phone: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  companyId: z.string().optional(),
  notes: z.string().optional(),
});

export const dealSchema = z.object({
  title: z.string().min(1, "Deal title is required"),
  value: z.number().positive("Value must be positive"),
  stage: z.enum(["lead", "qualified", "proposal", "negotiation", "closed_won", "closed_lost"]),
  probability: z.number().min(0).max(100),
  expectedCloseDate: z.string().min(1, "Close date is required"),
  contactId: z.string().optional(),
  companyId: z.string().optional(),
  description: z.string().optional(),
});

export const productSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Product name is required"),
  category: z.enum([
    "raw_materials",
    "structural_steel",
    "alloys",
    "fasteners",
    "coatings",
    "tools",
    "machinery",
    "safety",
    "consumables",
  ]),
  unitPrice: z.number().positive("Price must be positive"),
  unit: z.enum(["kg", "ton", "piece", "meter", "liter", "set"]),
  description: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type DealInput = z.infer<typeof dealSchema>;
export type ProductInput = z.infer<typeof productSchema>;
