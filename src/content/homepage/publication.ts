import { getSuccessCaseBySlug } from "@/utils/markdown";
import { validateMetadataLocales } from "@/utils/seo";
import { publishedRoutes, routeFromDestination } from "@/content/sections";
import { contentByLocale, validateContentParity } from "./index";
import { loadEvidenceManifest, manifestEntryFor } from "./manifest";
import type { EvidenceManifest } from "./manifest";
import type {
  AionShowcase,
  ApprovalKey,
  ApprovalStatus,
  EvidenceEntry,
  HomepageContent,
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
    process.env.EXPERIENCE_PREVIEW === "true"
      ? "preview"
      : process.env.EXPERIENCE_PUBLICATION_STATUS === "release"
        ? "release"
        : "draft";
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

/**
 * The V3 skeleton is complete when the ES content contract is sound and every
 * approved ES nav/CTA destination resolves to a published, content-complete
 * section route (EN stays withheld until approved copy exists).
 */
export function isV3SkeletonReady(): boolean {
  if (validateContentParity().length > 0) {
    return false;
  }
  if (validateRouteExistence("es").length > 0 || validateNoEmptyContent("es").length > 0) {
    return false;
  }
  return true;
}

export function validateDraft(config: PublicationConfig): string[] {
  return validateContentParity();
}

/**
 * Every approved nav/footer/CTA destination of a locale must resolve to a
 * registered section route (no anchors, no speculative paths). EN stays
 * fail-closed while its registry is empty: approved EN destinations that
 * have no published route are reported, which is what keeps release
 * blocked until EN content is approved.
 */
export function validateRouteExistence(
  locale: (typeof HOMEPAGE_LOCALES)[number],
  content: HomepageContent = contentByLocale[locale]
): string[] {
  const problems: string[] = [];
  const published = publishedRoutes(locale);
  const destinations = navDestinations(content);
  for (const destination of destinations) {
    const route = routeFromDestination(destination);
    if (route === null) {
      problems.push(`Route problem: destination ${destination} is an anchor or an unknown route`);
      continue;
    }
    if (!published.includes(route)) {
      problems.push(`Route problem: destination ${destination} is not a published route for ${locale}`);
    }
  }
  return problems;
}

/**
 * No approved nav/CTA destination may point at a route whose content is not
 * approved (the "never link to empty content" rule). Withheld routes such as
 * /es/insights fail any release that links to them.
 */
export function validateNoEmptyContent(
  locale: (typeof HOMEPAGE_LOCALES)[number],
  content: HomepageContent = contentByLocale[locale]
): string[] {
  const problems: string[] = [];
  const published = publishedRoutes(locale);
  for (const item of flattenNav(content)) {
    if (!item.approved || !item.destination) {
      continue;
    }
    const route = routeFromDestination(item.destination);
    if (route === null) {
      problems.push(`Destination ${item.destination} is an anchor or an unknown route`);
      continue;
    }
    if (!published.includes(route)) {
      problems.push(`Destination ${item.destination} links to route ${route} which is not approved for ${locale}`);
    }
  }
  return problems;
}

function flattenNav(content: HomepageContent): HomepageContent["nav"]["items"] {
  return content.nav.items.flatMap((item) =>
    item.children && item.children.length > 0 ? item.children : [item]
  );
}

function navDestinations(content: HomepageContent): string[] {
  const destinations: string[] = [];
  for (const item of content.nav.items) {
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.destination) destinations.push(child.destination);
      }
    } else if (item.destination) {
      destinations.push(item.destination);
    }
  }
  const ctaDestinations = [content.hero.secondaryCtaHref, content.finalCta.primaryCtaHref];
  for (const destination of ctaDestinations) {
    if (destination) destinations.push(destination);
  }
  return destinations;
}

export function validateRelease(config: PublicationConfig): string[] {
  const problems = validateContentParity();
  for (const key of APPROVAL_KEYS) {
    if (config.approvals[key] !== "approved") {
      problems.push(`Approval pending: ${key}`);
    }
  }
  for (const locale of HOMEPAGE_LOCALES) {
    problems.push(...validateRouteExistence(locale));
    problems.push(...validateNoEmptyContent(locale));
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

export type AdmissionComposition =
  | { composition: "foundation" }
  | { composition: "v3-skeleton"; content: HomepageContent }
  | { composition: "v3-release"; content: HomepageContent };

/**
 * V3 admission union. Draft and preview keep the Foundation composition
 * while the V3 skeleton is incomplete; `skeletonComplete: true` admits the
 * complete skeleton (Fase 1 gate); release stays fail-closed on approvals,
 * evidence, metadata, and route/no-empty-content checks.
 */
export function admitPublication(
  config: PublicationConfig = getPublicationConfig(),
  options: { skeletonComplete?: boolean } = {}
): AdmissionComposition {
  if (config.status === "release") {
    const problems = validateRelease(config);
    if (problems.length > 0) {
      throw new PublicationBlockedError(problems);
    }
    return { composition: "v3-release", content: contentByLocale.es };
  }
  if (options.skeletonComplete) {
    const problems = validateDraft(config);
    if (problems.length > 0) {
      throw new PublicationBlockedError(problems);
    }
    return { composition: "v3-skeleton", content: contentByLocale.es };
  }
  const problems = validateDraft(config);
  if (problems.length > 0) {
    throw new PublicationBlockedError(problems);
  }
  return { composition: "foundation" };
}
