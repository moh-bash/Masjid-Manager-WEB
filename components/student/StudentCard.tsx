import { Student } from "@/lib/features/student/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StudentCardProps {
  student: Student;
  circleId: string;
}

export default function StudentCard({ student, circleId }: StudentCardProps) {
  const joinDate = student.activeCircle?.joinDate
    ? new Date(student.activeCircle.joinDate).toISOString().split('T')[0]
    : "غير متوفر";

  return (
    <Link
      href={`/teacher/${circleId}/students/${student.id}`}
      className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 hover:shadow-md hover:bg-gray-50 transition-all duration-200 group"
    >
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shrink-0 ml-4">
          <div className="bg-primary-300 rounded-full h-13 w-13 flex items-center justify-center">
            <p className="text-white text-lg font-bold flex items-center justify-center h-full">
              {student.name[0].toUpperCase()}
            </p>
          </div>
        </div>
        <div className="mr-4 text-right">
          <h3 className="font-bold text-gray-900 text-base group-hover:text-[#3eb1d3] transition-colors">
            {student.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1" dir="ltr">
            {joinDate}
          </p>
        </div>
      </div>
      <ChevronLeft size={28} />
    </Link>
  );
}