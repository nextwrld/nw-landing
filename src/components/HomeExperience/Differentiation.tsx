import type { HomepageDifferentiation } from "@/content/homepage/types";

const Differentiation = ({ content }: { content: HomepageDifferentiation }) => (
  <section id={content.id}>
    <h2>{content.heading}</h2>
    <ul>
      {content.pillars.map((pillar) => (
        <li key={pillar.id}>
          <h3>{pillar.title}</h3>
          <p>{pillar.body}</p>
        </li>
      ))}
    </ul>
    <p>{content.optionalStatement}</p>
  </section>
);

export default Differentiation;
