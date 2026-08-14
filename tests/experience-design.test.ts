import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";

const cssSource = readFileSync(new URL("../src/styles/index.css", import.meta.url), "utf8");
const layoutSource = readFileSync(
  new URL("../src/app/[locale]/layout.tsx", import.meta.url),
  "utf8"
);
const experienceHeaderSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHeader.tsx", import.meta.url),
  "utf8"
);
const experienceFooterSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceFooter.tsx", import.meta.url),
  "utf8"
);

const componentPaths = {
  hero: "../src/components/HomeExperience/Hero.tsx",
  problem: "../src/components/HomeExperience/Problem.tsx",
  impact: "../src/components/HomeExperience/Impact.tsx",
  betterWay: "../src/components/HomeExperience/BetterWay.tsx",
  capabilities: "../src/components/HomeExperience/Capabilities.tsx",
  method: "../src/components/HomeExperience/Method.tsx",
  differentiation: "../src/components/HomeExperience/Differentiation.tsx",
  aionProductShowcase: "../src/components/HomeExperience/AIONProductShowcase.tsx",
  caseEvidence: "../src/components/HomeExperience/CaseEvidence.tsx",
  diagnosis: "../src/components/HomeExperience/Diagnosis.tsx",
  faq: "../src/components/HomeExperience/FAQ.tsx",
  finalCta: "../src/components/HomeExperience/FinalCTA.tsx",
} as const;

function readComponent(name: keyof typeof componentPaths): string {
  const url = new URL(componentPaths[name], import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

function relativeLuminance(hex: string): number {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const raw = parseInt(value.slice(offset, offset + 2), 16) / 255;
    return raw <= 0.03928 ? raw / 12.92 : Math.pow((raw + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  );
  return (lighter + 0.05) / (darker + 0.05);
}

function expToken(name: string): string {
  const match = cssSource.match(
    new RegExp(`--color-exp-${name}:\\s*([#0-9a-fA-F]{7});`)
  );
  if (!match) {
    throw new Error(`Missing experience token --color-exp-${name}`);
  }
  return match[1].toLowerCase();
}

describe("experience design tokens and chapters (DESIGN-001)", () => {
  it("defines light, dark, ink, accent, and muted design tokens", () => {
    for (const name of [
      "surface",
      "ink",
      "ink-soft",
      "muted",
      "accent",
      "accent-soft",
      "on-accent",
      "dark",
      "dark-text",
      "dark-muted",
      "line",
    ]) {
      expect(cssSource).toContain(`--color-exp-${name}:`);
    }
  });

  it("defines the three chapter background treatments", () => {
    expect(cssSource).toContain(".chapter-light");
    expect(cssSource).toContain(".chapter-dark");
    expect(cssSource).toContain(".chapter-transition");
  });

  it("defines the editorial type scale used by the sections", () => {
    for (const cls of [
      ".experience-eyebrow",
      ".exp-h1",
      ".exp-h2",
      ".exp-lead",
      ".exp-body",
      ".exp-microcopy",
    ]) {
      expect(cssSource).toContain(cls);
    }
  });

  it("defines primary and secondary button treatments", () => {
    expect(cssSource).toContain(".exp-btn");
    expect(cssSource).toContain(".exp-btn-primary");
    expect(cssSource).toContain(".exp-btn-secondary");
  });

  it("keeps the editorial type scale and focus ring visible", () => {
    expect(cssSource).toContain(".exp-btn:focus-visible");
    expect(cssSource).toContain(":focus-visible");
  });
});

describe("experience design contrast meets WCAG AA (DESIGN-002)", () => {
  it("keeps on-accent text readable on the accent background", () => {
    expect(
      contrastRatio(expToken("on-accent"), expToken("accent"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps accent text readable on the light surface", () => {
    expect(
      contrastRatio(expToken("accent"), expToken("surface"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the on-dark accent readable on the dark chapter", () => {
    expect(
      contrastRatio(expToken("accent-soft"), expToken("dark"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps dark-chapter text and muted text readable on the dark chapter", () => {
    expect(
      contrastRatio(expToken("dark-text"), expToken("dark"))
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrastRatio(expToken("dark-muted"), expToken("dark"))
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps light-chapter muted text readable on the surface", () => {
    expect(
      contrastRatio(expToken("muted"), expToken("surface"))
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Experience shell rendering when admitted (DESIGN-003)", () => {
  it("renders the Experience header and footer only in the experience branch", () => {
    expect(layoutSource).toContain("ExperienceHeader");
    expect(layoutSource).toContain("ExperienceFooter");
    expect(layoutSource).toContain('admission.composition !== "foundation"');
    expect(layoutSource).toContain("ExperienceHeader");
    expect(layoutSource).toContain("content={content}");
    expect(layoutSource).toContain("<ExperienceFooter content={content}");
    expect(layoutSource).toContain("<Header menu={menu}");
    expect(layoutSource).toContain("<Footer dict={dict.footer}");
  });

  it("keeps the Experience footer gated on approved navigation", () => {
    expect(experienceFooterSource).toContain("buildApprovedNav");
    expect(experienceFooterSource).toContain("content.nav.items");
    expect(experienceFooterSource).toContain("item.id !== \"services\"");
  });

  it("keeps the Experience header CTA gated and tracked with a location", () => {
    expect(experienceHeaderSource).toContain("diagnosisCta ?");
    expect(experienceHeaderSource).toContain('event="diagnosis_cta_click"');
    expect(experienceHeaderSource).toContain('cta_location: "header"');
    expect(experienceHeaderSource).toContain("nextMenuState");
  });

  it("keeps both Experience shell surfaces accessible", () => {
    expect(experienceHeaderSource).toContain("skip-link");
    expect(experienceHeaderSource).toContain("#main-content");
    expect(experienceHeaderSource).toContain("aria-expanded");
    expect(experienceHeaderSource).toContain("aria-controls");
    expect(experienceFooterSource).toContain("socialLinkLabel");
  });
});

describe("Experience section styling contracts (DESIGN-004)", () => {
  it("styles every Experience section with the design system", () => {
    expect(readComponent("hero")).toContain("experience-hero");
    expect(readComponent("problem")).toContain("problem-section");
    expect(readComponent("impact")).toContain("impact-section");
    expect(readComponent("betterWay")).toContain("chapter-transition");
    expect(readComponent("capabilities")).toContain("capability-block");
    expect(readComponent("method")).toContain("method-stages");
    expect(readComponent("differentiation")).toContain("differentiation-row");
    expect(readComponent("diagnosis")).toContain("diagnosis-form-card");
    expect(readComponent("faq")).toContain("faq-disclosure");
    expect(readComponent("finalCta")).toContain("final-cta-section");
  });

  it("styles the evidence showcase and cards", () => {
    expect(readComponent("aionProductShowcase")).toContain("aion-showcase");
    expect(readComponent("caseEvidence")).toContain("evidence-card");
    expect(cssSource).toContain(".aion-band");
    expect(cssSource).toContain(".evidence-card");
  });

  it("uses the approved copy surface for every section id", () => {
    for (const locale of ["es", "en"] as const) {
      const content = contentByLocale[locale];
      expect(content.hero.id).toBe("hero");
      expect(content.problem.id).toBe("problem");
      expect(content.impact.id).toBe("impact");
      expect(content.betterWay.id).toBe("betterWay");
      expect(content.capabilities.id).toBe("capabilities");
      expect(content.method.id).toBe("method");
      expect(content.differentiation.id).toBe("differentiation");
      expect(content.evidence.id).toBe("evidence");
      expect(content.diagnosis.id).toBe("diagnosis");
      expect(content.faq.id).toBe("faq");
      expect(content.finalCta.id).toBe("finalCta");
    }
  });

  it("keeps reduced-motion handling present for the experience chapters", () => {
    expect(cssSource).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssSource).toContain("@media (prefers-reduced-motion: no-preference)");
  });
});
