import { z } from "zod";
import { OrphanStatus } from "../types";

export const createStudentSchema = z.object({
  name: z.string().min(2, "اسم الطالب يجب أن يحتوي على حرفين على الأقل"),
  dateOfBirth: z.string().min(1, "تاريخ الميلاد مطلوب"),
  motherName: z.string().min(2, "اسم الأم مطلوب"),
  orphanStatus: z.nativeEnum(OrphanStatus),
  registrationDate: z.string().min(1, "تاريخ التسجيل مطلوب"),
  circleId: z.string().uuid("يجب اختيار الحلقة التي سينضم إليها الطالب"),
  parentId: z
    .string()
    .uuid("معرف ولي الأمر غير صالح")
    .optional()
    .or(z.literal("")),
});

export const updateStudentSchema = createStudentSchema.partial();

export const transferStudentSchema = z.object({
  newCircleId: z.string().uuid("يجب اختيار الحلقة الجديدة"),
});

export type CreateStudentData = z.infer<typeof createStudentSchema>;
export type UpdateStudentData = z.infer<typeof updateStudentSchema>;
export type TransferStudentData = z.infer<typeof transferStudentSchema>;
