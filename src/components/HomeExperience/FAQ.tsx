import type { HomepageFaq } from "@/content/homepage/types";

const Faq = ({ content }: { content: HomepageFaq }) => {
  const approved = content.entries.filter((entry) => entry.approved);

  return (
    <section id={content.id}>
      <h2>{content.heading}</h2>
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
    </section>
  );
};

export default Faq;
