import type { ReactNode } from "react";
import type { SectionPageMeta } from "@/content/homepage/types";

const SectionPage = ({
  page,
  children,
}: {
  page: SectionPageMeta;
  children: ReactNode;
}) => (
  <main id="main-content">
    <section className="section-page-header">
      <div className="experience-container">
        <div className="exp-section-head">
          <p className="experience-eyebrow">{page.eyebrow}</p>
          <h1 className="exp-h1">{page.heading}</h1>
        </div>
      </div>
    </section>
    {children}
  </main>
);

export default SectionPage;
