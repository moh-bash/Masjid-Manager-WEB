import { notFound } from "next/navigation";
import homeData from "@/components/home/home.json";
import MosqueDetails from "@/components/home/Mosque/MosqueDetails";
import { getMosqueById } from "@/lib/features/mosque/services/mosque.service";

interface MosqueDetailsPageProps {
  params: Promise<{
    mosqueId: string;
  }>;
}

export default async function MosqueDetailsPage({
  params,
}: MosqueDetailsPageProps) {
  const { mosqueId } = await params;

  let mosque;
  try {
    const response = await getMosqueById(mosqueId);
    mosque = response;
  } catch (error) {
    console.error("Error fetching mosque details:", error);
    mosque = null;
  }

  if (!mosque) {
    notFound();
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-neutral-50 text-neutral-900"
    >
        <MosqueDetails mosque={mosque} />
    </div>
  );
}