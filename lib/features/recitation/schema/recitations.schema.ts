import { z } from "zod";
import suras from "@/lib/data/suras.json";
import { Sura } from "../types";

const suraList = suras as unknown as Sura[];

export const createRecitationSchema = z
  .object({
    studentId: z.string().uuid("معرف الطالب غير صالح"),
    suraNumber: z
      .number()
      .int("رقم السورة يجب أن يكون عدداً صحيحاً")
      .min(1, "رقم السورة مطلوب")
      .max(114, "رقم السورة يجب أن يكون بين 1 و 114"),
    startAyah: z
      .number()
      .int("رقم الآية يجب أن يكون عدداً صحيحاً")
      .min(1, "رقم البداية مطلوب"),
    endAyah: z
      .number()
      .int("رقم الآية يجب أن يكون عدداً صحيحاً")
      .min(1, "رقم النهاية مطلوب"),
    score: z
      .number()
      .int("الدرجة يجب أن تكون عدداً صحيحاً")
      .min(0, "الدرجة يجب أن تكون بين 0 و 100")
      .max(100, "الدرجة يجب أن تكون بين 0 و 100"),
    notes: z.string().max(500, "الملاحظات يجب ألا تتجاوز 500 حرف").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endAyah < data.startAyah) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endAyah"],
        message: "آية النهاية يجب أن تكون أكبر من أو تساوي آية البداية",
      });
    }

    const sura = suraList.find((s) => s.number === data.suraNumber);
    if (sura && data.endAyah > sura.total_verses) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endAyah"],
        message: `سورة ${sura.name} تحتوي على ${sura.total_verses} آية فقط`,
      });
    }
  });

export type CreateRecitationData = z.infer<typeof createRecitationSchema>;