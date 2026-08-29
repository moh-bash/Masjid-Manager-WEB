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
      <header>
        <MosqueSwitcher mosques={mosques} />
      </header>

      <main>{children}</main>
    </div>
  );
}