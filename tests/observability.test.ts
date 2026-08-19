import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";
import { buildApprovals, validateRelease } from "@/content/homepage/publication";
import {
  formEventParams,
  languageChangeParams,
  shouldTrackActivation,
  trackEvent,
} from "@/utils/analytics";
import {
  homepageSchema,
  validateCanonicalAndHreflang,
  validateMetadataLocales,
} from "@/utils/seo";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const diagnosisSource = readFileSync(
  new URL("../src/components/HomeExperience/Diagnosis.tsx", import.meta.url),
  "utf8"
);
const trackedLinkSource = readFileSync(
  new URL("../src/components/Common/TrackedLink.tsx", import.meta.url),
  "utf8"
);
const selectorSource = readFileSync(
  new URL("../src/components/LanguageSelector/index.tsx", import.meta.url),
  "utf8"
);
const publicationSource = readFileSync(
  new URL("../src/content/homepage/publication.ts", import.meta.url),
  "utf8"
);
const pageSource = readFileSync(new URL("../src/app/[locale]/page.tsx", import.meta.url), "utf8");
const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);

const withSiteUrl = async (value: string | undefined, fn: () => void) => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = value;
  }
  try {
    fn();
  } finally {
    if (previous === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previous;
    }
  }
};

describe("privacy: event payloads exclude entered values (OBSERVABILITY-002)", () => {
  it("builds form lifecycle params from only the approved non-personal categorical keys", () => {
    expect(formEventParams("homepage_diagnosis", "es")).toEqual({
      form_source: "homepage_diagnosis",
      locale: "es",
    });
    expect(formEventParams("homepage_diagnosis", "en")).toEqual({
      form_source: "homepage_diagnosis",
      locale: "en",
    });
    expect(Object.keys(formEventParams("home", "es"))).toEqual(["form_source", "locale"]);
  });

  it("routes every diagnosis form lifecycle event through the privacy-safe params builder", () => {
    expect(
      diagnosisSource
    ).toContain('trackEvent("contact_form_start", formEventParams(DIAGNOSIS_FORM_SOURCE, locale))');
    expect(
      diagnosisSource
    ).toContain('trackEvent("contact_form_submit", formEventParams(DIAGNOSIS_FORM_SOURCE, locale))');
    expect(
      diagnosisSource
    ).toContain('trackEvent("contact_form_success", formEventParams(DIAGNOSIS_FORM_SOURCE, locale))');
    expect(
      diagnosisSource
    ).toContain('trackEvent("contact_form_error", formEventParams(DIAGNOSIS_FORM_SOURCE, locale))');
  });

  it("never embeds entered operational or contact context inside a tracked event", () => {
    const trackEventCalls = diagnosisSource.match(/trackEvent\([^)]*\)/g) ?? [];
    expect(trackEventCalls.length).toBeGreaterThanOrEqual(4);
    for (const call of trackEventCalls) {
      expect(call).not.toContain("context.");
    }
  });

  it("keeps external-activation event params free of entered context in both locales", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.whatsapp.destination).toBeNull();
    }
    expect(diagnosisSource).toContain('event="whatsapp_click"');
    expect(diagnosisSource).toContain('cta_location: "diagnosis_section"');
  });
});

describe("consent and analytics failure resilience (OBSERVABILITY-003)", () => {
  it("stays a safe no-op without a browser window", () => {
    expect(() =>
      trackEvent("diagnosis_cta_click", { cta_location: "header", locale: "es" })
    ).not.toThrow();
  });

  it("pushes the event and its params into the dataLayer", () => {
    const events: unknown[] = [];
    vi.stubGlobal("window", { dataLayer: events });
    try {
      trackEvent("diagnosis_cta_click", { cta_location: "header", locale: "es" });
      expect(events).toEqual([{ event: "diagnosis_cta_click", cta_location: "header", locale: "es" }]);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("degrades silently when the dataLayer push throws, so navigation and forms are never blocked", () => {
    vi.stubGlobal("window", {
      dataLayer: {
        push: () => {
          throw new Error("consent platform blocked");
        },
      },
    });
    try {
      expect(() =>
        trackEvent("contact_form_submit", { form_source: "homepage_diagnosis", locale: "es" })
      ).not.toThrow();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("no-ops when no dataLayer exists", () => {
    vi.stubGlobal("window", {});
    try {
      expect(() => trackEvent("whatsapp_click", { cta_location: "diagnosis_section", locale: "es" })).not.toThrow();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("withheld schema and events for blocked elements (OBSERVABILITY-004)", () => {
  it("emits only FAQ schema backed by approved visible content in both locales", () => {
    for (const content of [esContent, enContent]) {
      const schema = homepageSchema(content);
      expect(schema).toHaveLength(1);
      const serialized = JSON.stringify(schema);
      for (const blocked of ["JFHP", "InmoCRM", "aion", "placeholder", "pendiente", "calend"]) {
        expect(serialized).not.toContain(blocked);
      }
      const faqPage = schema[0] as { "@type": string; mainEntity: { name: string }[] };
      expect(faqPage["@type"]).toBe("FAQPage");
      expect(faqPage.mainEntity).toHaveLength(content.faq.entries.filter((entry) => entry.approved).length);
    }
  });

  it("owns the structured-data emission at the page layer so a blocked release can never serve schema", () => {
    expect(pageSource).toContain("application/ld+json");
    expect(pageSource).toContain("homepageSchema(");
    expect(experienceHomeSource).not.toContain("homepageSchema");
  });

  it("keeps calendar and WhatsApp destinations withheld so no destination event can represent them", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.calendar.available).toBe(false);
      expect(content.diagnosis.calendar.availabilityClaim).toBeNull();
      expect(content.diagnosis.whatsapp.destination).toBeNull();
      expect(content.finalCta.secondaryCta.destination).toBeNull();
    }
    expect(diagnosisSource).toContain("content.whatsapp.destination ?");
    expect(diagnosisSource).toContain("content.calendar.available");
  });
});

describe("invalid canonical and hreflang rejection (OBSERVABILITY-005)", () => {
  it("accepts a valid self-canonical homepage with reciprocal hreflang for both locales", () => {
    expect(validateCanonicalAndHreflang({ locale: "es", path: "/" })).toEqual([]);
    expect(validateCanonicalAndHreflang({ locale: "en", path: "/" })).toEqual([]);
  });

  it("rejects a canonical that points off the public site origin", () => {
    expect(
      validateCanonicalAndHreflang({
        locale: "es",
        path: "/",
        canonical: "https://not-nextwrld.example/es",
        languages: { es: "https://not-nextwrld.example/es", en: "https://not-nextwrld.example/en" },
      })
    ).not.toEqual([]);
  });

  it("rejects a canonical that does not match the public locale URL", () => {
    expect(
      validateCanonicalAndHreflang({ locale: "es", path: "/", canonical: "https://nextwrld.com/en" })
    ).not.toEqual([]);
  });

  it("rejects missing reciprocal hreflang alternates", () => {
    expect(
      validateCanonicalAndHreflang({
        locale: "es",
        path: "/",
        languages: { es: "https://nextwrld.com/es" },
      })
    ).not.toEqual([]);
  });

  it("rejects an unsupported locale", () => {
    expect(validateCanonicalAndHreflang({ locale: "fr" as never, path: "/" })).not.toEqual([]);
  });

  it("validates the real homepage metadata for both locales", async () => {
    await withSiteUrl(undefined, () => {
      expect(validateMetadataLocales()).toEqual([]);
    });
  });

  it("flags metadata that points to a non-public origin", () => {
    expect(validateMetadataLocales({ baseUrl: "https://not-nextwrld.example" })).not.toEqual([]);
  });

  it("makes the release gate block when the public site origin is invalid", async () => {
    await withSiteUrl("https://not-nextwrld.example", () => {
      const problems = validateRelease({ status: "release", approvals: buildApprovals() });
      expect(problems.some((problem) => /origin|canonical|hreflang|alternate/i.test(problem))).toBe(true);
    });
  });

  it("wires the metadata validation into the release validator", () => {
    expect(publicationSource).toContain("validateMetadataLocales");
  });
});

describe("intentional external activation only (OBSERVABILITY-006)", () => {
  it("does not fire external-activation events without an approved destination", () => {
    expect(shouldTrackActivation("whatsapp_click", undefined)).toBe(false);
    expect(shouldTrackActivation("calendar_click", undefined)).toBe(false);
    expect(shouldTrackActivation("whatsapp_click", null as unknown as string)).toBe(false);
  });

  it("fires external-activation events only on approved destination activation", () => {
    expect(shouldTrackActivation("whatsapp_click", "https://wa.me/5800000000")).toBe(true);
    expect(shouldTrackActivation("calendar_click", "https://cal.com/nextwrld")).toBe(true);
  });

  it("never blocks internal navigation events", () => {
    expect(shouldTrackActivation("diagnosis_cta_click", undefined)).toBe(true);
    expect(shouldTrackActivation("diagnosis_cta_click", "#diagnosis")).toBe(true);
  });

  it("gates tracked links on the approved destination before firing", () => {
    expect(trackedLinkSource).toContain("shouldTrackActivation(");
  });
});

describe("language-switch context preservation (OBSERVABILITY-007)", () => {
  it("records source, target, and location for a language change", () => {
    expect(languageChangeParams("es", "en", "/es")).toEqual({
      from_locale: "es",
      to_locale: "en",
      page: "/es",
    });
    expect(languageChangeParams("en", "es", "/en/success-cases/crm")).toEqual({
      from_locale: "en",
      to_locale: "es",
      page: "/en/success-cases/crm",
    });
  });

  it("routes the language switch event through the context-preserving params builder", () => {
    expect(selectorSource).toContain("languageChangeParams(locale, target, pathname)");
  });

  it("preserves the equivalent page context on locale navigation", () => {
    expect(selectorSource).toContain("const { search, hash } = window.location;");
    expect(selectorSource).toContain("router.push(`${path}${search}${hash}`)");
  });

  it("never records a diagnosis conversion when switching language", () => {
    expect(selectorSource).not.toContain("diagnosis_cta_click");
    expect(selectorSource).not.toContain("homepage_diagnosis");
    expect(selectorSource).not.toContain("contact_form");
  });
});
