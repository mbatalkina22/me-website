import HeroSection from "@/components/HeroSection";
import AthleteSpirit from "@/components/AthleteSpirit";
import Projects from "@/components/Projects";
import SkillsMarquee from "@/components/SkillsMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AthleteSpirit />
      <Projects />
      <SkillsMarquee />
      <Footer />
    </main>
  );
}
