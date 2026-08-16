import { describe, expect, it } from "vitest";
import { buildPageMetadata, localeUrl } from "@/utils/seo";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import * as homeModule from "@/app/[locale]/page";
import * as diagnosticoModule from "@/app/[locale]/diagnostico/page";
import * as contactModule from "@/app/[locale]/contact/page";
import * as pricingModule from "@/app/[locale]/pricing/page";
import * as privacyModule from "@/app/[locale]/privacy-policy/page";
import * as legalModule from "@/app/[locale]/legal-notice/page";
import * as termsModule from "@/app/[locale]/terms-of-service/page";
import * as caseModule from "@/app/[locale]/success-cases/[slug]/page";

type MetaFn = (p: { params: Promise<Record<string, string>> }) => Promise<Record<string, unknown>>;

const publicPages: { name: string; generate: MetaFn; params: Record<string, string> }[] = [
  { name: "home", generate: homeModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "diagnostico", generate: diagnosticoModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "contact", generate: contactModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "pricing", generate: pricingModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "privacy-policy", generate: privacyModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "legal-notice", generate: legalModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "terms-of-service", generate: termsModule.generateMetadata as MetaFn, params: { locale: "es" } },
  { name: "success-cases", generate: caseModule.generateMetadata as MetaFn, params: { locale: "es", slug: "crm" } },
];

describe("robots", () => {
  it("references the sitemap and disallows the api", () => {
    const out = robots();
    expect(out.sitemap).toBe("https://nextwrld.com/sitemap.xml");
    const rules = Array.isArray(out.rules) ? out.rules : [out.rules];
    expect(rules[0].disallow).toContain("/api/");
  });
});

describe("sitemap", () => {
  it("includes every public page in both locales with reciprocal alternates", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://nextwrld.com/es");
    expect(urls).toContain("https://nextwrld.com/en");
    expect(urls).toContain("https://nextwrld.com/es/diagnostico");
    expect(urls).toContain("https://nextwrld.com/en/contact");
    expect(urls).toContain("https://nextwrld.com/es/success-cases/crm");
    expect(urls).toContain("https://nextwrld.com/en/success-cases/gym-access-os");
  });

  it("publishes published section routes in the sitemap and withholds unapproved/EN routes", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://nextwrld.com/es/servicios/software-a-medida");
    expect(urls).toContain("https://nextwrld.com/es/servicios/sistemas-de-gestion");
    expect(urls).toContain("https://nextwrld.com/es/servicios/automatizacion");
    expect(urls).toContain("https://nextwrld.com/es/como-trabajamos");
    expect(urls).toContain("https://nextwrld.com/es/casos");
    expect(urls).toContain("https://nextwrld.com/es/nosotros");
    // Unapproved or withheld locales never appear.
    expect(urls).not.toContain("https://nextwrld.com/es/insights");
    expect(urls).not.toContain("https://nextwrld.com/es/metodo");
    for (const url of [
      "https://nextwrld.com/en/servicios/software-a-medida",
      "https://nextwrld.com/en/como-trabajamos",
      "https://nextwrld.com/en/casos",
      "https://nextwrld.com/en/nosotros",
    ]) {
      expect(urls).not.toContain(url);
    }
  });

  it("never lists demo, blog or error routes", () => {
    const urls = sitemap().map((e) => e.url);
    for (const forbidden of ["/blogs", "/error", "/fr", "/es/about"]) {
      expect(urls.some((u) => u.includes(forbidden))).toBe(false);
    }
  });

  it("publishes reciprocal ES/EN alternates for each entry", () => {
    const esContact = sitemap().find((e) => e.url === "https://nextwrld.com/es/contact");
    expect(esContact?.alternates?.languages).toEqual({
      es: "https://nextwrld.com/es/contact",
      en: "https://nextwrld.com/en/contact",
    });
  });
});

describe("page metadata (META-002/003/004)", () => {
  it.each(publicPages)("$name publishes absolute canonical, reciprocal alternates and Open Graph", async (p) => {
    const meta = await p.generate({ params: Promise.resolve(p.params) });
    const alternates = meta.alternates as { canonical: string; languages: Record<string, string> };
    expect(alternates.canonical).toMatch(/^https:\/\/nextwrld\.com\/(es|en)(\/|$)/);
    expect(alternates.languages.es).toMatch(/^https:\/\/nextwrld\.com\/es/);
    expect(alternates.languages.en).toMatch(/^https:\/\/nextwrld\.com\/en/);
    const og = meta.openGraph as { title?: string; locale?: string; type?: string };
    expect(og.title).toBeTruthy();
    expect(og.locale).toBe("es_ES");
    expect(meta.description).toBeTruthy();
    expect((meta.twitter as { card: string }).card).toBeTruthy();
  });

  it("uses the en_US Open Graph locale for english pages", async () => {
    const meta = await contactModule.generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    }) as Record<string, unknown>;
    expect((meta.openGraph as { locale: string }).locale).toBe("en_US");
  });
});

describe("seo helpers", () => {
  it("builds absolute localized urls and reciprocal alternates", () => {
    expect(localeUrl("es", "/contact")).toBe("https://nextwrld.com/es/contact");
    expect(localeUrl("en", "/")).toBe("https://nextwrld.com/en");
    const meta = buildPageMetadata({ locale: "es", path: "/pricing", title: "Precios", description: "d" });
    expect(meta.alternates?.canonical).toBe("https://nextwrld.com/es/pricing");
    expect((meta.alternates?.languages as Record<string, string>).en).toBe("https://nextwrld.com/en/pricing");
    expect((meta.openGraph as { locale: string }).locale).toBe("es_ES");
  });
});
