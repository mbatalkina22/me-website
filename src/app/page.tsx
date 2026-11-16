import HeroManifesto from "@/components/HeroManifesto";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SkillsMarquee from "@/components/SkillsMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroManifesto />
      <Projects />
      <Experience />
      <SkillsMarquee />
      <Footer />
    </main>
  );
}
