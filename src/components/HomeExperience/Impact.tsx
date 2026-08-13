import type { HomepageImpact } from "@/content/homepage/types";

const Impact = ({ content }: { content: HomepageImpact }) => (
  <section id={content.id}>
    <h2>{content.heading}</h2>
    <ul>
      {content.costPairs.map((pair) => (
        <li key={pair.cause}>
          <p>{pair.cause}</p>
          <p>{pair.effect}</p>
        </li>
      ))}
    </ul>
    <p>{content.closing}</p>
  </section>
);

export default Impact;
