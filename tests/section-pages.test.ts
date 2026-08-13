import { describe, expect, it } from "vitest";
import {
  contentByLocale,
  navAnchorPath,
  validateContentParity,
} from "@/content/homepage";
import { buildApprovedNav } from "@/components/Header/menuData";
import {
  DEFAULT_APPROVALS,
  admitPublication,
} from "@/content/homepage/publication";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

describe("one-page nav anchors (SECTION-PAGE-001)", () => {
  it("points every approved nav item at a real in-page anchor on the homepage", () => {
    expect(navAnchorPath(esContent, "services")).toBe("/#servicios");
    expect(navAnchorPath(esContent, "method")).toBe("/#metodo");
    expect(navAnchorPath(esContent, "cases")).toBe("/#casos");
    expect(navAnchorPath(esContent, "about")).toBe("/#nosotros");
    expect(navAnchorPath(enContent, "services")).toBe("/#services");
    expect(navAnchorPath(enContent, "method")).toBe("/#method");
    expect(navAnchorPath(enContent, "cases")).toBe("/#cases");
    expect(navAnchorPath(enContent, "about")).toBe("/#about");
  });

  it("keeps ES/EN nav anchor structure identical", () => {
    expect(esContent.nav.items.length).toBe(enContent.nav.items.length);
    expect(
      esContent.nav.items.map((item) => item.id).sort()
    ).toEqual(enContent.nav.items.map((item) => item.id).sort());
    for (const content of [esContent, enContent]) {
      for (const item of content.nav.items) {
        if (item.approved) {
          expect(item.destination).toMatch(/^\/#/);
        }
      }
    }
  });

  it("passes content parity without any sub-page domain", () => {
    expect(validateContentParity()).toEqual([]);
    expect("sectionPages" in esContent).toBe(false);
    expect("sectionPages" in enContent).toBe(false);
  });
});

describe("approved navigation with real in-page anchors (SECTION-PAGE-002)", () => {
  it("approves the four sections and withholds Insights", () => {
    for (const content of [esContent, enContent]) {
      const approved = content.nav.items.filter((item) => item.approved);
      expect(approved.map((item) => item.id)).toEqual([
        "services",
        "method",
        "cases",
        "about",
      ]);
      for (const item of approved) {
        expect(item.destination).toMatch(/^\/#/);
      }
      const insights = content.nav.items.find((item) => item.id === "insights");
      expect(insights?.approved).toBe(false);
      expect(insights?.destination).toBeNull();
    }
  });

  it("yields exactly the four approved localized nav items", () => {
    const esNav = buildApprovedNav(esContent);
    expect(esNav.map((item) => item.title)).toEqual([
      "Servicios",
      "Método",
      "Casos",
      "Nosotros",
    ]);
    expect(esNav.map((item) => item.path)).toEqual([
      "/es/#servicios",
      "/es/#metodo",
      "/es/#casos",
      "/es/#nosotros",
    ]);
    const enNav = buildApprovedNav(enContent);
    expect(enNav.map((item) => item.title)).toEqual([
      "Services",
      "Method",
      "Cases",
      "About",
    ]);
    expect(enNav.map((item) => item.path)).toEqual([
      "/en/#services",
      "/en/#method",
      "/en/#cases",
      "/en/#about",
    ]);
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
