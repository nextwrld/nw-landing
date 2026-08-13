import Hero from "./Hero";
import Problem from "./Problem";
import Impact from "./Impact";
import BetterWay from "./BetterWay";
import Capabilities from "./Capabilities";
import Method from "./Method";
import Differentiation from "./Differentiation";
import EvidenceSection from "./EvidenceSection";
import Diagnosis from "./Diagnosis";
import Faq from "./FAQ";
import FinalCTA from "./FinalCTA";
import ChapterDivider from "./ChapterDivider";
import type { Locale } from "@/i18n/config";
import type { HomepageContent } from "@/content/homepage/types";

const HomeExperience = ({
  locale,
  content,
}: {
  locale: Locale;
  content: HomepageContent;
}) => {
  return (
    <main id="main-content">
      <Hero content={content.hero} locale={locale} />
      <Problem content={content.problem} />
      <Impact content={content.impact} />
      <BetterWay content={content.betterWay} />
      <Capabilities content={content.capabilities} />
      <ChapterDivider />
      <Method content={content.method} />
      <ChapterDivider />
      <Differentiation content={content.differentiation} />
      <ChapterDivider />
      <EvidenceSection content={content.evidence} />
      <ChapterDivider />
      <Diagnosis content={content.diagnosis} locale={locale} />
      <ChapterDivider />
      <Faq content={content.faq} />
      <FinalCTA content={content.finalCta} locale={locale} />
    </main>
  );
};

export default HomeExperience;
