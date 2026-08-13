import AIONProductShowcase from "./AIONProductShowcase";
import CaseEvidence from "./CaseEvidence";
import type { HomepageEvidence } from "@/content/homepage/types";

const EvidenceSection = ({ content }: { content: HomepageEvidence }) => (
  <section id={content.id} className="homepage-evidence">
    <div className="experience-container homepage-evidence-head">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
    </div>
    <div className="aion-band">
      <AIONProductShowcase content={content} />
    </div>
    <CaseEvidence content={content} />
  </section>
);

export default EvidenceSection;
