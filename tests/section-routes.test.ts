import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";
import sitemap from "@/app/sitemap";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const sectionPageRouteExists = existsSync(
  new URL("../src/app/[locale]/[...section]/page.tsx", import.meta.url)
);
const sectionPageComponentExists = existsSync(
  new URL("../src/components/HomeExperience/SectionPage.tsx", import.meta.url)
);
const heroSource = readFileSync(
  new URL("../src/components/HomeExperience/Hero.tsx", import.meta.url),
  "utf8"
);
const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);

describe("one-page only — no section sub-pages (SECTION-PAGE-003)", () => {
  it("removes the section sub-page route and its header component", () => {
    expect(sectionPageRouteExists).toBe(false);
    expect(sectionPageComponentExists).toBe(false);
  });

  it("keeps every nav destination an in-page anchor, never a sub-page route", () => {
    for (const content of [esContent, enContent]) {
      for (const item of content.nav.items) {
        if (item.approved) {
          expect(item.destination).toMatch(/^\/#/);
          expect(item.destination).not.toMatch(/^\/[a-z]+\/[a-z]+$/);
        }
      }
    }
  });

  it("points the hero secondary CTA to the in-page evidence anchor", () => {
    expect(esContent.hero.secondaryCtaHref).toBe("#evidence");
    expect(enContent.hero.secondaryCtaHref).toBe("#evidence");
    expect(heroSource).toContain("content.secondaryCtaHref");
  });

  it("renders a real nav anchor wrapper for every approved section", () => {
    expect(experienceHomeSource).toContain("servicesAnchor");
    expect(experienceHomeSource).toContain("methodAnchor");
    expect(experienceHomeSource).toContain("casesAnchor");
    expect(experienceHomeSource).toContain("aboutAnchor");
    expect(experienceHomeSource).toContain("<div id={servicesAnchor}>");
    expect(experienceHomeSource).toContain("<div id={casesAnchor}>");
  });
});

describe("sitemap excludes section sub-pages (SECTION-PAGE-004)", () => {
  it("publishes no section sub-page URL in either locale", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const url of [
      "https://nextwrld.com/es/servicios",
      "https://nextwrld.com/es/metodo",
      "https://nextwrld.com/es/casos",
      "https://nextwrld.com/es/nosotros",
      "https://nextwrld.com/en/services",
      "https://nextwrld.com/en/method",
      "https://nextwrld.com/en/cases",
      "https://nextwrld.com/en/about",
    ]) {
      expect(urls).not.toContain(url);
    }
  });

  it("still publishes the homepage in both locales", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://nextwrld.com/es");
    expect(urls).toContain("https://nextwrld.com/en");
  });
});
