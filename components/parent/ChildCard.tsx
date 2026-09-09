import Image from "next/image";
import Link from "next/link";
import { MapPin, BookOpen, User as UserIcon } from "lucide-react";
import { LinkedChild } from "@/lib/features/student/types";

interface ChildCardProps {
  child: LinkedChild;
}

export default function ChildCard({ child }: ChildCardProps) {
  return (
    <Link 
      href={`/parent/${child.id}`}
      className="flex flex-col p-5 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 group relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary/20 group-hover:bg-primary transition-colors" />

      <div className="flex items-center justify-between mb-4 pl-2">
        <div className="flex items-center gap-4 text-right flex-row-reverse">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
            <Image
              src={`https://i.pravatar.cc/150?u=${child.id}`}
              alt={`صورة ${child.name}`}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
              {child.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
          <span>{child.mosqueName}</span>
          <MapPin size={16} className="text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
          <span>{child.circleName}</span>
          <BookOpen size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
          <span>{child.teacherName}</span>
          <UserIcon size={16} className="text-gray-400" />
        </div>
      </div>
    </Link>
  );
}