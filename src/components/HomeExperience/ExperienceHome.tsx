import Hero from "./Hero";
import ProblemTransformation from "./ProblemTransformation";
import ServicesOverview from "./ServicesOverview";
import MethodSection from "./MethodSection";
import EvidenceSection from "./EvidenceSection";
import DiagnosisOffer from "./DiagnosisOffer";
import type { Locale } from "@/i18n/config";
import type { HomepageContent } from "@/content/homepage/types";

/**
 * V3 entry-door composition: exactly six content sections plus the shell.
 * No anchor navigation, no scrollspy, no chapter dividers — navigation is
 * route-based and depth lives on section sub-pages.
 */
const HomeExperience = ({
  locale,
  content,
}: {
  locale: Locale;
  content: HomepageContent;
}) => (
  <main id="main-content">
    <Hero content={content.hero} locale={locale} />
    <ProblemTransformation content={content.problem} />
    <ServicesOverview content={content.capabilities} locale={locale} />
    <MethodSection content={content.method} locale={locale} />
    <EvidenceSection content={content.evidence} />
    <DiagnosisOffer content={content.diagnosis} locale={locale} />
  </main>
);

export default HomeExperience;
