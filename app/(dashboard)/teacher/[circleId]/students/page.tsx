import DashboardPage from "@/components/dashboard/DashboardPage";
import StudentCard from "@/components/student/StudentCard";
import Button from "@/components/UI/Button";
import { getStudentsByCircle } from "@/lib/features/student/services/student.service";
import { Search } from "lucide-react";

export default async function CircleStudentsPage({ params }: {
    params: { circleId: string };
}) {
    const { circleId } = await params;
    const studentsData = await getStudentsByCircle(circleId, 1);
    const students = studentsData.data;

    return (
        <DashboardPage>
            {/* Header */}
            <header>
                <div className="py-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-gray-800">الطلاب</h1>
                    <Button
                        size="md"
                        href={`/teacher/${circleId}/students/add`}
                        className="bg-[#3eb1d3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#36a0c0] transition-colors"
                    >
                        إضافة طالب جديد
                    </Button>
                </div>
            </header>
                        <div>
                {/* Search Bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="ابحث عن طالب..."
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 pr-11 text-sm text-gray-700 focus:outline-none focus:border-[#3eb1d3] focus:ring-1 focus:ring-[#3eb1d3] transition-all shadow-sm"
                    />
                    <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
                </div>

                {/* Students List */}
                <div className="space-y-3">
                    {students.length > 0 ? (
                        students.map((student) => (
                            <StudentCard
                                key={student.id}
                                student={student}
                                circleId={params.circleId}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-gray-100">
                            لا يوجد طلاب نشطين في هذه الحلقة حالياً.
                        </div>
                    )}
                </div>
            </div>
        </DashboardPage>
    );
}