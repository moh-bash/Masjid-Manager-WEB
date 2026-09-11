import { notFound } from "next/navigation";
import homeData from "@/components/home/home.json";
import MosqueDetails from "@/components/home/MosqueDetails";

interface MosqueDetailsPageProps {
  params: Promise<{
    mosqueId: string;
  }>;
}

export default async function MosqueDetailsPage({
  params,
}: MosqueDetailsPageProps) {
  const { mosqueId } = await params;

  const mosque = homeData.mosques.find(
    (item) => item.id === mosqueId
  );

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