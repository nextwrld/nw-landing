export const HOMEPAGE_LOCALES = ["es", "en"] as const;

export type HomepageLocale = (typeof HOMEPAGE_LOCALES)[number];

export const APPROVAL_KEYS = [
  "navigationDestinations",
  "faqOwnership",
  "diagnosisProvider",
  "calendarHandoff",
  "privacyTreatment",
  "diagnosisOwnership",
  "evidenceAssets",
  "evidenceClaims",
  "evidenceDestinations",
] as const;

export type ApprovalKey = (typeof APPROVAL_KEYS)[number];

export type PublicationStatus = "draft" | "release";

export type ApprovalStatus = "pending" | "approved";

export interface PublicationConfig {
  status: PublicationStatus;
  approvals: Record<ApprovalKey, ApprovalStatus>;
}

export type EvidenceQualification = "verified" | "mvp";

export interface VerifiedCapabilities {
  aion: string[];
}

export interface EvidenceEntry {
  id: string;
  heading: string;
  qualification: EvidenceQualification;
  claimId: string;
  asset: string | null;
  destination: string | null;
  claim: string | null;
  approved: boolean;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  approved: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  destination: string | null;
  approved: boolean;
}

export interface SeoCopy {
  title: string;
  description: string;
}

export interface HomepageSection {
  id: string;
  heading: string;
}

export interface HomepageHero {
  id: "hero";
  eyebrow: string;
  h1: string;
  supporting: string;
  secondaryLine: string;
  primaryCta: string;
  secondaryCta: string;
  microcopy: string;
}

export interface HomepageEvidence {
  id: string;
  heading: string;
  items: EvidenceEntry[];
}

export interface HomepageContent {
  locale: HomepageLocale;
  seo: SeoCopy;
  nav: { items: NavItem[] };
  hero: HomepageHero;
  problem: HomepageSection;
  impact: HomepageSection;
  betterWay: HomepageSection;
  capabilities: HomepageSection;
  method: HomepageSection;
  differentiation: HomepageSection;
  evidence: HomepageEvidence;
  faq: { entries: FaqEntry[] };
  diagnosis: HomepageSection;
  finalCta: HomepageSection;
}
