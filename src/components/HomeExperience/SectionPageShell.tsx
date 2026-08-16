import type { SectionContent } from "@/content/sections/types";

/**
 * V3 section sub-page shell (server component). Renders a route's mandatory
 * narrative — heading, intro, and section blocks — in initial HTML with no
 * client execution. Visual polish belongs to Fase 3; the skeleton keeps the
 * structure semantic and readable.
 */
export default function SectionPageShell({
  content,
}: {
  content: SectionContent;
}) {
  return (
    <main id="main-content" className="section-page">
      <article className="section-page__inner">
        <h1 className="section-page__heading">{content.heading}</h1>
        <p className="section-page__intro">{content.intro}</p>
        {content.sections.map((block) => (
          <section
            key={block.id}
            className="section-page__block"
            aria-labelledby={`${block.id}-heading`}
          >
            <h2 id={`${block.id}-heading`} className="section-page__block-heading">
              {block.heading}
            </h2>
            <p className="section-page__block-body">{block.body}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
