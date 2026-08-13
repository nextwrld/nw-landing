import type { HomepageFaq } from "@/content/homepage/types";

const Faq = ({ content }: { content: HomepageFaq }) => {
  const approved = content.entries.filter((entry) => entry.approved);

  return (
    <section id={content.id} className="faq-section experience-section">
      <div className="experience-container">
        <div className="exp-section-head">
          <p className="experience-eyebrow">{content.eyebrow}</p>
          <h2 className="exp-h2">{content.heading}</h2>
        </div>
        <ul className="faq-entries">
          {approved.map((entry) => (
            <li key={entry.id}>
              <details className="faq-disclosure">
                <summary>{entry.question}</summary>
                <p>{entry.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
