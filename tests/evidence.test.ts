import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { contentByLocale } from "@/content/homepage";
import {
  AION_UNSUPPORTED_METRIC_PATTERNS,
  admitPublication,
  buildApprovals,
  isCrmMvpSafe,
  validateAionShowcase,
  validateEvidence,
  validateEvidenceApproval,
  validateEvidenceManifest,
} from "@/content/homepage/publication";
import {
  loadEvidenceManifest,
  manifestEntryFor,
  type EvidenceManifest,
} from "@/content/homepage/manifest";
import { loadEvidenceGate, resolveEntryLink } from "@/content/homepage/evidence";

const esContent = contentByLocale.es;
const enContent = contentByLocale.en;

const experienceHomeSource = readFileSync(
  new URL("../src/components/HomeExperience/ExperienceHome.tsx", import.meta.url),
  "utf8"
);
const cssSource = readFileSync(new URL("../src/styles/index.css", import.meta.url), "utf8");

const componentPaths = {
  aionProductShowcase: new URL(
    "../src/components/HomeExperience/AIONProductShowcase.tsx",
    import.meta.url
  ),
  caseEvidence: new URL("../src/components/HomeExperience/CaseEvidence.tsx", import.meta.url),
  evidenceSection: new URL(
    "../src/components/HomeExperience/EvidenceSection.tsx",
    import.meta.url
  ),
};

function readComponent(name: keyof typeof componentPaths): string {
  return existsSync(componentPaths[name]) ? readFileSync(componentPaths[name], "utf8") : "";
}

describe("AION product showcase with allowlisted claims (EVIDENCE-01)", () => {
  it("composes an AION showcase in both locales with a manifest-listed asset", () => {
    expect(esContent.evidence.showcase.heading).toBe("AION Wellness");
    expect(enContent.evidence.showcase.heading).toBe("AION Wellness");
    expect(esContent.evidence.showcase.role).toContain("PRODUCT BY NEXT WRLD");
    const manifest = loadEvidenceManifest();
    expect(manifestEntryFor(manifest, esContent.evidence.showcase.asset)).toBeTruthy();
    expect(manifestEntryFor(manifest, enContent.evidence.showcase.asset)).toBeTruthy();
  });

  it("keeps the AION showcase fail-closed while its asset is a placeholder", () => {
    const manifest = loadEvidenceManifest();
    const problems = validateAionShowcase(esContent.evidence.showcase, { aion: [] }, manifest);
    expect(problems.some((problem) => /not approved/i.test(problem))).toBe(true);
  });

  it("rejects an approved AION showcase with a non-allowlisted capability", () => {
    const manifest = loadEvidenceManifest();
    const showcase = {
      ...esContent.evidence.showcase,
      approved: true,
      capabilities: [{ id: "not-allowlisted", label: "Cualquier cosa" }],
    };
    const problems = validateAionShowcase(showcase, { aion: ["allowed-claim"] }, manifest);
    expect(problems.some((problem) => /not allowlisted/i.test(problem))).toBe(true);
  });

  it("rejects an approved AION showcase that claims unsupported metrics", () => {
    const manifest = loadEvidenceManifest();
    const showcase = {
      ...esContent.evidence.showcase,
      approved: true,
      summary: "AION reduce un 30% el trabajo manual.",
    };
    const problems = validateAionShowcase(showcase, { aion: ["allowed-claim"] }, manifest);
    expect(problems.some((problem) => /unsupported metric/i.test(problem))).toBe(true);
  });

  it("exposes the AION unsupported-metric patterns for claim screening", () => {
    expect(AION_UNSUPPORTED_METRIC_PATTERNS.length).toBeGreaterThan(0);
  });

  it("renders the AION showcase visual from the placeholder manifest", () => {
    expect(readComponent("aionProductShowcase")).toContain("showcase.asset");
    expect(readComponent("aionProductShowcase")).toContain("manifestEntryFor");
    expect(readComponent("aionProductShowcase")).toContain("/images/experience/");
    expect(readComponent("evidenceSection")).toContain('from "./AIONProductShowcase"');
  });
});

describe("JFHP and automation support evidence (EVIDENCE-02)", () => {
  it("lists JFHP and automation evidence in both locales", () => {
    const esIds = esContent.evidence.items.map((entry) => entry.id);
    const enIds = enContent.evidence.items.map((entry) => entry.id);
    expect(esIds).toContain("jfhp");
    expect(esIds).toContain("automation");
    expect(enIds).toContain("jfhp");
    expect(enIds).toContain("automation");
    expect(esIds).toEqual(enIds);
  });

  it("points every support card at a placeholder asset listed in the manifest", () => {
    const manifest = loadEvidenceManifest();
    for (const content of [esContent, enContent]) {
      for (const entry of content.evidence.items) {
        expect(entry.asset).toBeTruthy();
        expect(manifestEntryFor(manifest, entry.asset)).toBeDefined();
      }
    }
  });

  it("keeps placeholder support cards unapproved and link-free", () => {
    const gate = loadEvidenceGate();
    for (const entry of esContent.evidence.items) {
      expect(entry.approved).toBe(false);
      expect(resolveEntryLink(entry, gate)).toBeNull();
    }
  });

  it("composes the case-evidence cards component", () => {
    expect(readComponent("caseEvidence")).toContain("content.items.map");
    expect(readComponent("caseEvidence")).toContain("resolveEntryLink");
    expect(readComponent("evidenceSection")).toContain('from "./CaseEvidence"');
  });
});

describe("InmoCRM is an MVP in both locales (EVIDENCE-03)", () => {
  it("keeps the rewritten InmoCRM markdown MVP-safe in ES and EN", () => {
    expect(validateEvidence()).toEqual([]);
  });

  it("rejects production, deployment, achieved-result, and scalability claims", () => {
    expect(isCrmMvpSafe("El sistema está en producción.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Deployments automatizados.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Resultados obtenidos.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Plataforma escalable.").length).toBeGreaterThan(0);
    expect(isCrmMvpSafe("Production platform.").length).toBeGreaterThan(0);
  });

  it("qualifies the InmoCRM homepage entry as an MVP in both locales", () => {
    const esInmo = esContent.evidence.items.find((entry) => entry.id === "inmocrm");
    const enInmo = enContent.evidence.items.find((entry) => entry.id === "inmocrm");
    expect(esInmo?.qualification).toBe("mvp");
    expect(enInmo?.qualification).toBe("mvp");
  });
});

describe("withholding and release fail-closed (EVIDENCE-04)", () => {
  it("keeps the release fail-closed while evidence is placeholder, even with all approvals granted", () => {
    let thrown: unknown;
    try {
      admitPublication({ status: "release", approvals: buildApprovals() });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(Error);
    expect(String((thrown as Error).message)).toMatch(/not approved/i);
  });

  it("withholds the InmoCRM link while the case is not approved", () => {
    const gate = loadEvidenceGate();
    const esInmo = esContent.evidence.items.find((entry) => entry.id === "inmocrm")!;
    const enInmo = enContent.evidence.items.find((entry) => entry.id === "inmocrm")!;
    expect(resolveEntryLink(esInmo, gate)).toBeNull();
    expect(resolveEntryLink(enInmo, gate)).toBeNull();
  });

  it("withholds the InmoCRM link in both locales when either locale is incompatible", () => {
    const gate = loadEvidenceGate();
    const esInmo = esContent.evidence.items.find((entry) => entry.id === "inmocrm")!;
    const enInmo = enContent.evidence.items.find((entry) => entry.id === "inmocrm")!;
    const unsafeGate = { ...gate, crmSafe: false };
    expect(resolveEntryLink(esInmo, unsafeGate)).toBeNull();
    expect(resolveEntryLink(enInmo, unsafeGate)).toBeNull();
  });

  it("reveals the case link only when the entry is approved, the asset is approved, and the locale is MVP-safe", () => {
    const approvedManifest: EvidenceManifest = {
      schemaVersion: 1,
      entries: [
        { id: "inmocrm", filename: "inmocrm-mvp.svg", alt: "", status: "approved", approved: true },
      ],
    };
    const approvedEntry = {
      id: "inmocrm",
      heading: "InmoCRM",
      qualification: "mvp" as const,
      claimId: "inmocrm",
      asset: "inmocrm-mvp.svg",
      destination: "/es/success-cases/crm",
      claim: "InmoCRM: MVP en desarrollo.",
      approved: true,
    };
    const gate = { crmSafe: true, manifest: approvedManifest };
    expect(resolveEntryLink(approvedEntry, gate)).toBe("/es/success-cases/crm");
    expect(resolveEntryLink({ ...approvedEntry, approved: false }, gate)).toBeNull();
    expect(resolveEntryLink({ ...approvedEntry, destination: null }, gate)).toBeNull();
    expect(resolveEntryLink(approvedEntry, { ...gate, crmSafe: false })).toBeNull();
  });

  it("stacks the evidence cards on mobile without a carousel", () => {
    expect(cssSource).toContain(".evidence-cards");
    expect(cssSource).toContain("@media (min-width");
  });
});
