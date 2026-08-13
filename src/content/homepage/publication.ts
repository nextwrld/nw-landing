import { getSuccessCaseBySlug } from "@/utils/markdown";
import { contentByLocale, validateContentParity } from "./index";
import type {
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
  problems.push(...validateEvidenceEntries(contentByLocale.es.evidence.items, verifiedCapabilities));
  problems.push(...validateEvidenceEntries(contentByLocale.en.evidence.items, verifiedCapabilities));
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
