import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  getSectionContent,
  publishedRoutes,
} from "@/content/sections";
import { SECTION_ROUTES } from "@/content/sections/types";
import { sectionPageContent, sectionStaticParams } from "@/utils/sectionPage";

const INSTITUTIONAL_ROUTES = ["como-trabajamos", "nosotros"] as const;

function sourceOf(path: string): string {
  try {
    return readFileSync(new URL(path, import.meta.url), "utf-8");
  } catch {
    return "";
  }
}

const comoTrabajamosSource = sourceOf("../src/app/[locale]/como-trabajamos/page.tsx");
const nosotrosSource = sourceOf("../src/app/[locale]/nosotros/page.tsx");
const shellSource = sourceOf("../src/components/HomeExperience/SectionPageShell.tsx");

describe("institutional route registry (INSTITUCIONAL-001)", () => {
  it("publishes como-trabajamos and nosotros in ES with complete approved content", () => {
    const published = publishedRoutes("es");
    for (const route of INSTITUTIONAL_ROUTES) {
      expect(published).toContain(route);
      expect(SECTION_ROUTES).toContain(route);
      const entry = getSectionContent(route, "es");
      expect(entry.approved).toBe(true);
      expect(entry.seo.title.trim().length).toBeGreaterThan(0);
      expect(entry.seo.description.trim().length).toBeGreaterThan(0);
      expect(entry.heading.trim().length).toBeGreaterThan(0);
      expect(entry.intro.trim().length).toBeGreaterThan(0);
      expect(entry.sections.length).toBeGreaterThan(0);
    }
  });

  it("renders the five-stage framework in como-trabajamos content", () => {
    const entry = getSectionContent("como-trabajamos", "es");
    const stageHeadings = entry.sections.map((s) => s.heading);
    for (const stage of ["Discover", "Shape", "Build", "Launch", "Evolve"]) {
      expect(stageHeadings).toContain(stage);
    }
  });

  it("does not publish insights yet", () => {
    expect(publishedRoutes("es")).not.toContain("insights");
  });
});

describe("institutional page modules (INSTITUCIONAL-002)", () => {
  it("derives static params only for published locales", () => {
    expect(comoTrabajamosSource).toContain("sectionStaticParams");
    expect(nosotrosSource).toContain("sectionStaticParams");
    expect(sectionStaticParams("como-trabajamos")).toEqual([{ locale: "es" }, { locale: "en" }]);
    expect(sectionStaticParams("nosotros")).toEqual([{ locale: "es" }, { locale: "en" }]);
  });

  it("guards unapproved locales with notFound and renders server-first", () => {
    expect(comoTrabajamosSource).toContain("notFound()");
    expect(nosotrosSource).toContain("notFound()");
    expect(comoTrabajamosSource).toContain("SectionPageShell");
    expect(nosotrosSource).toContain("SectionPageShell");
    expect(shellSource).not.toContain('"use client"');
  });

  it("serves EN content for institutional routes after the flip", () => {
    expect(sectionPageContent("como-trabajamos", "en")?.approved).toBe(true);
    expect(sectionPageContent("nosotros", "en")?.approved).toBe(true);
  });
});

describe("institutional server-first render (INSTITUCIONAL-003)", () => {
  it("renders the full como-trabajamos narrative including all five stages", async () => {
    const { default: SectionPageShell } = await import(
      "@/components/HomeExperience/SectionPageShell"
    );
    const content = getSectionContent("como-trabajamos", "es");
    const html = renderToStaticMarkup(createElement(SectionPageShell, { content }));
    expect(html).toMatch(/<h1[ >]/);
    expect(html).toContain(content.heading);
    expect(html).toContain(content.intro);
    for (const block of content.sections) {
      expect(html).toContain(block.heading);
      expect(html).toContain(block.body);
    }
  });

  it("renders the nosotros narrative server-first", async () => {
    const { default: SectionPageShell } = await import(
      "@/components/HomeExperience/SectionPageShell"
    );
    const content = getSectionContent("nosotros", "es");
    const html = renderToStaticMarkup(createElement(SectionPageShell, { content }));
    expect(html).toMatch(/<h1[ >]/);
    expect(html).toContain(content.heading);
    for (const block of content.sections) {
      expect(html).toContain(block.heading);
    }
  });
});
