import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { StructuredData } from "@/components/shared/structured-data";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { MouseSpotlight } from "@/components/shared/mouse-spotlight";
import { SectionDivider } from "@/components/shared/section-divider";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <StructuredData />
      <ScrollProgress />
      <MouseSpotlight />
      <ScrollToTop />
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <SectionDivider className="mx-auto max-w-5xl" />
          <SkillsSection />
          <SectionDivider className="mx-auto max-w-5xl" />
          <ProjectsSection />
          <SectionDivider className="mx-auto max-w-5xl" />
          <ExperienceSection />
          <SectionDivider className="mx-auto max-w-5xl" />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
