import type { HomepageBetterWay } from "@/content/homepage/types";

const BetterWay = ({ content }: { content: HomepageBetterWay }) => (
  <section id={content.id} className="chapter-transition better-way-section">
    <div className="experience-container">
      <div className="better-way-head">
        <p className="experience-eyebrow experience-eyebrow-dark">
          {content.eyebrow}
        </p>
        <h2 className="exp-h2 experience-text-dark">{content.heading}</h2>
        <p className="exp-lead exp-lead-dark">{content.intro}</p>
      </div>
      <div className="better-way-list-region">
        <ul className="before-after-list">
          {content.beforeAfter.map((item) => (
            <li key={item.before} className="before-after-row">
              <p className="before-after-before">{item.before}</p>
              <span className="before-after-arrow" aria-hidden="true">
                →
              </span>
              <p className="before-after-after">{item.after}</p>
            </li>
          ))}
        </ul>
        <p className="better-way-closing">{content.closing}</p>
      </div>
    </div>
  </section>
);

export default BetterWay;
