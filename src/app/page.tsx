import HeroManifesto from "@/components/HeroManifesto";
import Projects from "@/components/Projects";
import SkillsMarquee from "@/components/SkillsMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroManifesto />
      <Projects />
      <SkillsMarquee />
      <Footer />
    </main>
  );
}
