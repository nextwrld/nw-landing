import { getSuccessCaseBySlug } from "@/utils/markdown";
import { validateMetadataLocales } from "@/utils/seo";
import { contentByLocale, validateContentParity } from "./index";
import { loadEvidenceManifest, manifestEntryFor } from "./manifest";
import type { EvidenceManifest } from "./manifest";
import type {
  AionShowcase,
  ApprovalKey,
  ApprovalStatus,
  EvidenceEntry,
  PublicationConfig,
  VerifiedCapabilities,
} from "./types";
import { APPROVAL_KEYS, HOMEPAGE_LOCALES } from "./types";

export const DEFAULT_APPROVALS: Record<ApprovalKey, ApprovalStatus> = {
  navigationDestinations: "pending",
  faqOwnership: "pending",
  diagnosisProvider: "pending",
  calendarHandoff: "pending",
  privacyTreatment: "pending",
  diagnosisOwnership: "pending",
  evidenceAssets: "pending",
  evidenceClaims: "pending",
  evidenceDestinations: "pending",
};

export const verifiedCapabilities: VerifiedCapabilities = {
  aion: [],
};

export function buildApprovals(
  overrides: Partial<Record<ApprovalKey, ApprovalStatus>> = {}
): Record<ApprovalKey, ApprovalStatus> {
  const approvals = {} as Record<ApprovalKey, ApprovalStatus>;
  for (const key of APPROVAL_KEYS) {
    approvals[key] = overrides[key] ?? "approved";
  }
  return approvals;
}

export function getPublicationConfig(): PublicationConfig {
  const status: PublicationConfig["status"] =
    process.env.EXPERIENCE_PUBLICATION_STATUS === "release" ? "release" : "draft";
  return { status, approvals: { ...DEFAULT_APPROVALS } };
}

export class PublicationBlockedError extends Error {
  readonly problems: string[];

  constructor(problems: string[]) {
    super(`Experience publication blocked: ${problems.join("; ")}`);
    this.name = "PublicationBlockedError";
    this.problems = problems;
  }
}

const FORBIDDEN_CLAIM_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "production", pattern: /produccion|producci[oó]n|production/i },
  { label: "deployment", pattern: /deploy|despliegue/i },
  { label: "achieved-result", pattern: /resultados?\s+obtenidos|results?\s+achieved|achieved\s+results?/i },
  { label: "scalability", pattern: /escalab|scalab/i },
];

export function isCrmMvpSafe(content: string): string[] {
  const problems: string[] = [];
  for (const { label, pattern } of FORBIDDEN_CLAIM_PATTERNS) {
    if (pattern.test(content)) {
      problems.push(`unsupported ${label} claim`);
    }
  }
  return problems;
}

export const AION_UNSUPPORTED_METRIC_PATTERNS: RegExp[] = [
  /%/,
  /\b\d+(\.\d+)?\s*(%|x|×|hr|h|min|minutos?|horas?|d[ií]as?|semanas?|meses?)\b/i,
  /\b(usuarios?|users?|clientes?|customers?)\b/i,
  /\b(reducci[oó]n|reduced|ahorro|savings|incremento|increase)\b/i,
  /\b(resultados?\s+(obtenidos|medidos)|achieved)\b/i,
];

export function validateEvidenceManifest(manifest: EvidenceManifest): string[] {
  const problems: string[] = [];
  if (manifest.schemaVersion !== 1) {
    problems.push("Evidence manifest schemaVersion must be 1");
  }
  const ids = new Set<string>();
  const filenames = new Set<string>();
  for (const entry of manifest.entries) {
    if (!entry.id || ids.has(entry.id)) {
      problems.push(`Evidence manifest has a missing or duplicate id ${String(entry.id)}`);
    }
    ids.add(entry.id);
    if (!entry.filename || filenames.has(entry.filename)) {
      problems.push(`Evidence manifest has a missing or duplicate filename ${String(entry.filename)}`);
    }
    filenames.add(entry.filename);
    if (entry.status !== "placeholder" && entry.status !== "approved") {
      problems.push(`Evidence manifest entry ${entry.id} has an invalid status`);
    }
    if (entry.approved && entry.status !== "approved") {
      problems.push(`Evidence manifest entry ${entry.id} is approved but not marked approved`);
    }
    if (!entry.approved && entry.status === "approved") {
      problems.push(`Evidence manifest entry ${entry.id} is marked approved but approved=false`);
    }
  }
  return problems;
}

export function validateEvidenceApproval(
  entries: EvidenceEntry[],
  manifest: EvidenceManifest
): string[] {
  const problems: string[] = [];
  for (const entry of entries) {
    const listed = manifestEntryFor(manifest, entry.asset);
    if (entry.asset && !listed) {
      problems.push(`Evidence ${entry.id} asset ${entry.asset} is not listed in the evidence manifest`);
      continue;
    }
    if (!entry.approved) {
      problems.push(`Evidence ${entry.id} is not approved: placeholder evidence cannot release`);
      continue;
    }
    if (listed && (listed.status !== "approved" || !listed.approved)) {
      problems.push(`Evidence ${entry.id} asset ${entry.asset} is not approved in the evidence manifest`);
    }
  }
  return problems;
}

export function validateAionShowcase(
  showcase: AionShowcase,
  verified: VerifiedCapabilities,
  manifest: EvidenceManifest
): string[] {
  const problems: string[] = [];
  const listed = manifestEntryFor(manifest, showcase.asset);
  if (!listed) {
    problems.push(`AION showcase asset ${showcase.asset} is not listed in the evidence manifest`);
  }
  if (!showcase.approved) {
    problems.push("AION showcase is not approved: placeholder evidence cannot release");
    return problems;
  }
  if (listed && (listed.status !== "approved" || !listed.approved)) {
    problems.push(`AION showcase asset ${showcase.asset} is not approved in the evidence manifest`);
  }
  if (showcase.capabilities.length === 0) {
    problems.push("AION showcase must describe at least one verified capability before release");
  }
  const copy = [
    showcase.role,
    showcase.summary,
    showcase.statusNote,
    ...showcase.capabilities.map((capability) => capability.label),
  ].join(" ");
  for (const pattern of AION_UNSUPPORTED_METRIC_PATTERNS) {
    if (pattern.test(copy)) {
      problems.push("AION showcase contains an unsupported metric or outcome claim");
      break;
    }
  }
  for (const capability of showcase.capabilities) {
    if (!verified.aion.includes(capability.id)) {
      problems.push(`AION capability claim ${capability.id} is not allowlisted`);
    }
  }
  return problems;
}

export function validateEvidence(): string[] {
  const problems: string[] = [];
  for (const locale of HOMEPAGE_LOCALES) {
    const doc = getSuccessCaseBySlug("crm", locale, ["content"]);
    if (!doc || typeof doc.content !== "string" || doc.content.trim() === "") {
      problems.push(`InmoCRM evidence missing for locale ${locale}`);
      continue;
    }
    for (const problem of isCrmMvpSafe(doc.content)) {
      problems.push(`InmoCRM ${locale} not MVP-safe: ${problem}`);
    }
  }
  return problems;
}

export function validateEvidenceEntries(
  entries: EvidenceEntry[],
  verified: VerifiedCapabilities
): string[] {
  const problems: string[] = [];
  for (const entry of entries) {
    if (!entry.approved) {
      continue;
    }
    if (
      entry.qualification === "mvp" &&
      entry.claim &&
      /producc|produc|result|deploy|scalab|escalab/i.test(entry.claim)
    ) {
      problems.push(`Evidence ${entry.id} claim conflicts with mvp qualification`);
    }
    if (entry.qualification === "verified" && !verified.aion.includes(entry.claimId)) {
      problems.push(`AION claim id ${entry.claimId} is not allowlisted`);
    }
    if (!entry.asset || !entry.destination) {
      problems.push(`Approved evidence ${entry.id} lacks an asset or destination`);
    }
  }
  return problems;
}

export function validateDraft(config: PublicationConfig): string[] {
  return validateContentParity();
}

export function validateRelease(config: PublicationConfig): string[] {
  const problems = validateContentParity();
  for (const key of APPROVAL_KEYS) {
    if (config.approvals[key] !== "approved") {
      problems.push(`Approval pending: ${key}`);
    }
  }
  problems.push(...validateEvidence());
  const manifest = loadEvidenceManifest();
  problems.push(...validateEvidenceManifest(manifest));
  problems.push(...validateAionShowcase(contentByLocale.es.evidence.showcase, verifiedCapabilities, manifest));
  problems.push(...validateAionShowcase(contentByLocale.en.evidence.showcase, verifiedCapabilities, manifest));
  problems.push(...validateEvidenceApproval(contentByLocale.es.evidence.items, manifest));
  problems.push(...validateEvidenceApproval(contentByLocale.en.evidence.items, manifest));
  problems.push(...validateEvidenceEntries(contentByLocale.es.evidence.items, verifiedCapabilities));
  problems.push(...validateEvidenceEntries(contentByLocale.en.evidence.items, verifiedCapabilities));
  problems.push(...validateMetadataLocales());
  return problems;
}

export function admitPublication(
  config: PublicationConfig = getPublicationConfig()
): "foundation" | "experience" {
  if (config.status === "draft") {
    const problems = validateDraft(config);
    if (problems.length > 0) {
      throw new PublicationBlockedError(problems);
    }
    return "foundation";
  }
  const problems = validateRelease(config);
  if (problems.length > 0) {
    throw new PublicationBlockedError(problems);
  }
  return "experience";
}
