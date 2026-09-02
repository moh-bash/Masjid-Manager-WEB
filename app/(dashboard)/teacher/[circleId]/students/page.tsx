import StudentCard from "@/components/student/StudentCard";
import { getStudentsByCircle } from "@/lib/features/student/services/student.service";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export default async function CircleStudentsPage({
    params,
}: {
    params: { circleId: string };
}) {
    const { circleId } = await params;
    const studentsData = await getStudentsByCircle(circleId, 1);
    const students = studentsData.data;

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans" dir="rtl">

            {/* Header */}
             
            <main className="px-5 mt-6 max-w-2xl mx-auto">

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
            </main>

            {/* Floating Add Button */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
                <div className="max-w-2xl mx-auto">
                    <button className="w-full bg-[#3eb1d3] hover:bg-[#349bb8] text-white font-bold py-4 rounded-xl shadow-lg transition-colors text-lg">
                        إضافة طالب جديد
                    </button>
                </div>
            </div>

        </div>
    );
}