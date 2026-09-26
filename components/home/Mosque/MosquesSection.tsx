import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MosqueCard from "./MosqueCard";
import { getMosques } from "@/lib/features/mosque/services/mosque.service";
import { Mosque } from "@/lib/features/mosque/types";


export default async function MosquesSection() {
  let mosques: Mosque[] = [];
  
  try{
    const response = await getMosques(1);
    mosques = response.data;
    console.log("Mosques fetched successfully:", response);
  }catch(error){
    console.error("Error fetching mosques:", error);
  }

  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-primary">
              مساجدنا
            </span>

            <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              في رحاب المساجد يبدأ الطريق
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
              مساجد تحتضن حلقات القرآن    
            </p>
          </div>

          <Link
            href="/mosques"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-700"
          >
            عرض جميع المساجد
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mosques.map((mosque) => (
            <MosqueCard key={mosque.id} mosque={mosque} />
          ))}
        </div>
      </div>
    </section>
  );
}