import type { HomepageDifferentiation } from "@/content/homepage/types";

const Differentiation = ({
  content,
}: {
  content: HomepageDifferentiation;
}) => (
  <section id={content.id} className="differentiation-section experience-section">
    <div className="experience-container">
      <div className="exp-section-head">
        <h2 className="exp-h2">{content.heading}</h2>
      </div>
      <ul className="differentiation-list">
        {content.pillars.map((pillar, index) => (
          <li key={pillar.id} className="differentiation-row">
            <span className="differentiation-row-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="differentiation-row-body">
              <h3 className="differentiation-row-title">{pillar.title}</h3>
              <p className="differentiation-row-copy">{pillar.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="differentiation-statement">{content.optionalStatement}</p>
    </div>
  </section>
);

export default Differentiation;
