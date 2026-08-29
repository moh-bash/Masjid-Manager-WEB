import Button from "@/components/UI/Button";
import { getMyMosques } from "@/lib/features/mosque/services/mosque.service";
import { redirect } from "next/navigation";

export default async function MosqueManager() {
  let mosques;

  try {
    mosques = await getMyMosques();
  } catch (error) {
    console.error("Error fetching mosques:", error);

    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        حدث خطأ أثناء جلب المساجد.
        <br />
        <Button href="/" size="lg">
          الرئيسية
        </Button>
      </div>
    );
  }

  if (mosques.length > 0) {
    redirect(`/mosque/${mosques[0].id}`);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      لست مشرفًا على أي مسجد بعد.
      <br />
      <Button href="/" size="lg">
        الرئيسية
      </Button>
    </div>
  );
}