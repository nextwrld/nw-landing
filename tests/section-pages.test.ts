import { describe, expect, it } from "vitest";
import {
  contentByLocale,
  getSectionPage,
  sectionKeyForSlug,
  sectionPagePath,
  validateContentParity,
} from "@/content/homepage";
import { SECTION_PAGE_KEYS } from "@/content/homepage/types";
import { buildApprovedNav } from "@/components/Header/menuData";
import {
  DEFAULT_APPROVALS,
  admitPublication,
} from "@/content/homepage/publication";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

describe("section page content domain (SECTION-PAGE-001)", () => {
  it("defines the four section page keys with the approved slugs", () => {
    expect(SECTION_PAGE_KEYS).toEqual(["services", "method", "cases", "about"]);
    expect(sectionPagePath("es", "services")).toBe("/servicios");
    expect(sectionPagePath("es", "method")).toBe("/metodo");
    expect(sectionPagePath("es", "cases")).toBe("/casos");
    expect(sectionPagePath("es", "about")).toBe("/nosotros");
    expect(sectionPagePath("en", "services")).toBe("/services");
    expect(sectionPagePath("en", "method")).toBe("/method");
    expect(sectionPagePath("en", "cases")).toBe("/cases");
    expect(sectionPagePath("en", "about")).toBe("/about");
  });

  it("resolves localized slugs to section page keys", () => {
    expect(sectionKeyForSlug("es", "servicios")).toBe("services");
    expect(sectionKeyForSlug("es", "nosotros")).toBe("about");
    expect(sectionKeyForSlug("en", "services")).toBe("services");
    expect(sectionKeyForSlug("en", "about")).toBe("about");
    expect(sectionKeyForSlug("es", "services")).toBeUndefined();
    expect(sectionKeyForSlug("es", undefined)).toBeUndefined();
  });

  it("keeps ES/EN section pages structurally identical", () => {
    expect(Object.keys(esContent.sectionPages).sort()).toEqual(
      Object.keys(enContent.sectionPages).sort()
    );
    for (const key of SECTION_PAGE_KEYS) {
      const es = esContent.sectionPages[key];
      const en = enContent.sectionPages[key];
      expect(Object.keys(es).sort()).toEqual(["eyebrow", "heading", "seo"]);
      expect(Object.keys(es.seo).sort()).toEqual(["description", "title"]);
      expect(es.eyebrow.length).toBeGreaterThan(0);
      expect(es.heading.length).toBeGreaterThan(0);
      expect(en.eyebrow.length).toBeGreaterThan(0);
      expect(en.heading.length).toBeGreaterThan(0);
      expect(es.seo.title.length).toBeGreaterThan(0);
      expect(es.seo.description.length).toBeGreaterThan(0);
      expect(en.seo.title.length).toBeGreaterThan(0);
      expect(en.seo.description.length).toBeGreaterThan(0);
    }
  });

  it("gives every section page its own SEO copy, never the homepage title", () => {
    for (const content of [esContent, enContent]) {
      for (const key of SECTION_PAGE_KEYS) {
        expect(content.sectionPages[key].seo.title).not.toBe(content.seo.title);
        expect(content.sectionPages[key].seo.description).not.toBe(
          content.seo.description
        );
      }
    }
    expect(getSectionPage("es", "services").heading.length).toBeGreaterThan(0);
  });

  it("passes content parity including the section pages", () => {
    expect(validateContentParity()).toEqual([]);
  });
});

describe("approved navigation with real destinations (SECTION-PAGE-002)", () => {
  it("approves the four real section routes and withholds Insights", () => {
    for (const content of [esContent, enContent]) {
      const approved = content.nav.items.filter((item) => item.approved);
      expect(approved.map((item) => item.id)).toEqual([
        "services",
        "method",
        "cases",
        "about",
      ]);
      for (const item of approved) {
        expect(item.destination).toMatch(
          new RegExp(`^/[a-z]+/${sectionPagePath(content.locale, item.id as "services").replace("/", "")}`)
        );
      }
      const insights = content.nav.items.find((item) => item.id === "insights");
      expect(insights?.approved).toBe(false);
      expect(insights?.destination).toBeNull();
    }
  });

  it("yields exactly the four approved nav items", () => {
    expect(buildApprovedNav(esContent).map((item) => item.title)).toEqual([
      "Servicios",
      "Método",
      "Casos",
      "Nosotros",
    ]);
    expect(buildApprovedNav(enContent).map((item) => item.title)).toEqual([
      "Services",
      "Method",
      "Cases",
      "About",
    ]);
    for (const item of buildApprovedNav(esContent)) {
      expect(item.path).toBeTruthy();
    }
  });

  it("keeps the release gate fail-closed while global navigation approval stays pending", () => {
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: DEFAULT_APPROVALS });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeTruthy();
  });
});
