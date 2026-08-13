import type { HomepageCapabilities } from "@/content/homepage/types";

const Capabilities = ({ content }: { content: HomepageCapabilities }) => (
  <section id={content.id} className="capabilities-section experience-section">
    <div className="experience-container">
      <div className="exp-section-head">
        <p className="experience-eyebrow">{content.eyebrow}</p>
        <h2 className="exp-h2">{content.heading}</h2>
        <p className="exp-lead">{content.supporting}</p>
      </div>
      <ul className="capability-grid">
        {content.items.map((item) => (
          <li key={item.id} className="capability-block">
            <h3 className="capability-block-title">{item.title}</h3>
            <p className="capability-block-body">{item.body}</p>
            <ul className="capability-includes">
              {item.includes.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
            <p className="capability-link-label">{item.linkLabel}</p>
          </li>
        ))}
      </ul>
      <div className="ai-transversal">
        <h3>{content.aiTransversal.heading}</h3>
        <p>{content.aiTransversal.body}</p>
      </div>
    </div>
  </section>
);

export default Capabilities;
