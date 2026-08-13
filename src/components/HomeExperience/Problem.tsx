import type { HomepageProblem } from "@/content/homepage/types";

const Problem = ({ content }: { content: HomepageProblem }) => (
  <section id={content.id}>
    <h2>{content.heading}</h2>
    <p>{content.intro}</p>
    <ul>
      {content.cards.map((card) => (
        <li key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Problem;
