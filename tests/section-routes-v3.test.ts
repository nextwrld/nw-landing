import { describe, expect, it } from "vitest";
import { contentByLocale } from "@/content/homepage";
import {
  DEFAULT_APPROVALS,
  PublicationBlockedError,
  admitPublication,
  buildApprovals,
  validateNoEmptyContent,
  validateRelease,
  validateRouteExistence,
} from "@/content/homepage/publication";
import { buildApprovedNavV3 } from "@/components/Header/menuData";
import {
  getSectionContent,
  publishedRoutes,
  routeFromDestination,
  sectionsByLocale,
  validateSectionContent,
} from "@/content/sections";
import { SECTION_ROUTES } from "@/content/sections/types";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const ES_PUBLISHED = [
  "software-a-medida",
  "sistemas-de-gestion",
  "automatizacion",
  "como-trabajamos",
  "casos",
  "nosotros",
  "diagnostico",
];

function destinationsOf(content: typeof esContent): string[] {
  const destinations: string[] = [];
  for (const item of content.nav.items) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.destination) destinations.push(child.destination);
      }
    } else if (item.destination) {
      destinations.push(item.destination);
    }
  }
  return destinations;
}

function routeOf(destination: string): string | null {
  const segments = destination.split("/").filter(Boolean);
  return segments.length === 0 ? null : segments[segments.length - 1];
}

function ctaDestinations(content: typeof esContent): string[] {
  return [content.hero.secondaryCtaHref, content.finalCta.primaryCtaHref];
}

describe("section route registry (SECTION-PAGE-V3-001)", () => {
  it("registers every published ES route with approved, complete content", () => {
    expect(publishedRoutes("es")).toEqual(ES_PUBLISHED);
    for (const route of publishedRoutes("es")) {
      expect(SECTION_ROUTES).toContain(route);
      const entry = getSectionContent(route, "es");
      expect(entry.approved).toBe(true);
      expect(entry.heading.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps every registered route inside the unique eight-route union", () => {
    expect(SECTION_ROUTES).toHaveLength(8);
    expect([...new Set(SECTION_ROUTES)]).toHaveLength(SECTION_ROUTES.length);
    for (const route of SECTION_ROUTES) {
      expect(typeof route).toBe("string");
    }
  });

  it("validates section content completeness without problems", () => {
    expect(validateSectionContent("es")).toEqual([]);
  });
});

describe("ES nav/footer/CTA destinations resolve to routes (SECTION-PAGE-V3-002)", () => {
  it("resolves every approved nav destination to a published route", () => {
    const published = publishedRoutes("es");
    const destinations = destinationsOf(esContent);
    expect(destinations.length).toBeGreaterThan(0);
    for (const destination of destinations) {
      expect(published).toContain(routeOf(destination));
    }
  });

  it("resolves the hero and diagnosis CTA destinations to published routes", () => {
    const published = publishedRoutes("es");
    for (const destination of ctaDestinations(esContent)) {
      expect(destination.length).toBeGreaterThan(0);
      expect(published).toContain(routeOf(destination));
    }
  });

  it("emits the approved ES nav as localized route links with a services submenu", () => {
    const nav = buildApprovedNavV3(esContent);
    const paths = nav
      .flatMap((item) => [item.path, ...(item.submenu ?? []).map((child) => child.path)])
      .filter((path): path is string => typeof path === "string");
    expect(paths).toContain("/es/servicios/software-a-medida");
    expect(paths).toContain("/es/servicios/sistemas-de-gestion");
    expect(paths).toContain("/es/servicios/automatizacion");
    expect(paths).toContain("/es/como-trabajamos");
    expect(paths).toContain("/es/casos");
    expect(paths).toContain("/es/nosotros");
    expect(paths).not.toContain("/es/insights");
    expect(nav.find((item) => item.title === "Servicios")?.submenu).toHaveLength(3);
  });
});

describe("no /# destinations (SECTION-PAGE-V3-003)", () => {
  it("never uses an anchor destination in nav, footer, or CTA in either locale", () => {
    for (const content of [esContent, enContent]) {
      const destinations = [...destinationsOf(content), ...ctaDestinations(content)];
      expect(destinations.length).toBeGreaterThan(0);
      for (const destination of destinations) {
        expect(destination).not.toMatch(/#/);
        expect(destination).not.toMatch(/^\/#/);
        expect(destination.startsWith("/")).toBe(true);
      }
    }
  });
});

describe("no empty destinations (SECTION-PAGE-V3-004)", () => {
  it("passes the ES no-empty-content validator on the real content", () => {
    expect(validateNoEmptyContent("es")).toEqual([]);
  });

  it("keeps every approved nav destination content-complete in the registry", () => {
    for (const destination of destinationsOf(esContent)) {
      const route = routeFromDestination(destination, "es");
      expect(route).not.toBeNull();
      const entry = getSectionContent(route!, "es");
      expect(entry.approved).toBe(true);
    }
  });
});

describe("EN registry withheld until approved (SECTION-PAGE-V3-005)", () => {
  it("publishes the seven EN routes after the Fase 2 approval flip", () => {
    expect(publishedRoutes("en")).toEqual([
      "custom-software",
      "management-systems",
      "automation",
      "how-we-work",
      "cases",
      "about-us",
      "diagnosis",
    ]);
  });

  it("keeps insights unapproved and unpublished in both locales", () => {
    for (const locale of ["es", "en"] as const) {
      expect(publishedRoutes(locale)).not.toContain("insights");
      const entry = sectionsByLocale[locale].find((e) => e.route === "insights");
      expect(entry?.approved).toBe(false);
    }
  });
});

describe("route-based navigation admission (ADMISSION-NAV)", () => {
  it("emits only approved items whose destinations are real registered routes", () => {
    const esNav = buildApprovedNavV3(esContent);
    const enNav = buildApprovedNavV3(enContent);
    expect(esNav).toHaveLength(4);
    expect(enNav).toHaveLength(4);
    expect(esNav.some((item) => item.title === "Insights")).toBe(false);
    expect(enNav.some((item) => item.title === "Insights")).toBe(false);
    const esPaths = esNav
      .flatMap((item) => [item.path, ...(item.submenu ?? []).map((child) => child.path)])
      .filter((path): path is string => typeof path === "string");
    expect(esPaths.length).toBeGreaterThanOrEqual(4);
    for (const path of esPaths) {
      expect(path).toMatch(/^\/es\//);
      expect(path).not.toContain("#");
    }
  });

  it("withholds a nav item whose destination is not a registered route", () => {
    const mutated = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item) =>
          "children" in item
            ? item
            : item.id === "cases"
              ? { ...item, destination: "/wherever", approved: true }
              : item
        ),
      },
    };
    const nav = buildApprovedNavV3(mutated);
    expect(nav.some((item) => item.title === "Casos")).toBe(false);
    expect(validateRouteExistence("es", mutated)).not.toEqual([]);
  });
});

describe("route admission gate (ADMISSION-ROUTES)", () => {
  it("fails route existence for an unregistered destination", () => {
    const mutated = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item) =>
          "children" in item
            ? item
            : item.id === "method"
              ? { ...item, destination: "/no-such-route", approved: true }
              : item
        ),
      },
    };
    expect(validateRouteExistence("es", mutated)).not.toEqual([]);
  });

  it("rejects an anchor destination in route existence", () => {
    const mutated = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item) =>
          "children" in item
            ? item
            : item.id === "method"
              ? { ...item, destination: "/#metodo", approved: true }
              : item
        ),
      },
    };
    expect(validateRouteExistence("es", mutated)).not.toEqual([]);
  });

  it("blocks no-empty-content while /es/insights is pending approval", () => {
    const mutated = {
      ...esContent,
      nav: {
        items: esContent.nav.items.map((item) =>
          "children" in item
            ? item
            : item.id === "insights"
              ? { ...item, destination: "/insights", approved: true }
              : item
        ),
      },
    };
    const problems = validateNoEmptyContent("es", mutated);
    expect(problems).not.toEqual([]);
    expect(problems.some((problem) => problem.includes("insights"))).toBe(true);
  });

  it("keeps the draft gate on Foundation while the V3 skeleton is incomplete", () => {
    expect(admitPublication({ status: "draft", approvals: DEFAULT_APPROVALS })).toEqual({
      composition: "foundation",
    });
  });

  it("keeps release fail-closed now that EN routes publish", () => {
    // EN now publishes, so route/destination problems are gone; the release
    // gate still fails closed on evidence and remaining approval problems.
    const problems = validateRelease({ status: "release", approvals: buildApprovals() });
    expect(problems.some((problem) => /destination|route/i.test(problem))).toBe(false);
    expect(problems.length).toBeGreaterThan(0);
    expect(() =>
      admitPublication({ status: "release", approvals: buildApprovals() })
    ).toThrow(PublicationBlockedError);
  });
});
