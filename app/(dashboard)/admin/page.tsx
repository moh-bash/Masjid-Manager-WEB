import { StatCard } from '@/components/analytics/StatCard';
import { SystemHifzSection } from '@/components/analytics/SystemHifzSection';
import { Building2, Users, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { getSystemAdmin } from '@/lib/features/analytics/services/analytcs.service';
import DashboardPage from '@/components/dashboard/DashboardPage';

export const metadata = {
  title: 'الإحصائيات العامة | مدير النظام',
};

async function fetchSystemAnalytics() {
  try {
    return await getSystemAdmin();
  } catch {
    return null;
  }
}

export default async function SystemAnalyticsPage() {
  const data = await fetchSystemAnalytics();

  if (!data) {
    return (
      <div className="p-6 text-red-600 bg-red-50 rounded-xl border border-red-100">
        <h2 className="font-semibold text-lg mb-2">حدث خطأ أثناء جلب الإحصائيات</h2>
        <p className="text-sm">تأكد من صلاحياتك أو من عمل الخادم.</p>
      </div>
    );
  }

  const { kpis } = data;

  return (
    <DashboardPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">نظرة عامة على النظام</h1>
          <p className="text-slate-500">إحصائيات حية لجميع المساجد والمستخدمين في النظام.</p>
        </div>

        {/* شبكة الإحصائيات */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
          <StatCard
            title="إجمالي المساجد"
            value={kpis.totalMosques}
            icon={Building2}
            colorClass="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
          />
          <StatCard
            title="إجمالي الحلقات"
            value={kpis.totalCircles}
            icon={BookOpen}
            colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10"
          />
          <StatCard
            title="الطلاب المسجلين"
            value={kpis.totalStudents}
            icon={GraduationCap}
            colorClass="text-blue-600 bg-blue-50 dark:bg-blue-500/10"
          />
          <StatCard
            title="المعلمين"
            value={kpis.totalTeachers}
            icon={Users}
            colorClass="text-amber-600 bg-amber-50 dark:bg-amber-500/10"
          />
          <StatCard
            title="مدراء المساجد"
            value={kpis.totalManagers}
            icon={ShieldCheck}
            colorClass="text-purple-600 bg-purple-50 dark:bg-purple-500/10"
          />
        </div>

        {/* مخطط التلاوات وتقدم الحفظ عبر جميع المساجد */}
        <SystemHifzSection initialData={data} />
      </div>
    </DashboardPage>
  );
}
