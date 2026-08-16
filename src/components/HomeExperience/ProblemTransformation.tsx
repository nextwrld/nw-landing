import type { HomepageProblem } from "@/content/homepage/types";

/**
 * V3 section 02 — Problema → Transformación (skeleton composition).
 * Renders the recognized operational problems and the manual → automated
 * transformation pairs. Definitive copy lands in Fase 2.
 */
const ProblemTransformation = ({ content }: { content: HomepageProblem }) => (
  <section id={content.id} className="experience-section problem-transformation">
    <div className="experience-container">
      <p className="experience-eyebrow">{content.eyebrow}</p>
      <h2 className="exp-h2">{content.heading}</h2>
      <p className="exp-lead">{content.intro}</p>

      <ol className="problem-list">
        {content.cards.slice(0, 4).map((card, index) => (
          <li key={card.id} className="problem-list-item">
            <span className="problem-list-number">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="problem-list-title">{card.title}</h3>
            <p className="problem-list-body">{card.body}</p>
          </li>
        ))}
      </ol>

      {content.transformation.length > 0 && (
        <div className="transformation" aria-label="Transformación">
          {content.transformation.map((pair) => (
            <p key={pair.from} className="transformation-pair">
              <span className="transformation-from">{pair.from}</span>
              <span className="transformation-arrow" aria-hidden="true">→</span>
              <span className="transformation-to">{pair.to}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default ProblemTransformation;
