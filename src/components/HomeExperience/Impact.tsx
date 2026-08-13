import type { HomepageImpact } from "@/content/homepage/types";

const Impact = ({ content }: { content: HomepageImpact }) => (
  <section id={content.id} className="impact-section experience-section">
    <div className="experience-container">
      <h2 className="exp-h2">{content.heading}</h2>
      <ul className="impact-list">
        {content.costPairs.map((pair, index) => (
          <li key={pair.cause} className="impact-pair">
            <span className="impact-pair-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="impact-pair-cause">{pair.cause}</p>
            <span className="impact-pair-arrow" aria-hidden="true">
              →
            </span>
            <p className="impact-pair-effect">{pair.effect}</p>
          </li>
        ))}
      </ul>
      <p className="impact-closing">{content.closing}</p>
    </div>
  </section>
);

export default Impact;
