import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { GoalsSection } from "./sections/GoalsSection";
import { PagesSection } from "./sections/PagesSection";
import { TechStackSection } from "./sections/TechStackSection";
import { DevFlowSection } from "./sections/DevFlowSection";
import { TeamSection } from "./sections/TeamSection";
import { LearningsSection } from "./sections/LearningsSection";
import { RetrospectSection } from "./sections/RetrospectSection";
import { FooterSection } from "./sections/FooterSection";

export default function Main() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <HeroSection />
      <OverviewSection />
      <GoalsSection />
      <PagesSection />
      <TechStackSection />
      <DevFlowSection />
      <TeamSection />
      <LearningsSection />
      <RetrospectSection />
      <FooterSection />
    </div>
  );
}
