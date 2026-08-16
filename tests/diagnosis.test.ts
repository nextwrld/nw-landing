import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";
import { homepageSchema } from "@/utils/seo";
import { parseContactPayload } from "@/utils/contact";
import {
  DIAGNOSIS_SUBMIT_TIMEOUT_MS,
  resolveDiagnosisFeedback,
  submitDiagnosisContext,
  validateDiagnosisContext,
  type DiagnosisContextInput,
} from "@/utils/diagnosis";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/utils/whatsapp";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const diagnosisSource = readFileSync(
  new URL("../src/components/HomeExperience/Diagnosis.tsx", import.meta.url),
  "utf8"
);
const faqSource = readFileSync(
  new URL("../src/components/HomeExperience/FAQ.tsx", import.meta.url),
  "utf8"
);
const finalCtaSource = readFileSync(
  new URL("../src/components/HomeExperience/FinalCTA.tsx", import.meta.url),
  "utf8"
);
const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);

const validDiagnosis = {
  fullName: "Ana Pérez",
  company: "Acme SA",
  email: "ana@acme.com",
  operationArea: "Ventas",
  privacyAccepted: true,
  source: "homepage_diagnosis",
};

const validDiagnosisContext: DiagnosisContextInput = {
  fullName: "Ana Pérez",
  company: "Acme SA",
  email: "ana@acme.com",
  operationArea: "Ventas",
  privacyAccepted: true,
};

describe("concrete diagnosis offer (DIAGNOSIS-01)", () => {
  it("offers a free 30–45 minute operational conversation in both locales", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.offer.duration).toContain("30");
      expect(content.diagnosis.offer.cost).toMatch(/gratuito|free|sin costo|no cost|no charge/i);
    }
  });

  it("keeps the offer focused on one concrete process, not a service demo", () => {
    expect(esContent.diagnosis.offer.focus).toContain("proceso");
    expect(enContent.diagnosis.offer.focus).toContain("process");
    expect(esContent.diagnosis.offer.focus).not.toBe(enContent.diagnosis.offer.focus);
  });

  it("states the no-obligation condition explicitly and equivalently across locales", () => {
    expect(esContent.diagnosis.offer.nonObligation).toMatch(/sin (compromiso|obligaci)/i);
    expect(enContent.diagnosis.offer.nonObligation).toMatch(/no (obligation|commitment)/i);
  });

  it("keeps the detailed mini-diagnosis deliverables conditional while ownership is unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.offer.deliverables.approved).toBe(false);
      expect(content.diagnosis.offer.deliverables.lines).toHaveLength(0);
    }
    expect(diagnosisSource).toContain("content.offer.deliverables.approved");
  });
});

describe("context-first diagnosis payload with homepage_diagnosis discriminator (DIAGNOSIS-02)", () => {
  it("accepts a valid homepage_diagnosis context payload and trims fields", () => {
    const result = parseContactPayload({
      ...validDiagnosis,
      fullName: "  Ana Pérez  ",
      email: "  ana@acme.com  ",
    });
    expect(result.ok).toBe(true);
    if (result.ok && result.data.source === "homepage_diagnosis") {
      expect(result.data.fullName).toBe("Ana Pérez");
      expect(result.data.company).toBe("Acme SA");
      expect(result.data.email).toBe("ana@acme.com");
      expect(result.data.operationArea).toBe("Ventas");
      expect(result.data.privacyAccepted).toBe(true);
    }
  });

  it("keeps the legacy diagnostico payload shape unchanged", () => {
    const result = parseContactPayload({
      fullName: "Ana Pérez",
      email: "ana@acme.com",
      phone: "+58 412 000 0000",
      message: "Quiero agendar un diagnóstico operativo",
      source: "diagnostico",
    });
    expect(result.ok).toBe(true);
    if (result.ok && result.data.source === "diagnostico") {
      expect(result.data.message).toBe("Quiero agendar un diagnóstico operativo");
    }
  });

  it.each<[Record<string, unknown>, string]>([
    [{ ...validDiagnosis, company: "" }, "missing company"],
    [{ ...validDiagnosis, operationArea: "" }, "missing operation area"],
    [{ ...validDiagnosis, privacyAccepted: false }, "unaccepted privacy"],
    [{ ...validDiagnosis, privacyAccepted: "yes" }, "non-boolean privacy"],
    [{ ...validDiagnosis, message: "Hola" }, "legacy-only message field"],
    [{ ...validDiagnosis, phone: "+58 412" }, "legacy-only phone field"],
    [{ ...validDiagnosis, source: "home" }, "wrong discriminator without message"],
  ])("rejects a malformed homepage_diagnosis payload: %s", (payload) => {
    const result = parseContactPayload(payload);
    expect(result.ok).toBe(false);
  });
});

describe("field-associated accessible diagnosis errors (DIAGNOSIS-03)", () => {
  it("identifies every required correction per field", () => {
    const errors = validateDiagnosisContext(
      {
        fullName: "",
        company: "",
        email: "not-an-email",
        operationArea: "",
        privacyAccepted: false,
      },
      esContent.diagnosis.context
    );
    expect(errors.fullName).toBeTruthy();
    expect(errors.company).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.operationArea).toBeTruthy();
    expect(errors.privacyAccepted).toBeTruthy();
  });

  it("clears all errors for a fully valid context", () => {
    const errors = validateDiagnosisContext(
      validDiagnosisContext,
      esContent.diagnosis.context
    );
    expect(errors).toEqual({});
  });

  it("keeps entered context bound to controlled inputs so corrections never discard it", () => {
    expect(diagnosisSource).toContain("value={context.fullName}");
    expect(diagnosisSource).toContain("value={context.company}");
    expect(diagnosisSource).toContain("value={context.email}");
    expect(diagnosisSource).toContain("value={context.operationArea}");
    expect(diagnosisSource).toContain("aria-invalid");
    expect(diagnosisSource).toContain("role=\"alert\"");
  });
});

describe("contact, calendar, and external recovery (DIAGNOSIS-04)", () => {
  it("returns a rejected result when the contact boundary rejects the context", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    try {
      const result = await submitDiagnosisContext(validDiagnosisContext);
      expect(result).toEqual({ ok: false, kind: "rejected" });
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("returns an unknown result when no provider confirmation arrives", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("The operation was aborted", "AbortError"))
    );
    try {
      const result = await submitDiagnosisContext(validDiagnosisContext);
      expect(result).toEqual({ ok: false, kind: "unknown" });
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("returns ok only when the contact boundary confirms success", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    try {
      const result = await submitDiagnosisContext(validDiagnosisContext);
      expect(result).toEqual({ ok: true });
      const init = fetchMock.mock.calls[0][1] as { body: string };
      expect(init.body).toContain("homepage_diagnosis");
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("never shows success or booking after a rejection or unknown state", () => {
    for (const state of ["submitError", "handoffError"] as const) {
      const feedback = resolveDiagnosisFeedback(state, esContent.diagnosis.context);
      expect(feedback.kind).toBe("error");
      expect(feedback.message.toLowerCase()).not.toMatch(
        /agendad|reservad|confirmad|booked|reserved|success/
      );
    }
    const accepted = resolveDiagnosisFeedback("contextAccepted", esContent.diagnosis.context);
    expect(accepted.kind).toBe("success");
    expect(accepted.message.toLowerCase()).not.toMatch(/agendad|reservad|booked|reserved/);
  });

  it("protects the context submission with a bounded timeout", () => {
    expect(DIAGNOSIS_SUBMIT_TIMEOUT_MS).toBeGreaterThan(0);
  });
});

describe("WhatsApp alternative (DIAGNOSIS-05)", () => {
  it("prefills a localized contextual message, not a generic information request", () => {
    const message = buildWhatsAppMessage(esContent.diagnosis.whatsapp.message, {
      company: "Acme SA",
      operationArea: "Ventas",
    });
    expect(message).toContain("Next Wrld");
    expect(message).toContain("Acme SA");
    expect(message).toContain("Ventas");
    expect(message.toLowerCase()).not.toContain("quiero más información");
  });

  it("withholds the WhatsApp CTA while no destination is approved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.whatsapp.enabled).toBe(false);
      expect(content.diagnosis.whatsapp.destination).toBeNull();
    }
    expect(diagnosisSource).toContain("content.whatsapp.destination");
  });

  it("builds a WhatsApp URL that encodes the prefilled contextual message", () => {
    const url = buildWhatsAppUrl("https://wa.me/5800000000", "Llegué desde Next Wrld");
    expect(url).toBe("https://wa.me/5800000000?text=Llegu%C3%A9%20desde%20Next%20Wrld");
  });
});

describe("provider-confirmed booking (DIAGNOSIS-06)", () => {
  it("never claims scheduling availability while the calendar handoff is unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.calendar.available).toBe(false);
      expect(content.diagnosis.calendar.availabilityClaim).toBeNull();
    }
    expect(diagnosisSource).toContain("content.calendar.available");
  });

  it("keeps the accepted-context message truthful without a booking promise", () => {
    const accepted = resolveDiagnosisFeedback("contextAccepted", esContent.diagnosis.context);
    expect(accepted.message).toBe(esContent.diagnosis.context.statusAccepted);
    expect(accepted.message.length).toBeGreaterThan(0);
  });
});

describe("privacy and legal publication blockers (DIAGNOSIS-07)", () => {
  it("keeps the software-ownership Q&A absent from FAQ content and schema", () => {
    for (const content of [esContent, enContent]) {
      expect(content.faq.entries.some((entry) => /pertenece|ownership|property/i.test(entry.question))).toBe(false);
      const schema = homepageSchema(content);
      const faqPage = schema.find((entry) => entry["@type"] === "FAQPage") as {
        mainEntity: { name: string }[];
      };
      expect(faqPage.mainEntity.some((q) => /pertenece|ownership|property/i.test(q.name))).toBe(false);
    }
  });

  it("keeps the privacy treatment disclosure withheld while it is unapproved", () => {
    for (const content of [esContent, enContent]) {
      expect(content.diagnosis.context.privacy.note).toBeNull();
    }
  });

  it("renders the final CTA converging on diagnosis without invented claims", () => {
    expect(esContent.finalCta.primaryCta).toContain("Analizar mi operación");
    expect(enContent.finalCta.primaryCta).toContain("Analyze my operation");
    expect(finalCtaSource).toContain("content.primaryCtaHref");
    expect(finalCtaSource).toContain("diagnosis_cta_click");
  });
});

describe("FAQ assistive-technology and no-enhancement fallback (DIAGNOSIS-08)", () => {
  it("renders disclosures through a native keyboard-operable element without animation", () => {
    expect(faqSource).toContain("<details");
    expect(faqSource).toContain("<summary");
    expect(faqSource).not.toContain("animation");
    expect(faqSource).not.toContain("transition");
  });

  it("keeps approved answers readable without client enhancement", () => {
    expect(faqSource).not.toContain("use client");
    expect(faqSource).toContain("content.entries.filter");
    expect(faqSource).toContain("entry.approved");
  });
});

describe("diagnosis section composition (DIAGNOSIS-09)", () => {
    it("composes the offer-only DiagnosisOffer on the homepage after evidence", () => {
      const evidence = experienceHomeSource.indexOf("<EvidenceSection");
      const offer = experienceHomeSource.indexOf("<DiagnosisOffer");
      expect(evidence).toBeGreaterThanOrEqual(0);
      expect(offer).toBeGreaterThanOrEqual(0);
      expect(evidence).toBeLessThan(offer);
      for (const retired of ["<Diagnosis ", "<Faq", "<FinalCTA"]) {
        expect(experienceHomeSource).not.toContain(retired);
      }
    });

    it("hosts the context-first Diagnosis form on the rebuilt /diagnostico page", () => {
      const pageSource = readFileSync(
        new URL("../src/app/[locale]/diagnostico/page.tsx", import.meta.url),
        "utf-8"
      );
      expect(pageSource).toContain('<Diagnosis content={getHomepageContent(l).diagnosis}');
    });
  });
