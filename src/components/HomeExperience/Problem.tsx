import type { HomepageProblem } from "@/content/homepage/types";

const Problem = ({ content }: { content: HomepageProblem }) => (
  <section id={content.id} className="problem-section experience-section">
    <div className="experience-container">
      <div className="exp-section-head">
        <p className="experience-eyebrow">{content.eyebrow}</p>
        <h2 className="exp-h2">{content.heading}</h2>
        <p className="exp-lead">{content.intro}</p>
      </div>
      <ul className="problem-grid">
        {content.cards.map((card, index) => (
          <li key={card.id} className="problem-card">
            <span className="problem-card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="problem-card-title">{card.title}</h3>
            <p className="problem-card-body">{card.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Problem;
