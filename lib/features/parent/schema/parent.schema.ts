import { z } from "zod";

export const linkStudentSchema = z.object({
  code: z
    .string()
    .min(1, "يرجى إدخال كود الربط")
    .length(6, "كود الربط يجب أن يتكون من 6 رموز تماماً") // بناءً على الكود الذي تم توليده في الباك إند
    .regex(/^[A-Z0-9]+$/, "الكود يحتوي على أحرف إنجليزية كبيرة وأرقام فقط"), // حماية إضافية (Type-Safety)
});

export type LinkStudentData = z.infer<typeof linkStudentSchema>;