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

describe("pathname translation across locales (EN-SLUGS-004)", () => {
  it("translates flat section slugs both ways", async () => {
    const { translatePathname } = await import("@/utils/i18n-url");
    expect(translatePathname("/es/como-trabajamos", "en")).toBe("/en/how-we-work");
    expect(translatePathname("/en/how-we-work", "es")).toBe("/es/como-trabajamos");
    expect(translatePathname("/es/nosotros", "en")).toBe("/en/about-us");
    expect(translatePathname("/es/diagnostico", "en")).toBe("/en/diagnosis");
  });

  it("translates service prefix and slugs both ways", async () => {
    const { translatePathname } = await import("@/utils/i18n-url");
    expect(translatePathname("/es/servicios/software-a-medida", "en")).toBe(
      "/en/services/custom-software"
    );
    expect(translatePathname("/en/services/custom-software", "es")).toBe(
      "/es/servicios/software-a-medida"
    );
    expect(translatePathname("/es/servicios/automatizacion", "en")).toBe(
      "/en/services/automation"
    );
  });

  it("translates the cases section and keeps case slugs", async () => {
    const { translatePathname } = await import("@/utils/i18n-url");
    expect(translatePathname("/es/casos", "en")).toBe("/en/cases");
    expect(translatePathname("/es/casos/crm", "en")).toBe("/en/cases/crm");
    expect(translatePathname("/en/cases/gym-access-os", "es")).toBe("/es/casos/gym-access-os");
  });

  it("keeps non-section segments and the homepage unchanged", async () => {
    const { translatePathname } = await import("@/utils/i18n-url");
    expect(translatePathname("/es", "en")).toBe("/en");
    expect(translatePathname("/es/contact", "en")).toBe("/en/contact");
    expect(translatePathname("/es/pricing", "en")).toBe("/en/pricing");
    expect(translatePathname("/es/legal-notice", "en")).toBe("/en/legal-notice");
  });
});
