import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { localizedHref, localizedPath, replaceLocale } from "@/utils/i18n-url";
import { getDictionary } from "@/i18n/dictionaries";

const require = createRequire(import.meta.url);

describe("server-first localization (I18N-006)", () => {
  it("does not depend on react-i18next or i18next at runtime", () => {
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    expect(deps.i18next).toBeUndefined();
    expect(deps["react-i18next"]).toBeUndefined();
  });
});

describe("locale configuration", () => {
  it("exposes es and en with spanish as default", () => {
    expect(locales).toEqual(["es", "en"]);
    expect(defaultLocale).toBe("es");
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("localized url helpers", () => {
  it("prefixes paths and anchors with the locale", () => {
    expect(localizedPath("es", "/")).toBe("/es");
    expect(localizedPath("en", "/contact")).toBe("/en/contact");
    expect(localizedPath("es", "/success-cases/crm")).toBe("/es/success-cases/crm");
    expect(localizedHref("es", "/#contact")).toBe("/es/#contact");
    expect(localizedHref("en", "/")).toBe("/en");
  });

  it("replaces the first segment preserving the rest of the path", () => {
    expect(replaceLocale("/es", "en")).toBe("/en");
    expect(replaceLocale("/es/success-cases/crm", "en")).toBe("/en/success-cases/crm");
    expect(replaceLocale("/en/diagnostico", "es")).toBe("/es/diagnostico");
  });
});

describe("server dictionaries", () => {
  it("returns localized dictionaries with an identical shape", async () => {
    const [es, en] = await Promise.all([getDictionary("es"), getDictionary("en")]);
    expect(es.seo.home.title).toContain("Próximo");
    expect(en.seo.home.title).toContain("Next World");
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort());
  });
});

describe("legacy redirect matrix", () => {
  it("maps every historical public route to its /es destination permanently", async () => {
    const nextConfig = require("../next.config.js");
    const redirects = await nextConfig.redirects();
    const table = redirects.map(
      (r: { source: string; destination: string; permanent: boolean }) => ({
        source: r.source,
        destination: r.destination,
        permanent: r.permanent,
      })
    );

    const expected = [
      { source: "/", destination: "/es", permanent: true },
      { source: "/diagnostico", destination: "/es/diagnostico", permanent: true },
      { source: "/contact", destination: "/es/contact", permanent: true },
      { source: "/pricing", destination: "/es/pricing", permanent: true },
      { source: "/privacy-policy", destination: "/es/privacy-policy", permanent: true },
      { source: "/legal-notice", destination: "/es/legal-notice", permanent: true },
      { source: "/terms-of-service", destination: "/es/terms-of-service", permanent: true },
      { source: "/success-cases/:slug", destination: "/es/success-cases/:slug", permanent: true },
    ];

    for (const entry of expected) {
      expect(table).toContainEqual(entry);
    }
  });

  it("does not redirect removed demo routes", async () => {
    const nextConfig = require("../next.config.js");
    const redirects = await nextConfig.redirects();
    const sources = redirects.map((r: { source: string }) => r.source);
    for (const removed of ["/about", "/blogs", "/blogs/:slug", "/error"]) {
      expect(sources).not.toContain(removed);
    }
    expect(sources).not.toContain("/api/contact");
    expect(sources).not.toContain("/api/success-cases/:slug");
  });
});