import TrackedLink from "@/components/Common/TrackedLink";
import { localizedHref } from "@/utils/i18n-url";
import { slugForRoute } from "@/content/sections";
import type { Locale } from "@/i18n/config";
import type { HomepageMethod } from "@/content/homepage/types";

/**
 * V3 section 04 — Cómo trabajamos (skeleton composition). The five-stage
 * framework (Discover → Shape → Build → Launch → Evolve) with one line per
 * stage; the full explanation lives on /como-trabajamos.
 */
const MethodSection = ({
  content,
  locale,
}: {
  content: HomepageMethod;
  locale: Locale;
}) => (
  <section id={content.id} className="experience-section method-section">
    <div className="experience-container">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
      <p className="exp-lead">{content.body}</p>

      <ol className="method-stages">
        {content.stages.map((stage, index) => (
          <li key={stage.id} className="method-stage">
            <span className="method-stage-index">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="method-stage-name">{stage.name}</h3>
            <p className="method-stage-label">{stage.label}</p>
            <p className="method-stage-copy">{stage.copy}</p>
          </li>
        ))}
      </ol>

      <TrackedLink
        href={localizedHref(locale, `/${slugForRoute("como-trabajamos", locale)}`)}
        event="method_click"
        params={{ cta_location: "method_section", locale }}
        className="exp-btn exp-btn-secondary"
      >
        {content.microcopy} →
      </TrackedLink>
    </div>
  </section>
);

export default MethodSection;
