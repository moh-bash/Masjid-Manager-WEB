import { Mosque } from "lucide-react";
import { getMyMosques } from "@/lib/features/mosque/services/mosque.service";
import MosqueSwitcher from "@/components/mosque/MosqueSwitcher";

export default async function MosqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mosques = await getMyMosques();

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
            <Mosque size={18} />
          </span>
          <MosqueSwitcher mosques={mosques} />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
