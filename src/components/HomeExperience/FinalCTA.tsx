import TrackedLink from "@/components/Common/TrackedLink";
import type { Locale } from "@/i18n/config";
import type { HomepageFinalCta } from "@/content/homepage/types";

const FinalCta = ({
  content,
  locale,
}: {
  content: HomepageFinalCta;
  locale: Locale;
}) => (
  <section id={content.id} className="final-cta-section experience-section">
    <div className="experience-container">
      <div className="final-cta-inner">
        <h2 className="exp-h2">{content.heading}</h2>
        <div className="final-cta-actions">
          <TrackedLink
            href={content.primaryCtaHref}
            event="diagnosis_cta_click"
            params={{ cta_location: "diagnosis_section", locale }}
            className="exp-btn exp-btn-primary exp-btn-lg"
          >
            {content.primaryCta}
          </TrackedLink>
          {content.secondaryCta.destination ? (
            <TrackedLink
              href={content.secondaryCta.destination}
              event="whatsapp_click"
              params={{ locale }}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-btn exp-btn-secondary exp-btn-secondary-dark"
            >
              {content.secondaryCta.label}
            </TrackedLink>
          ) : null}
        </div>
        <p className="final-cta-microcopy">{content.microcopy}</p>
      </div>
    </div>
  </section>
);

export default FinalCta;
