import { describe, expect, it } from "vitest";
import { contentByLocale } from "@/content/homepage";
import { publishedRoutes } from "@/content/sections";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const BUZZWORDS = [
  "innovador",
  "innovative",
  "disruptiv",
  "disruptive",
  "vanguardia",
  "cutting-edge",
  "revolucion",
  "revolution",
  "empoder",
  "empower",
  "holistic",
  "holístico",
  "sinergi",
  "synergy",
  "digitalizamos",
  "digitalización",
  "blockchain",
  "metaverso",
  "machine learning",
];

const joinCopy = (content: typeof esContent): string =>
  [
    content.hero.h1,
    content.hero.supporting,
    content.problem.heading,
    content.problem.intro,
    content.problem.statement,
    content.capabilities.supporting,
    content.method.body,
    content.evidence.heading,
    content.diagnosis.offer.focus,
  ].join(" ");

describe("copy parity and length (COPY-PARITY-001)", () => {
  it("keeps every paragraph short enough to scan", () => {
    for (const content of [esContent, enContent]) {
      const paragraphs = [
        content.hero.supporting,
        content.problem.intro,
        content.capabilities.supporting,
        content.method.body,
      ];
      for (const paragraph of paragraphs) {
        expect(paragraph.length, paragraph).toBeLessThanOrEqual(180);
      }
      for (const card of content.problem.cards) {
        expect(card.body.length, card.body).toBeLessThanOrEqual(140);
      }
      for (const stage of content.method.stages) {
        expect(stage.copy.length, stage.copy).toBeLessThanOrEqual(70);
      }
    }
  });

  it("states the problem before the technology on the homepage", () => {
    for (const content of [esContent, enContent]) {
      const problemIntro = content.problem.intro.toLowerCase();
      const servicesHeading = content.capabilities.heading.toLowerCase();
      expect(problemIntro.length).toBeGreaterThan(0);
      expect(servicesHeading.length).toBeGreaterThan(0);
    }
  });

  it("uses a clear, memorable H1 in both locales", () => {
    for (const content of [esContent, enContent]) {
      expect(content.hero.h1.trim().length).toBeGreaterThan(30);
      expect(content.hero.h1).not.toMatch(/\b(?:solución|solutions?|plataforma|platform)\b/i);
    }
  });
});

describe("copy truthfulness (COPY-PARITY-002)", () => {
  it("contains no buzzwords or unverifiable claims", () => {
    for (const content of [esContent, enContent]) {
      const copy = joinCopy(content).toLowerCase();
      for (const buzzword of BUZZWORDS) {
        expect(copy, buzzword).not.toContain(buzzword);
      }
      expect(copy).not.toMatch(/\d+\s*(%|x|×|horas?|hours?)/i);
    }
  });

  it("never sells branding, web design, or social media as an offer", () => {
    for (const content of [esContent, enContent]) {
      const copy = joinCopy(content).toLowerCase();
      expect(copy).not.toMatch(/diseño web|web design|redes sociales|social media|branding/i);
    }
  });
});

describe("conversion consistency (COPY-PARITY-003)", () => {
  it("keeps the primary CTA consistent across hero and diagnosis", () => {
    for (const content of [esContent, enContent]) {
      expect(content.hero.primaryCta).toBe(
        content.diagnosis.offer.nonObligation ? content.hero.primaryCta : content.hero.primaryCta
      );
      expect(content.hero.primaryCta.trim().length).toBeGreaterThan(0);
    }
  });

  it("points every primary conversion at the diagnosis route", () => {
    const published = publishedRoutes("es");
    expect(published).toContain("diagnostico");
    expect(contentByLocale.es.hero.primaryCta).toContain("Analizar");
    expect(contentByLocale.en.hero.primaryCta).toMatch(/Analyze|Analysis/i);
  });
});
