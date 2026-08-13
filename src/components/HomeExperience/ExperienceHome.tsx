import { getHomepageContent } from "@/content/homepage";
import { homepageSchema } from "@/utils/seo";
import type { Locale } from "@/i18n/config";

const HomeExperience = async ({ locale }: { locale: Locale }) => {
  const content = getHomepageContent(locale);
  const sections = [
    content.problem,
    content.impact,
    content.betterWay,
    content.capabilities,
    content.method,
    content.differentiation,
    content.evidence,
    content.diagnosis,
    content.finalCta,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema(content)) }}
      />
      <main id="main-content">
        <section id={content.hero.id}>
          <p>{content.hero.eyebrow}</p>
          <h1>{content.hero.h1}</h1>
          <p>{content.hero.supporting}</p>
          <p>{content.hero.secondaryLine}</p>
          <p>{content.hero.primaryCta}</p>
          <p>{content.hero.secondaryCta}</p>
          <p>{content.hero.microcopy}</p>
        </section>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.heading}</h2>
          </section>
        ))}
      </main>
    </>
  );
};

export default HomeExperience;
