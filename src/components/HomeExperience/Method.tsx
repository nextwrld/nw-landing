import type { HomepageMethod } from "@/content/homepage/types";

const Method = ({ content }: { content: HomepageMethod }) => (
  <section id={content.id}>
    <p>{content.eyebrow}</p>
    <h2>{content.heading}</h2>
    <p>{content.body}</p>
    <ol className="method-stages">
      {content.stages.map((stage) => (
        <li key={stage.id} className="method-stage">
          <h3>{stage.name}</h3>
          <p>{stage.label}</p>
          <p>{stage.headline}</p>
          <p>{stage.copy}</p>
          <p>{stage.output}</p>
        </li>
      ))}
    </ol>
    <p>{content.microcopy}</p>
  </section>
);

export default Method;
