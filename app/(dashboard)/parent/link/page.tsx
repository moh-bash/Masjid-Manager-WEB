import { Metadata } from "next";
import { UserPlus } from "lucide-react";
import LinkStudentForm from "@/components/parent/LinkStudentForm"; 
import DashboardPage from "@/components/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "ربط طالب جديد | لوحة ولي الأمر",
  description: "قم بربط حساب طالب بحسابك باستخدام كود الربط الخاص به",
};

export default function LinkStudentPage() {
  return (
    <DashboardPage>
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <UserPlus size={28} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            إضافة طالب جديد
          </h1>
        </div>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed pl-12">
          أدخل كود الربط المكون من 6 رموز الذي حصلت عليه من إدارة المسجد أو معلم الحلقة لربط الطالب بحسابك ومتابعة تقدمه وحضوره.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-gray-100 to-transparent opacity-50 blur-sm pointer-events-none" />
        
        <div className="relative">
          <LinkStudentForm />
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 border border-blue-100 p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-1">
          كيف أحصل على كود الربط؟
        </h4>
        <p className="text-sm text-blue-800/80 leading-relaxed">
           . يمكنك طلبه من 
          <strong> معلم الحلقة </strong> أو <strong> إدارة المسجد </strong>. الكود فريد ويستخدم لمرة واحدة لضمان خصوصية بيانات الطالب.
        </p>
      </div>

    </DashboardPage>
  );
}