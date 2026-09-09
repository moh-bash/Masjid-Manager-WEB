import HeroSection from "@/components/home/HeroSection";
import homeData from "@/components/home/home.json"
export default function HomePage() {
  return (
    <>
        <HeroSection data={homeData.hero} />
    </>
  );
}