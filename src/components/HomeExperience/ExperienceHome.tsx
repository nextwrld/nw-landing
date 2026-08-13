import Hero from "./Hero";
import Problem from "./Problem";
import Impact from "./Impact";
import BetterWay from "./BetterWay";
import { homepageSchema } from "@/utils/seo";
import type { Locale } from "@/i18n/config";
import type { HomepageContent } from "@/content/homepage/types";

const HomeExperience = ({
  locale,
  content,
}: {
  locale: Locale;
  content: HomepageContent;
}) => {
  const sections = [
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
        <Hero content={content.hero} />
        <Problem content={content.problem} />
        <Impact content={content.impact} />
        <BetterWay content={content.betterWay} />
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
