import type { HomepageMethod } from "@/content/homepage/types";

const Method = ({ content }: { content: HomepageMethod }) => (
  <section id={content.id} className="method-section experience-section">
    <div className="experience-container">
      <div className="exp-section-head">
        <p className="experience-eyebrow">{content.eyebrow}</p>
        <h2 className="exp-h2">{content.heading}</h2>
        <p className="exp-lead">{content.body}</p>
      </div>
      <ol className="method-stages">
        {content.stages.map((stage, index) => (
          <li key={stage.id} className="method-stage">
            <span className="method-stage-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="method-stage-name">{stage.name}</p>
            <p className="method-stage-label">{stage.label}</p>
            <h3 className="method-stage-headline">{stage.headline}</h3>
            <p className="method-stage-copy">{stage.copy}</p>
            <p className="method-stage-output">{stage.output}</p>
          </li>
        ))}
      </ol>
      <p className="exp-microcopy">{content.microcopy}</p>
    </div>
  </section>
);

export default Method;
