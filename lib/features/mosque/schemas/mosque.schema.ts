import { z } from "zod";

export const mosqueSchema = z.object({
  name: z
    .string()
    .min(2, "اسم المسجد يجب أن يحتوي على حرفين على الأقل"),
    managerEmail: z
    .string()
    .email("البريد الإلكتروني غير صالح"),
    location: z.object({
        lat: z.number().min(-90).max(90, "خط العرض يجب أن يكون بين -90 و 90"),
        lng: z.number().min(-180).max(180, "خط الطول يجب أن يكون بين -180 و 180"),
    }),
});

export type MosqueData = z.infer<typeof mosqueSchema>;