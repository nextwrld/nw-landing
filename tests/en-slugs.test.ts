import { describe, expect, it } from "vitest";
import {
  getSectionContent,
  publishedRoutes,
  routeForSlug,
  routeFromDestination,
  servicePrefix,
  serviceRoutes,
  slugForRoute,
} from "@/content/sections";
import { SECTION_ROUTES, SECTION_SLUGS } from "@/content/sections/types";

const EN_SLUGS = {
  "software-a-medida": "custom-software",
  "sistemas-de-gestion": "management-systems",
  automatizacion: "automation",
  "como-trabajamos": "how-we-work",
  casos: "cases",
  insights: "insights",
  nosotros: "about-us",
  diagnostico: "diagnosis",
};

describe("localized slug mapping (EN-SLUGS-001)", () => {
  it("maps every canonical route to a Spanish and an English slug", () => {
    for (const route of SECTION_ROUTES) {
      expect(SECTION_SLUGS.es[route]).toBe(route);
      expect(SECTION_SLUGS.en[route].length).toBeGreaterThan(0);
    }
    expect(SECTION_SLUGS.en).toEqual(EN_SLUGS);
  });

  it("resolves slugs back to canonical routes per locale", () => {
    for (const route of SECTION_ROUTES) {
      expect(slugForRoute(route, "en")).toBe(EN_SLUGS[route]);
      expect(routeForSlug(EN_SLUGS[route], "en")).toBe(route);
      expect(routeForSlug(route, "es")).toBe(route);
    }
    expect(routeForSlug("how-we-work", "es")).toBeNull();
    expect(routeForSlug("custom-software", "es")).toBeNull();
  });
});

describe("localized published routes (EN-SLUGS-002)", () => {
  it("publishes English slugs for the EN locale", () => {
    const en = publishedRoutes("en");
    expect(en).toContain("custom-software");
    expect(en).toContain("how-we-work");
    expect(en).toContain("cases");
    expect(en).toContain("about-us");
    expect(en).toContain("diagnosis");
    expect(en).not.toContain("insights");
    expect(en).not.toContain("software-a-medida");
    expect(en).not.toContain("como-trabajamos");
  });

  it("keeps Spanish slugs for the ES locale", () => {
    const es = publishedRoutes("es");
    expect(es).toContain("software-a-medida");
    expect(es).toContain("como-trabajamos");
    expect(es).not.toContain("custom-software");
  });

  it("resolves content through localized slugs", () => {
    const entry = getSectionContent("custom-software", "en");
    expect(entry.approved).toBe(true);
    expect(entry.heading.length).toBeGreaterThan(0);
    expect(() => getSectionContent("software-a-medida", "en")).toThrow();
  });
});

describe("localized destinations and services (EN-SLUGS-003)", () => {
  it("resolves locale-relative destinations with localized slugs", () => {
    expect(routeFromDestination("/services/custom-software", "en")).toBe("software-a-medida");
    expect(routeFromDestination("/how-we-work", "en")).toBe("como-trabajamos");
    expect(routeFromDestination("/cases", "en")).toBe("casos");
    expect(routeFromDestination("/servicios/software-a-medida", "es")).toBe("software-a-medida");
    expect(routeFromDestination("/como-trabajamos", "es")).toBe("como-trabajamos");
    expect(routeFromDestination("/how-we-work", "es")).toBeNull();
    expect(routeFromDestination("/#metodo", "es")).toBeNull();
  });

  it("uses the localized service prefix and slugs", () => {
    expect(servicePrefix("es")).toBe("servicios");
    expect(servicePrefix("en")).toBe("services");
    expect(serviceRoutes("en")).toEqual(["custom-software", "management-systems", "automation"]);
    expect(serviceRoutes("es")).toEqual(["software-a-medida", "sistemas-de-gestion", "automatizacion"]);
  });
});
