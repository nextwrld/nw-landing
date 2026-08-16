import AIONProductShowcase from "./AIONProductShowcase";
import CaseEvidence from "./CaseEvidence";
import TrackedLink from "@/components/Common/TrackedLink";
import { localizedHref } from "@/utils/i18n-url";
import { slugForRoute } from "@/content/sections";
import type { Locale } from "@/i18n/config";
import type { HomepageEvidence } from "@/content/homepage/types";

const EvidenceSection = ({
  content,
  locale,
}: {
  content: HomepageEvidence;
  locale: Locale;
}) => (
  <section id={content.id} className="homepage-evidence">
    <div className="experience-container homepage-evidence-head">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
    </div>
    <div className="aion-band">
      <AIONProductShowcase content={content} />
    </div>
    <CaseEvidence content={content} />
    <div className="experience-container homepage-evidence-cta">
      <TrackedLink
        href={localizedHref(locale, `/${slugForRoute("casos", locale)}`)}
        event="case_click"
        params={{ cta_location: "evidence_section", locale }}
        className="exp-btn exp-btn-secondary"
      >
        {locale === "es" ? "Ver todos los casos →" : "View all cases →"}
      </TrackedLink>
    </div>
  </section>
);

export default EvidenceSection;
