import HeroSection from "@/components/home/HeroSection";
import homeData from "@/components/home/home.json"
import MosquesSection from "@/components/home/MosquesSection";
import ParentSection from "@/components/home/ParentSection";
import PostsSection from "@/components/home/PostsSection";
import StatsSection from "@/components/home/StatsSection";

export default function HomePage() {
  const mosques = homeData.mosques.slice(0, 3);
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-neutral-900 scroll-smooth"
    >
      <main>
        <HeroSection data={homeData.hero} />

        <StatsSection stats={homeData.stats} />

        <MosquesSection mosques={mosques} />

        <ParentSection features={homeData.parentFeatures} />

        <PostsSection posts={homeData.posts} />
      </main>
    </div>
  );
}