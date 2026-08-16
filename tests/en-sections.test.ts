import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  getSectionContent,
  publishedRoutes,
  sectionsByLocale,
  validateSectionContent,
} from "@/content/sections";
import { SECTION_ROUTES } from "@/content/sections/types";
import { sectionStaticParams } from "@/utils/sectionPage";

const EN_PUBLISHED = [
  "software-a-medida",
  "sistemas-de-gestion",
  "automatizacion",
  "como-trabajamos",
  "casos",
  "nosotros",
  "diagnostico",
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

  it("keeps ES and EN section route sets symmetric except insights", () => {
    const es = publishedRoutes("es").filter((r) => r !== "insights");
    const en = publishedRoutes("en").filter((r) => r !== "insights");
    expect(es).toEqual(en);
  });
});

describe("EN section page modules (EN-SECTIONS-002)", () => {
  it("serves EN content through the shared section page modules", () => {
    const comoTrabajamosSource = readFileSync(
      new URL("../src/app/[locale]/como-trabajamos/page.tsx", import.meta.url),
      "utf-8"
    );
    expect(comoTrabajamosSource).toContain('sectionStaticParams("como-trabajamos")');
    expect(comoTrabajamosSource).toContain("sectionPageMetadata");
  });
});
