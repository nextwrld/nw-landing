import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  getSectionContent,
  routeForSlug,
  publishedRoutes,
  sectionsByLocale,
  validateSectionContent,
} from "@/content/sections";
import { SECTION_ROUTES, type SectionRoute } from "@/content/sections/types";
import { sectionStaticParams } from "@/utils/sectionPage";

const EN_PUBLISHED = [
  "custom-software",
  "management-systems",
  "automation",
  "how-we-work",
  "cases",
  "about-us",
  "diagnosis",
];

describe("EN registry flip (EN-SECTIONS-001)", () => {
  it("publishes the seven EN routes with complete approved content", () => {
    expect(publishedRoutes("en")).toEqual(EN_PUBLISHED);
    for (const route of EN_PUBLISHED) {
      const entry = getSectionContent(route as (typeof SECTION_ROUTES)[number], "en");
      expect(entry.approved).toBe(true);
      expect(entry.seo.title.trim().length).toBeGreaterThan(0);
      expect(entry.seo.description.trim().length).toBeGreaterThan(0);
      expect(entry.heading.trim().length).toBeGreaterThan(0);
      expect(entry.intro.trim().length).toBeGreaterThan(0);
      expect(entry.sections.length).toBeGreaterThan(0);
    }
  });

  it("keeps insights unapproved and unpublished in both locales", () => {
    for (const locale of ["es", "en"] as const) {
      expect(publishedRoutes(locale)).not.toContain("insights");
      const entry = sectionsByLocale[locale].find((e) => e.route === "insights");
      expect(entry?.approved).toBe(false);
    }
  });

  it("validates the EN section content without problems", () => {
    expect(validateSectionContent("en")).toEqual([]);
  });

  it("derives static params for EN section pages", () => {
    expect(sectionStaticParams("como-trabajamos")).toEqual([{ locale: "es" }, { locale: "en" }]);
    expect(sectionStaticParams("insights")).toEqual([]);
  });

  it("keeps ES and EN canonical route sets symmetric except insights", () => {
    const es = publishedRoutes("es")
      .map((slug) => routeForSlug(slug, "es"))
      .filter((r): r is SectionRoute => r !== null && r !== "insights");
    const en = publishedRoutes("en")
      .map((slug) => routeForSlug(slug, "en"))
      .filter((r): r is SectionRoute => r !== null && r !== "insights");
    expect(es).toEqual(en);
  });
});

describe("EN section page modules (EN-SECTIONS-002)", () => {
  it("serves EN content through the localized section page module", () => {
    const sectionPageSource = readFileSync(
      new URL("../src/app/[locale]/[...slugs]/page.tsx", import.meta.url),
      "utf-8"
    );
    expect(sectionPageSource).toContain("routeForSlug");
    expect(sectionPageSource).toContain("getSectionContent");
  });
});
