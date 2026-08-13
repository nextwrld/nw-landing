import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  DEFAULT_APPROVALS,
  PublicationBlockedError,
  admitPublication,
  buildApprovals,
  getPublicationConfig,
  isCrmMvpSafe,
  validateDraft,
  validateEvidenceEntries,
  validateRelease,
  verifiedCapabilities,
} from "@/content/homepage/publication";
import {
  contentByLocale,
  getHomepageContent,
  validateContentParity,
} from "@/content/homepage";
import { APPROVAL_KEYS, HOMEPAGE_LOCALES } from "@/content/homepage/types";
import { buildHomepageMetadata, homepageSchema } from "@/utils/seo";
import { DIAGNOSIS_CTA_LOCATIONS, EVENT_NAMES, trackEvent } from "@/utils/analytics";
import * as homeModule from "@/app/[locale]/page";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const pageSource = readFileSync(new URL("../src/app/[locale]/page.tsx", import.meta.url), "utf8");
const preflightSource = readFileSync(
  new URL("../scripts/validate-experience-build.ts", import.meta.url),
  "utf8"
);

const withEnv = async (status: string | undefined, fn: () => Promise<void>) => {
  const previous = process.env.EXPERIENCE_PUBLICATION_STATUS;
  if (status === undefined) {
    delete process.env.EXPERIENCE_PUBLICATION_STATUS;
  } else {
    process.env.EXPERIENCE_PUBLICATION_STATUS = status;
  }
  try {
    await fn();
  } finally {
    if (previous === undefined) {
      delete process.env.EXPERIENCE_PUBLICATION_STATUS;
    } else {
      process.env.EXPERIENCE_PUBLICATION_STATUS = previous;
    }
  }
};

describe("ES/EN homepage content parity (HOMEPAGE-001)", () => {
  it("exposes both locales with an identical top-level shape", () => {
    expect(HOMEPAGE_LOCALES).toEqual(["es", "en"]);
    expect(Object.keys(contentByLocale).sort()).toEqual(["en", "es"]);
    expect(Object.keys(esContent).sort()).toEqual(Object.keys(enContent).sort());
  });

  it("passes content parity with no problems", () => {
    expect(validateContentParity()).toEqual([]);
  });

  it("provides one localized H1 per locale with equivalent meaning", () => {
    expect(esContent.hero.h1).toBe("Tu empresa no debería crecer multiplicando trabajo manual.");
    expect(enContent.hero.h1).toBe("Your company shouldn't grow by multiplying manual work.");
    expect(esContent.hero.h1.toLowerCase()).toContain("trabajo manual");
    expect(enContent.hero.h1.toLowerCase()).toContain("manual work");
  });

  it("flags a missing locale as a parity problem", () => {
    expect(validateContentParity({ es: esContent })).not.toEqual([]);
  });

  it("flags a locale without an H1 as a parity problem", () => {
    const broken = { ...enContent, hero: { ...enContent.hero, h1: "" } };
    expect(validateContentParity({ es: esContent, en: broken })).not.toEqual([]);
  });
});

describe("metadata and tracking contract (OBSERVABILITY-001)", () => {
  it("builds localized homepage metadata with canonical and reciprocal hreflang", () => {
    const meta = buildHomepageMetadata({
      locale: "es",
      seo: esContent.seo,
      image: "/images/hero/hero-image.jpg",
    });
    expect(meta.title).toEqual({ absolute: esContent.seo.title });
    expect(esContent.seo.title).toContain("Software a medida para empresas");
    expect(enContent.seo.title).toContain("Custom software for companies");
    const alternates = meta.alternates as { canonical: string; languages: Record<string, string> };
    expect(alternates.canonical).toBe("https://nextwrld.com/es");
    expect(alternates.languages.en).toBe("https://nextwrld.com/en");
    expect((meta.openGraph as { locale: string }).locale).toBe("es_ES");
  });

  it("publishes the approved homepage description per locale", () => {
    expect(esContent.seo.description).toBe(
      "Diseñamos software a medida para empresas que necesitan reducir procesos manuales, conectar herramientas y operar con más control."
    );
    expect(enContent.seo.description).not.toBe(esContent.seo.description);
    expect(enContent.seo.description.length).toBeGreaterThan(0);
  });

  it("includes only approved FAQ entries in the homepage schema", () => {
    for (const content of [esContent, enContent]) {
      const schema = homepageSchema(content);
      const faqPage = schema.find((entry) => entry["@type"] === "FAQPage") as {
        mainEntity: { name: string }[];
      };
      const approved = content.faq.entries.filter((entry) => entry.approved);
      expect(faqPage.mainEntity).toHaveLength(approved.length);
      const names = faqPage.mainEntity.map((question) => question.name);
      expect(names.some((name) => /pertenece|ownership|property/i.test(name))).toBe(false);
      expect(names).toContain(content.faq.entries.find((entry) => entry.id === "ai-use")!.question);
    }
  });

  it("exposes the complete required event vocabulary", () => {
    const required = [
      "diagnosis_cta_click",
      "whatsapp_click",
      "calendar_click",
      "service_view",
      "case_view",
      "insight_view",
      "contact_form_start",
      "contact_form_submit",
      "contact_form_success",
      "contact_form_error",
      "language_change",
    ];
    expect(EVENT_NAMES).toHaveLength(11);
    for (const event of required) {
      expect(EVENT_NAMES).toContain(event);
    }
  });

  it("distinguishes the four required diagnosis CTA locations", () => {
    expect(DIAGNOSIS_CTA_LOCATIONS).toEqual(["header", "hero", "diagnosis_section", "final"]);
  });

  it("keeps trackEvent a safe no-op without a browser window", () => {
    expect(() =>
      trackEvent("diagnosis_cta_click", { cta_location: "header", locale: "es" })
    ).not.toThrow();
  });
});

describe("draft retention and fail-closed release admission (PUBLICATION-001)", () => {
  it("keeps the Foundation composition in draft status", () => {
    expect(admitPublication({ status: "draft", approvals: DEFAULT_APPROVALS })).toBe("foundation");
    expect(() =>
      validateDraft({ status: "draft", approvals: DEFAULT_APPROVALS })
    ).not.toThrow();
  });

  it("rejects a release before emitting Experience output when approvals are pending", () => {
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: DEFAULT_APPROVALS });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PublicationBlockedError);
    expect((thrown as Error).message.length).toBeGreaterThan(0);
    expect((thrown as Error).message).toContain("blocked");
  });

  it("blocks release while any single approval remains pending", () => {
    for (const key of APPROVAL_KEYS) {
      const approvals = buildApprovals({ [key]: "pending" });
      let thrown: unknown;
      try {
        admitPublication({ status: "release", approvals });
      } catch (error) {
        thrown = error;
      }
      expect(thrown).toBeInstanceOf(PublicationBlockedError);
      expect((thrown as PublicationBlockedError).problems.some((problem) => problem.includes(key))).toBe(true);
    }
  });

  it("fails closed on placeholder evidence even with every approval granted", () => {
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: buildApprovals() });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PublicationBlockedError);
    const blocked = thrown as PublicationBlockedError;
    expect(blocked.problems.some((problem) => /not approved/i.test(problem))).toBe(true);
  });

  it("defaults the publication status to draft", async () => {
    await withEnv(undefined, async () => {
      expect(getPublicationConfig().status).toBe("draft");
    });
  });
});

describe("InmoCRM evidence stays MVP-safe (EVIDENCE-001)", () => {
  it("treats the rewritten InmoCRM markdown as MVP-safe in both locales", () => {
    const esDoc = readFileSync(
      new URL("../markdown/success-cases/es/crm.md", import.meta.url),
      "utf8"
    );
    const enDoc = readFileSync(
      new URL("../markdown/success-cases/en/crm.md", import.meta.url),
      "utf8"
    );
    expect(isCrmMvpSafe(esDoc)).toEqual([]);
    expect(isCrmMvpSafe(enDoc)).toEqual([]);
  });

  it("accepts research and design copy without unsupported claims", () => {
    const safe =
      "Problema: operaciones manuales. Diseño: plataforma modular. Investigación aplicada en ingeniería.";
    expect(isCrmMvpSafe(safe)).toEqual([]);
  });

  it("rejects production, achieved-result, deployment and scalability claims", () => {
    expect(isCrmMvpSafe("El sistema está en producción y escala con el negocio.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Deployments automatizados cada semana.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Resultados obtenidos: se redujo la carga manual.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Production platform with achieved results.").length).toBeGreaterThan(0);
  });

  it("enforces the AION allowlist and MVP qualification on approved evidence", () => {
    const aionApproved = {
      id: "aion",
      heading: "AION",
      qualification: "verified" as const,
      claimId: "aion-core",
      asset: "/images/experience/aion.png",
      destination: "/es",
      claim: "AION automatiza tareas verificadas",
      approved: true,
    };
    expect(validateEvidenceEntries([aionApproved], { aion: [] })).not.toEqual([]);
    expect(validateEvidenceEntries([aionApproved], { aion: ["aion-core"] })).toEqual([]);
  });

  it("rejects an approved mvp entry that claims production results", () => {
    const mvpWithProductionClaim = {
      id: "inmocrm",
      heading: "InmoCRM",
      qualification: "mvp" as const,
      claimId: "inmocrm",
      asset: "/images/blog/inmocrm-v2.jpg",
      destination: "/es/success-cases/crm",
      claim: "Plataforma en producción con resultados obtenidos",
      approved: true,
    };
    expect(validateEvidenceEntries([mvpWithProductionClaim], verifiedCapabilities)).not.toEqual([]);
  });
});

describe("build routing is fail-closed (BUILD-001)", () => {
  it("runs the experience preflight before the ordinary next build", () => {
    expect(pkg.scripts.build).toBe("pnpm validate:experience-build && next build");
    expect(pkg.scripts["validate:experience-build"]).toBe(
      "tsx scripts/validate-experience-build.ts"
    );
    expect(pkg.devDependencies.tsx).toBeTruthy();
  });

  it("routes the Vercel build through the fail-closed build command", () => {
    expect(vercel.buildCommand).toBe("pnpm build");
    expect(vercel.installCommand).toBe("pnpm install --frozen-lockfile");
  });

  it("makes the preflight exit nonzero when release admission is blocked", () => {
    expect(preflightSource).toContain("admitPublication");
    expect(preflightSource).toContain("process.exit");
  });

  it("validates a direct build through page composition", () => {
    expect(pageSource).toContain("admitPublication");
    expect(pageSource).toContain("getPublicationConfig");
  });

  it("rejects metadata generation for a blocked release before output", async () => {
    await withEnv("release", async () => {
      await expect(
        homeModule.generateMetadata({ params: Promise.resolve({ locale: "es" }) })
      ).rejects.toThrow(PublicationBlockedError);
    });
  });

  it("keeps metadata generation working for the draft Foundation", async () => {
    await withEnv("draft", async () => {
      const meta = (await homeModule.generateMetadata({
        params: Promise.resolve({ locale: "es" }),
      })) as { alternates?: { canonical?: string } };
      expect(meta.alternates?.canonical).toBe("https://nextwrld.com/es");
    });
  });

  it("resolves typed homepage content for both locales", () => {
    expect(getHomepageContent("es").locale).toBe("es");
    expect(getHomepageContent("en").locale).toBe("en");
  });
});
