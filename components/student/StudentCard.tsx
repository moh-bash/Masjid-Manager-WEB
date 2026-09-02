import { Student } from "@/lib/features/student/types";
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
      className="flex items-center justify-end p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 hover:shadow-md hover:bg-gray-50 transition-all duration-200 group"
    >
      <div className="mr-4 text-right">
        <h3 className="font-bold text-gray-900 text-base group-hover:text-[#3eb1d3] transition-colors">
          {student.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1" dir="ltr">
          {joinDate}
        </p>
      </div>

      <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shrink-0 ml-4">
        <Image
          src={`https://i.pravatar.cc/150?u=${student.id}`}
          alt={`صورة ${student.name}`}
          width={56}
          height={56}
          className="object-cover w-full h-full"
        />
      </div>
    </Link>
  );
}