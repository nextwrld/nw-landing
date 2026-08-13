import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);
const pageSource = readFileSync(new URL("../src/app/[locale]/page.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../src/styles/index.css", import.meta.url), "utf8");

const componentPaths = {
  hero: new URL("../src/components/HomeExperience/Hero.tsx", import.meta.url),
  problem: new URL("../src/components/HomeExperience/Problem.tsx", import.meta.url),
  impact: new URL("../src/components/HomeExperience/Impact.tsx", import.meta.url),
  betterWay: new URL("../src/components/HomeExperience/BetterWay.tsx", import.meta.url),
};

function readComponent(name: keyof typeof componentPaths): string {
  return existsSync(componentPaths[name]) ? readFileSync(componentPaths[name], "utf8") : "";
}

describe("ES/EN problem H1 and narrative (PROBLEM-001)", () => {
  it("keeps the authoritative ES H1 and a faithful EN equivalent", () => {
    expect(esContent.hero.h1).toBe("Tu empresa no debería crecer multiplicando trabajo manual.");
    expect(enContent.hero.h1).toContain("shouldn't grow by multiplying manual work");
  });

  it("opens the problem section with a localized intro in both locales", () => {
    expect(esContent.problem.intro.length).toBeGreaterThan(0);
    expect(enContent.problem.intro.length).toBeGreaterThan(0);
    expect(enContent.problem.intro).not.toBe(esContent.problem.intro);
  });

  it("lists the six recognized friction signals in both locales", () => {
    expect(esContent.problem.cards).toHaveLength(6);
    expect(enContent.problem.cards).toHaveLength(6);
  });

  it("covers the same friction ids with titled, explained cards in both locales", () => {
    expect(esContent.problem.cards.map((card) => card.id)).toEqual(
      enContent.problem.cards.map((card) => card.id)
    );
    for (const card of esContent.problem.cards) {
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.body.length).toBeGreaterThan(0);
    }
  });
});

describe("impact and better-way cost narrative (PROBLEM-002)", () => {
  it("captures the four growth-vs-complexity cost pairs in both locales", () => {
    expect(esContent.impact.costPairs).toHaveLength(4);
    expect(enContent.impact.costPairs).toHaveLength(4);
    for (const pair of esContent.impact.costPairs) {
      expect(pair.cause.length).toBeGreaterThan(0);
      expect(pair.effect.length).toBeGreaterThan(0);
    }
  });

  it("closes the impact section with the same escalation meaning in both locales", () => {
    expect(esContent.impact.closing.length).toBeGreaterThan(0);
    expect(enContent.impact.closing.length).toBeGreaterThan(0);
    expect(enContent.impact.closing).not.toBe(esContent.impact.closing);
  });

  it("offers the five before/after transitions in both locales", () => {
    expect(esContent.betterWay.beforeAfter).toHaveLength(5);
    expect(enContent.betterWay.beforeAfter).toHaveLength(5);
    for (const item of esContent.betterWay.beforeAfter) {
      expect(item.before.length).toBeGreaterThan(0);
      expect(item.after.length).toBeGreaterThan(0);
    }
  });

  it("introduces and closes the better-way section in both locales", () => {
    expect(esContent.betterWay.intro.length).toBeGreaterThan(0);
    expect(enContent.betterWay.intro.length).toBeGreaterThan(0);
    expect(esContent.betterWay.closing.length).toBeGreaterThan(0);
    expect(enContent.betterWay.closing.length).toBeGreaterThan(0);
  });
});

describe("problem narrative composition order (PROBLEM-003)", () => {
  it("composes the dedicated Hero, Problem, Impact, and BetterWay components", () => {
    expect(existsSync(componentPaths.hero)).toBe(true);
    expect(existsSync(componentPaths.problem)).toBe(true);
    expect(existsSync(componentPaths.impact)).toBe(true);
    expect(existsSync(componentPaths.betterWay)).toBe(true);
    expect(experienceHomeSource).toContain('from "./Hero"');
    expect(experienceHomeSource).toContain('from "./Problem"');
    expect(experienceHomeSource).toContain('from "./Impact"');
    expect(experienceHomeSource).toContain('from "./BetterWay"');
  });

  it("orders hero before problem before impact before better-way", () => {
    const hero = experienceHomeSource.indexOf("<Hero");
    const problem = experienceHomeSource.indexOf("<Problem");
    const impact = experienceHomeSource.indexOf("<Impact");
    const betterWay = experienceHomeSource.indexOf("<BetterWay");
    expect(hero).toBeGreaterThanOrEqual(0);
    expect(hero).toBeLessThan(problem);
    expect(problem).toBeLessThan(impact);
    expect(impact).toBeLessThan(betterWay);
  });

  it("renders the Experience H1 through the composed Hero component", () => {
    expect(readComponent("hero")).toContain("<h1");
    expect(readComponent("hero")).toContain("content.h1");
  });

  it("passes typed locale content into the Experience composition", () => {
    expect(pageSource).toContain("content={getHomepageContent");
  });
});

describe("server rendering and motion safety (PROBLEM-004)", () => {
  it("keeps the problem sections server components (no use client)", () => {
    for (const name of ["hero", "problem", "impact", "betterWay"] as const) {
      expect(readComponent(name)).not.toContain("use client");
    }
    expect(experienceHomeSource).not.toContain("use client");
  });

  it("keeps the Experience H1 visible without animation gating", () => {
    expect(readComponent("hero")).not.toContain("animation");
    expect(readComponent("hero")).not.toContain("transition");
  });

  it("removes nonessential motion under reduced-motion preference", () => {
    expect(cssSource).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssSource).toContain("@media (prefers-reduced-motion: no-preference)");
  });
});
