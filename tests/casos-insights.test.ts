import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  approvedCaseSlugs,
  getSectionContent,
  publishedRoutes,
} from "@/content/sections";
import { SECTION_ROUTES } from "@/content/sections/types";
import { sectionStaticParams } from "@/utils/sectionPage";

const CASE_SLUGS = ["gym-access-os", "chatbot", "crm"];

function sourceOf(path: string): string {
  try {
    return readFileSync(new URL(path, import.meta.url), "utf-8");
  } catch {
    return "";
  }
}

const casosListingSource = sourceOf("../src/app/[locale]/[...slugs]/page.tsx");
const casosDetailSource = sourceOf("../src/app/[locale]/[...slugs]/page.tsx");
const insightsSource = sourceOf("../src/app/[locale]/[...slugs]/page.tsx");
const redirectSource = sourceOf("../src/app/[locale]/success-cases/[slug]/page.tsx");

describe("cases registry (CASOS-001)", () => {
  it("registers every approved case slug for ES", () => {
    expect(approvedCaseSlugs("es")).toEqual(CASE_SLUGS);
    const casos = getSectionContent("casos", "es");
    expect(casos.approved).toBe(true);
    expect(casos.seo.title.trim().length).toBeGreaterThan(0);
    expect(casos.heading.trim().length).toBeGreaterThan(0);
  });

  it("registers the approved case slugs for EN after the flip", () => {
    expect(approvedCaseSlugs("en")).toEqual(CASE_SLUGS);
  });

  it("keeps casos inside the published ES route set", () => {
    expect(publishedRoutes("es")).toContain("casos");
    expect(SECTION_ROUTES).toContain("casos");
  });
});

describe("casos page modules (CASOS-002)", () => {
  it("derives listing static params from the published registry", () => {
    expect(sectionStaticParams("casos")).toEqual([{ locale: "es" }, { locale: "en" }]);
    expect(casosListingSource).toContain("routeForSlug");
    expect(casosListingSource).toContain("notFound()");
    expect(casosListingSource).toContain("SectionPageShell");
  });

  it("derives detail static params for every ES approved case", async () => {
    const { generateStaticParams } = await import(
      "@/app/[locale]/[...slugs]/page"
    );
    const params = generateStaticParams();
    for (const caseSlug of CASE_SLUGS) {
      expect(params).toContainEqual({ locale: "es", slugs: ["casos", caseSlug] });
      expect(params).toContainEqual({ locale: "en", slugs: ["cases", caseSlug] });
    }
    expect(casosDetailSource).toContain("notFound()");
    expect(casosDetailSource).toContain("markdownToHtml");
  });

  it("redirects legacy success-case URLs permanently to /casos/[slug]", () => {
    expect(redirectSource).toContain("redirect(");
    expect(redirectSource).toContain('"replace"');
    expect(redirectSource).toContain("/casos/");
    expect(redirectSource).not.toContain("SectionPageShell");
  });
});

describe("insights withholding (INSIGHTS-001)", () => {
  it("publishes no insights route while content is unapproved", () => {
    expect(publishedRoutes("es")).not.toContain("insights");
    expect(sectionStaticParams("insights")).toEqual([]);
  });

  it("keeps the insights route gated and server-first", () => {
    expect(insightsSource).toContain("routeForSlug");
    expect(insightsSource).toContain("notFound()");
    expect(insightsSource).not.toContain('"use client"');
    expect(sectionStaticParams("insights")).toEqual([]);
  });
});

describe("sitemap cases URLs (CASOS-003)", () => {
  it("emits /casos/[slug] and never /success-cases/[slug]", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const urls = sitemap().map((e) => e.url);
    for (const slug of CASE_SLUGS) {
      expect(urls).toContain(`https://nextwrld.com/es/casos/${slug}`);
      expect(urls).not.toContain(`https://nextwrld.com/es/success-cases/${slug}`);
    }
    expect(urls).toContain("https://nextwrld.com/en/casos/crm");
  });
});
