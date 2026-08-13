import type { HomepageCapabilities } from "@/content/homepage/types";

const Capabilities = ({ content }: { content: HomepageCapabilities }) => (
  <section id={content.id}>
    <p>{content.eyebrow}</p>
    <h2>{content.heading}</h2>
    <p>{content.supporting}</p>
    <ul>
      {content.items.map((item) => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <ul>
            {item.includes.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
          <p>{item.linkLabel}</p>
        </li>
      ))}
    </ul>
    <p>{content.aiTransversal.heading}</p>
    <p>{content.aiTransversal.body}</p>
  </section>
);

export default Capabilities;
