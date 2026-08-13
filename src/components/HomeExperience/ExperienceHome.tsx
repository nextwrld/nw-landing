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

function navAnchorId(content: HomepageContent, navId: string): string | undefined {
  const item = content.nav.items.find((entry) => entry.id === navId);
  if (!item?.approved || !item.destination) {
    return undefined;
  }
  return item.destination.replace(/^\/?#/, "");
}

const HomeExperience = ({
  locale,
  content,
}: {
  locale: Locale;
  content: HomepageContent;
}) => {
  const servicesAnchor = navAnchorId(content, "services");
  const methodAnchor = navAnchorId(content, "method");
  const casesAnchor = navAnchorId(content, "cases");
  const aboutAnchor = navAnchorId(content, "about");

  return (
    <main id="main-content">
      <Hero content={content.hero} locale={locale} />
      <Problem content={content.problem} />
      <Impact content={content.impact} />
      <BetterWay content={content.betterWay} />
      <div id={servicesAnchor}>
        <Capabilities content={content.capabilities} />
      </div>
      <ChapterDivider />
      <div id={methodAnchor}>
        <Method content={content.method} />
      </div>
      <ChapterDivider />
      <div id={aboutAnchor}>
        <Differentiation content={content.differentiation} />
      </div>
      <ChapterDivider />
      <div id={casesAnchor}>
        <EvidenceSection content={content.evidence} />
      </div>
      <ChapterDivider />
      <Diagnosis content={content.diagnosis} locale={locale} />
      <ChapterDivider />
      <Faq content={content.faq} />
      <FinalCTA content={content.finalCta} locale={locale} />
    </main>
  );
};

export default HomeExperience;
