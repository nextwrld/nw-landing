import Hero from "./Hero";
import Problem from "./Problem";
import Impact from "./Impact";
import BetterWay from "./BetterWay";
import Capabilities from "./Capabilities";
import Method from "./Method";
import Differentiation from "./Differentiation";
import AIONProductShowcase from "./AIONProductShowcase";
import CaseEvidence from "./CaseEvidence";
import Diagnosis from "./Diagnosis";
import Faq from "./FAQ";
import FinalCTA from "./FinalCTA";
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
      <Hero content={content.hero} />
      <Problem content={content.problem} />
      <Impact content={content.impact} />
      <BetterWay content={content.betterWay} />
      <Capabilities content={content.capabilities} />
      <Method content={content.method} />
      <Differentiation content={content.differentiation} />
      <section id={content.evidence.id} className="homepage-evidence">
        <h2>{content.evidence.heading}</h2>
        <AIONProductShowcase content={content.evidence} />
        <CaseEvidence content={content.evidence} />
      </section>
      <Diagnosis content={content.diagnosis} locale={locale} />
      <Faq content={content.faq} />
      <FinalCTA content={content.finalCta} locale={locale} />
    </main>
  );
};

export default HomeExperience;
