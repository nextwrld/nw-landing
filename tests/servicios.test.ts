import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import sitemap from "@/app/sitemap";
import {
  getSectionContent,
  publishedRoutes,
  validateSectionContent,
} from "@/content/sections";
import { SECTION_ROUTES } from "@/content/sections/types";

const SERVICE_SLUGS = ["software-a-medida", "sistemas-de-gestion", "automatizacion"];

function sourceOf(path: string): string {
  try {
    return readFileSync(new URL(path, import.meta.url), "utf-8");
  } catch {
    return "";
  }
}

const pageSource = sourceOf("../src/app/[locale]/servicios/[slug]/page.tsx");
const shellSource = sourceOf("../src/components/HomeExperience/SectionPageShell.tsx");

describe("service route registry (SERVICIOS-001)", () => {
  it("publishes exactly the three ES service routes with complete content", async () => {
    const { serviceRoutes } = await import("@/content/sections");
    expect(serviceRoutes("es")).toEqual(SERVICE_SLUGS);
    for (const slug of serviceRoutes("es")) {
      expect(SECTION_ROUTES).toContain(slug);
      const entry = getSectionContent(slug as (typeof SECTION_ROUTES)[number], "es");
      expect(entry.approved).toBe(true);
      expect(entry.seo.title.trim().length).toBeGreaterThan(0);
      expect(entry.seo.description.trim().length).toBeGreaterThan(0);
      expect(entry.heading.trim().length).toBeGreaterThan(0);
      expect(entry.intro.trim().length).toBeGreaterThan(0);
      expect(entry.sections.length).toBeGreaterThan(0);
      for (const block of entry.sections) {
        expect(block.heading.trim().length).toBeGreaterThan(0);
        expect(block.body.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("publishes the three EN service routes after the flip", async () => {
    const { serviceRoutes } = await import("@/content/sections");
    expect(serviceRoutes("en")).toEqual(SERVICE_SLUGS);
  });

  it("validates the ES section content without problems", () => {
    expect(validateSectionContent("es")).toEqual([]);
  });

  it("keeps every ES published route inside the registry", () => {
    for (const route of publishedRoutes("es")) {
      expect(SECTION_ROUTES).toContain(route);
    }
  });
});

describe("service route page module (SERVICIOS-002)", () => {
  it("derives static params from the published service registry", () => {
    expect(pageSource).toContain("serviceRoutes");
    expect(pageSource).toContain("generateStaticParams");
    expect(pageSource).toContain("dynamicParams = false");
  });

  it("guards unknown slugs and unapproved locales with notFound", () => {
    expect(pageSource).toContain("notFound()");
    expect(pageSource).toContain("getSectionContent");
  });

  it("renders through the server-first SectionPageShell", () => {
    expect(pageSource).toContain("SectionPageShell");
    expect(shellSource).toContain("content");
    expect(shellSource).not.toContain('"use client"');
  });
});

describe("SectionPageShell server-first render (SERVICIOS-003)", () => {
  it("renders heading, intro, and every section block in initial HTML", async () => {
    const { default: SectionPageShell } = await import(
      "@/components/HomeExperience/SectionPageShell"
    );
    const content = getSectionContent("software-a-medida", "es");
    const html = renderToStaticMarkup(createElement(SectionPageShell, { content }));
    expect(html).toMatch(/<h1[ >]/);
    expect(html).toMatch(/<h2[ >]/);
    expect(html).toContain(content.heading);
    expect(html).toContain(content.intro);
    for (const block of content.sections) {
      expect(html).toContain(block.heading);
      expect(html).toContain(block.body);
      expect(html).toMatch(new RegExp(`id="${block.id}-heading"`));
    }
  });

  it("renders each of the three service pages without client content", async () => {
    const { default: SectionPageShell } = await import(
      "@/components/HomeExperience/SectionPageShell"
    );
    for (const slug of SERVICE_SLUGS) {
      const content = getSectionContent(slug as (typeof SECTION_ROUTES)[number], "es");
      const html = renderToStaticMarkup(createElement(SectionPageShell, { content }));
      expect(html.length).toBeGreaterThan(0);
      expect(html).not.toContain("use client");
      expect(html).not.toContain("__NEXT_DATA__");
    }
  });
});

describe("sitemap includes published section routes (SERVICIOS-004)", () => {
  it("lists every ES published service and section route", () => {
    const urls = sitemap().map((e) => e.url);
    for (const slug of SERVICE_SLUGS) {
      expect(urls).toContain(`https://nextwrld.com/es/servicios/${slug}`);
    }
    expect(urls).toContain("https://nextwrld.com/es/como-trabajamos");
    expect(urls).toContain("https://nextwrld.com/es/casos");
    expect(urls).toContain("https://nextwrld.com/es/nosotros");
  });

  it("withholds unapproved and EN section routes from the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).not.toContain("https://nextwrld.com/es/insights");
    expect(urls).not.toContain("https://nextwrld.com/en/insights");
    for (const slug of SERVICE_SLUGS) {
      expect(urls).toContain(`https://nextwrld.com/en/servicios/${slug}`);
    }
    expect(urls).toContain("https://nextwrld.com/en/como-trabajamos");
    expect(urls).toContain("https://nextwrld.com/en/casos");
    expect(urls).toContain("https://nextwrld.com/en/nosotros");
  });
});
