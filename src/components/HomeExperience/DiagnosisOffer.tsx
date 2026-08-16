import TrackedLink from "@/components/Common/TrackedLink";
import { localizedHref } from "@/utils/i18n-url";
import { slugForRoute } from "@/content/sections";
import type { Locale } from "@/i18n/config";
import type { HomepageDiagnosis } from "@/content/homepage/types";

/**
 * V3 section 06 — Diagnóstico (offer only, skeleton composition). The full
 * context-first form, calendar, and WhatsApp experience lives on
 * /es/diagnostico; the homepage presents the offer and converts.
 */
const DiagnosisOffer = ({
  content,
  locale,
}: {
  content: HomepageDiagnosis;
  locale: Locale;
}) => (
  <section id={content.id} className="experience-section diagnosis-offer">
    <div className="experience-container">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
      <p className="exp-lead">{content.offer.focus}</p>
      <p className="diagnosis-offer-facts">
        <span>{content.offer.duration}</span>
        <span>·</span>
        <span>{content.offer.cost}</span>
        <span>·</span>
        <span>{content.offer.nonObligation}</span>
      </p>
      <TrackedLink
        href={localizedHref(locale, `/${slugForRoute("diagnostico", locale)}`)}
        event="diagnosis_cta_click"
        params={{ cta_location: "diagnosis_section", locale }}
        className="exp-btn exp-btn-primary exp-btn-lg"
      >
        {locale === "es" ? "Analizar mi operación" : "Analyze my operation"}
      </TrackedLink>
    </div>
  </section>
);

export default DiagnosisOffer;
