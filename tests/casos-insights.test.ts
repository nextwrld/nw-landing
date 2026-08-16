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

const casosListingSource = sourceOf("../src/app/[locale]/casos/page.tsx");
const casosDetailSource = sourceOf("../src/app/[locale]/casos/[slug]/page.tsx");
const insightsSource = sourceOf("../src/app/[locale]/insights/page.tsx");
const redirectSource = sourceOf("../src/app/[locale]/success-cases/[slug]/page.tsx");

describe("cases registry (CASOS-001)", () => {
  it("registers every approved case slug for ES", () => {
    expect(approvedCaseSlugs("es")).toEqual(CASE_SLUGS);
    const casos = getSectionContent("casos", "es");
    expect(casos.approved).toBe(true);
    expect(casos.seo.title.trim().length).toBeGreaterThan(0);
    expect(casos.heading.trim().length).toBeGreaterThan(0);
  });

  it("registers no approved case slugs for EN while EN content is unapproved", () => {
    expect(approvedCaseSlugs("en")).toEqual([]);
  });

  it("keeps casos inside the published ES route set", () => {
    expect(publishedRoutes("es")).toContain("casos");
    expect(SECTION_ROUTES).toContain("casos");
  });
});

describe("casos page modules (CASOS-002)", () => {
  it("derives listing static params from the published registry", () => {
    expect(sectionStaticParams("casos")).toEqual([{ locale: "es" }]);
    expect(casosListingSource).toContain("sectionStaticParams");
    expect(casosListingSource).toContain("dynamicParams = false");
    expect(casosListingSource).toContain("notFound()");
    expect(casosListingSource).toContain("SectionPageShell");
  });

  it("derives detail static params for every ES approved case", async () => {
    const { generateStaticParams } = await import(
      "@/app/[locale]/casos/[slug]/page"
    );
    const params = generateStaticParams();
    expect(params).toEqual(
      CASE_SLUGS.map((slug) => ({ locale: "es", slug }))
    );
    expect(casosDetailSource).toContain("dynamicParams = false");
    expect(casosDetailSource).toContain("notFound()");
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

  it("keeps the insights page module server-first and gated", () => {
    expect(insightsSource).toContain("sectionStaticParams");
    expect(insightsSource).toContain("dynamicParams = false");
    expect(insightsSource).toContain("notFound()");
    expect(insightsSource).not.toContain('"use client"');
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
    expect(urls).not.toContain("https://nextwrld.com/en/casos/crm");
  });
});
