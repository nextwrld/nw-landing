import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";
import sitemap from "@/app/sitemap";
import * as sectionPageModule from "@/app/[locale]/[...section]/page";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const sectionPageSource = readFileSync(
  new URL("../src/app/[locale]/[...section]/page.tsx", import.meta.url),
  "utf8"
);
const sectionPageComponentSource = readFileSync(
  new URL("../src/components/HomeExperience/SectionPage.tsx", import.meta.url),
  "utf8"
);
const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);
const heroSource = readFileSync(
  new URL("../src/components/HomeExperience/Hero.tsx", import.meta.url),
  "utf8"
);

describe("section sub-page routing and SEO (SECTION-PAGE-003)", () => {
  it("renders the section pages only when the Experience is admitted", () => {
    expect(sectionPageSource).toContain("admitPublication");
    expect(sectionPageSource).toContain('admission !== "experience"');
    expect(sectionPageSource).toContain("notFound()");
  });

  it("composes the matching reused slice per section page", () => {
    expect(sectionPageSource).toContain("<Capabilities");
    expect(sectionPageSource).toContain("<Method");
    expect(sectionPageSource).toContain("<EvidenceSection");
    expect(sectionPageSource).toContain("<Differentiation");
  });

  it("renders an eyebrow and page H1 before the reused slice", () => {
    expect(sectionPageComponentSource).toContain("<main id=\"main-content\">");
    expect(sectionPageComponentSource).toContain("experience-eyebrow");
    expect(sectionPageComponentSource).toContain("<h1");
  });

  it("reuses the shared evidence wrapper for the cases page", () => {
    const evidenceSectionSource = readFileSync(
      new URL(
        "../src/components/HomeExperience/EvidenceSection.tsx",
        import.meta.url
      ),
      "utf8"
    );
    expect(evidenceSectionSource).toContain("<AIONProductShowcase");
    expect(evidenceSectionSource).toContain("<CaseEvidence");
    expect(experienceHomeSource).toContain("<EvidenceSection");
  });

  it("emits per-route canonical and reciprocal hreflang metadata", async () => {
    const es = (await sectionPageModule.generateMetadata({
      params: Promise.resolve({ locale: "es", section: ["servicios"] }),
    })) as { alternates: { canonical: string; languages: Record<string, string> } };
    expect(es.alternates.canonical).toBe("https://nextwrld.com/es/servicios");
    expect(es.alternates.languages.en).toBe(
      "https://nextwrld.com/en/services"
    );

    const en = (await sectionPageModule.generateMetadata({
      params: Promise.resolve({ locale: "en", section: ["about"] }),
    })) as { alternates: { canonical: string; languages: Record<string, string> } };
    expect(en.alternates.canonical).toBe("https://nextwrld.com/en/about");
    expect(en.alternates.languages.es).toBe(
      "https://nextwrld.com/es/nosotros"
    );
  });

  it("uses its own title and description, not the homepage SEO copy", async () => {
    const es = (await sectionPageModule.generateMetadata({
      params: Promise.resolve({ locale: "es", section: ["metodo"] }),
    })) as { title: { absolute: string }; description: string };
    expect(es.title.absolute).toBe(esContent.sectionPages.method.seo.title);
    expect(es.title.absolute).not.toBe(esContent.seo.title);
    expect(es.description).toBe(esContent.sectionPages.method.seo.description);
  });

  it("points the hero secondary CTA to the approved cases route", () => {
    expect(esContent.hero.secondaryCtaHref).toBe("/es/casos");
    expect(enContent.hero.secondaryCtaHref).toBe("/en/cases");
    expect(heroSource).toContain("content.secondaryCtaHref");
  });
});

describe("sitemap coverage (SECTION-PAGE-004)", () => {
  it("publishes every section page in both locales with reciprocal alternates", () => {
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
      expect(urls).toContain(url);
    }
    const esServicios = sitemap().find(
      (entry) => entry.url === "https://nextwrld.com/es/servicios"
    );
    expect(esServicios?.alternates?.languages).toEqual({
      es: "https://nextwrld.com/es/servicios",
      en: "https://nextwrld.com/en/services",
    });
    const enAbout = sitemap().find(
      (entry) => entry.url === "https://nextwrld.com/en/about"
    );
    expect(enAbout?.alternates?.languages).toEqual({
      es: "https://nextwrld.com/es/nosotros",
      en: "https://nextwrld.com/en/about",
    });
  });
});
