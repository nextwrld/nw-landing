import TrackedLink from "@/components/Common/TrackedLink";
import { localizedHref } from "@/utils/i18n-url";
import type { Locale } from "@/i18n/config";
import type { HomepageHero } from "@/content/homepage/types";
import HeroVisual from "./HeroVisual";

const Hero = ({
  content,
  locale,
}: {
  content: HomepageHero;
  locale: Locale;
}) => (
  <section id={content.id} className="experience-section experience-hero">
    <div className="experience-container experience-hero-grid">
      <div className="experience-hero-copy">
        <p className="experience-eyebrow">{content.eyebrow}</p>
        <h1 className="exp-h1">{content.h1}</h1>
        <p className="exp-lead">{content.supporting}</p>
        <p className="exp-secondary">{content.secondaryLine}</p>
        <div className="experience-hero-ctas">
          <TrackedLink
                href={localizedHref(locale, "/diagnostico")}
            event="diagnosis_cta_click"
            params={{ cta_location: "hero", locale }}
            className="exp-btn exp-btn-primary exp-btn-lg"
          >
            {content.primaryCta}
          </TrackedLink>
          <TrackedLink
                href={localizedHref(locale, content.secondaryCtaHref)}
                event="method_click"
            params={{ locale }}
            className="exp-btn exp-btn-secondary exp-btn-lg"
          >
            {content.secondaryCta}
          </TrackedLink>
          <p className="exp-microcopy">{content.microcopy}</p>
        </div>
      </div>
      <div className="experience-hero-visual">
        <HeroVisual />
      </div>
    </div>
  </section>
);

export default Hero;
