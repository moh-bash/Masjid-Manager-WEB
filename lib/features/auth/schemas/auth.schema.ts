import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يحتوي على حرفين على الأقل"),

  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),

  phoneNumber: z
    .string()
    .regex(
      /^(09)\d{10}$/,
      "رقم الهاتف غير صالح",
    ),

  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح"),

  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export type LoginData = z.infer<typeof loginSchema>;