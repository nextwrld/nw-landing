import type { HomepageHero } from "@/content/homepage/types";

const Hero = ({ content }: { content: HomepageHero }) => (
  <section id={content.id}>
    <p>{content.eyebrow}</p>
    <h1>{content.h1}</h1>
    <p>{content.supporting}</p>
    <p>{content.secondaryLine}</p>
    <p>{content.primaryCta}</p>
    <p>{content.secondaryCta}</p>
    <p>{content.microcopy}</p>
  </section>
);

export default Hero;
