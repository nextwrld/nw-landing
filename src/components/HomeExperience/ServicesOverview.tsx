import TrackedLink from "@/components/Common/TrackedLink";
import { localizedHref } from "@/utils/i18n-url";
import { servicePrefix, slugForRoute } from "@/content/sections";
import { SERVICE_ROUTES } from "@/content/sections/types";
import type { Locale } from "@/i18n/config";
import type { HomepageCapabilities } from "@/content/homepage/types";

/** Capability item id → published service route slug. */
const SERVICE_SLUG_BY_ITEM: Record<string, string> = {
  "custom-software": "software-a-medida",
  "management-systems": "sistemas-de-gestion",
  "automation-and-integrations": "automatizacion",
};

/**
 * V3 section 03 — Qué resolvemos (skeleton composition). The three services
 * act as doors to their section pages. No feature lists here — depth lives on
 * the service routes.
 */
const ServicesOverview = ({
  content,
  locale,
}: {
  content: HomepageCapabilities;
  locale: Locale;
}) => (
  <section id={content.id} className="experience-section services-overview">
    <div className="experience-container">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
      <p className="exp-lead">{content.supporting}</p>

      <div className="services-grid">
        {content.items.map((item) => {
          const route = SERVICE_SLUG_BY_ITEM[item.id];
          const slug = route ? slugForRoute(route as (typeof SERVICE_ROUTES)[number], locale) : null;
          return (
            <article key={item.id} className="service-card">
              <h3 className="service-card-title">{item.title}</h3>
              <p className="service-card-body">{item.body}</p>
              {slug ? (
                <TrackedLink
                  href={localizedHref(locale, `/${servicePrefix(locale)}/${slug}`)}
                  event="service_click"
                  params={{ cta_location: "services_section", locale }}
                  className="service-card-link"
                >
                  {item.linkLabel} →
                </TrackedLink>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesOverview;
