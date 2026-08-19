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
  <section id={content.id}>
    <h2>{content.heading}</h2>
    <TrackedLink
      href={content.primaryCtaHref}
      event="diagnosis_cta_click"
      params={{ cta_location: "final", locale }}
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
      >
        {content.secondaryCta.label}
      </TrackedLink>
    ) : null}
    <p>{content.microcopy}</p>
  </section>
);

export default FinalCta;
