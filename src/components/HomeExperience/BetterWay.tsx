import type { HomepageBetterWay } from "@/content/homepage/types";

const BetterWay = ({ content }: { content: HomepageBetterWay }) => (
  <section id={content.id}>
    <h2>{content.heading}</h2>
    <p>{content.intro}</p>
    <ul>
      {content.beforeAfter.map((item) => (
        <li key={item.before}>
          <p>{item.before}</p>
          <p>{item.after}</p>
        </li>
      ))}
    </ul>
    <p>{content.closing}</p>
  </section>
);

export default BetterWay;
