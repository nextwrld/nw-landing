import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);
const experienceHeaderSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHeader.tsx", import.meta.url),
  "utf8"
);
const cssSource = readFileSync(
  new URL("../src/styles/index.css", import.meta.url),
  "utf8"
);

describe("chapter differentiation on the homepage (CHAPTER-001)", () => {
  it("keeps the chapter rhythm without divider wrappers in the V3 composition", () => {
    expect(cssSource).toContain(".chapter-divider");
    expect(experienceHomeSource).not.toContain("<ChapterDivider");
  });

  it("numbers the editorial chapter eyebrows", () => {
    for (const content of [esContent, enContent]) {
      for (const eyebrow of [
        content.hero.eyebrow,
        content.problem.eyebrow,
        content.impact.eyebrow,
        content.betterWay.eyebrow,
        content.capabilities.eyebrow,
        content.method.eyebrow,
        content.differentiation.eyebrow,
        content.evidence.eyebrow,
        content.diagnosis.eyebrow,
        content.faq.eyebrow,
      ]) {
        expect(eyebrow).toMatch(/^\d{2} · /);
      }
    }
    expect(esContent.hero.eyebrow).toMatch(/^01 · /);
    expect(esContent.faq.eyebrow).toMatch(/^10 · /);
    expect(enContent.capabilities.eyebrow).toMatch(/^05 · /);
  });

  it("renders the numbered eyebrow inside every homepage chapter", () => {
    for (const component of [
      "Hero",
      "Problem",
      "Impact",
      "BetterWay",
      "Capabilities",
      "Method",
      "Differentiation",
      "EvidenceSection",
      "Diagnosis",
      "FAQ",
    ]) {
      const source = readFileSync(
        new URL(`../src/components/HomeExperience/${component}.tsx`, import.meta.url),
        "utf8"
      );
      expect(source).toContain("experience-eyebrow");
    }
  });

  it("alternates light chapter surfaces to break monotony", () => {
    expect(
      cssSource
    ).toMatch(/\.differentiation-section\s*{[^}]*var\(--color-exp-surface-alt\)/s);
    expect(
      cssSource
    ).toMatch(/\.method-section\s*{[^}]*var\(--color-exp-surface\)/s);
  });

  it("keeps the header nav route-based without scrollspy machinery", () => {
    expect(experienceHeaderSource).not.toContain("IntersectionObserver");
    expect(experienceHeaderSource).not.toContain("setActiveNavPath");
    expect(experienceHeaderSource).not.toContain("handleAnchorClick");
    expect(experienceHeaderSource).toContain("experience-nav-submenu");
  });

  it("sharpens the AION dark band contrast against light chapters", () => {
    expect(cssSource).toMatch(/\.aion-band\s*{[^}]*border-(top|bottom):/s);
  });
});
