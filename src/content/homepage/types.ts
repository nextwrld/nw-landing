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

export interface AionCapability {
  id: string;
  label: string;
}

export interface AionShowcase {
  id: "aion";
  heading: string;
  role: string;
  summary: string;
  statusNote: string;
  asset: string;
  capabilities: AionCapability[];
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

export interface ProblemCard {
  id: string;
  title: string;
  body: string;
}

export interface HomepageProblem extends HomepageSection {
  intro: string;
  cards: ProblemCard[];
}

export interface ImpactCostPair {
  cause: string;
  effect: string;
}

export interface HomepageImpact extends HomepageSection {
  costPairs: ImpactCostPair[];
  closing: string;
}

export interface BeforeAfterItem {
  before: string;
  after: string;
}

export interface HomepageBetterWay extends HomepageSection {
  intro: string;
  beforeAfter: BeforeAfterItem[];
  closing: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  body: string;
  includes: string[];
  linkLabel: string;
}

export interface HomepageCapabilities extends HomepageSection {
  eyebrow: string;
  supporting: string;
  items: CapabilityItem[];
  aiTransversal: { heading: string; body: string };
}

export interface MethodStage {
  id: string;
  name: string;
  label: string;
  headline: string;
  copy: string;
  output: string;
}

export interface HomepageMethod extends HomepageSection {
  eyebrow: string;
  body: string;
  stages: MethodStage[];
  microcopy: string;
}

export interface DifferentiationPillar {
  id: string;
  title: string;
  body: string;
}

export interface HomepageDifferentiation extends HomepageSection {
  pillars: DifferentiationPillar[];
  optionalStatement: string;
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
  showcase: AionShowcase;
  items: EvidenceEntry[];
}

export interface DiagnosisOffer {
  duration: string;
  cost: string;
  focus: string;
  nonObligation: string;
  deliverables: { lines: string[]; approved: boolean };
}

export interface DiagnosisFieldCopy {
  label: string;
  placeholder: string;
  required: string;
}

export interface DiagnosisContextCopy {
  fields: {
    fullName: DiagnosisFieldCopy;
    company: DiagnosisFieldCopy;
    email: DiagnosisFieldCopy;
    operationArea: DiagnosisFieldCopy;
  };
  privacy: { consent: string; required: string; note: string | null };
  submitLabel: string;
  submittingLabel: string;
  statusSubmitting: string;
  statusAccepted: string;
  statusSubmitError: string;
  statusHandoffError: string;
  retryLabel: string;
  alternative: { label: string; href: string };
}

export interface DiagnosisWhatsApp {
  enabled: boolean;
  destination: string | null;
  message: string;
  label: string;
  leaveSiteNote: string;
}

export interface HomepageDiagnosis extends HomepageSection {
  offer: DiagnosisOffer;
  context: DiagnosisContextCopy;
  whatsapp: DiagnosisWhatsApp;
  calendar: { available: boolean; availabilityClaim: string | null };
}

export type HomepageFaq = HomepageSection & { entries: FaqEntry[] };

export interface HomepageFinalCta extends HomepageSection {
  primaryCta: string;
  primaryCtaHref: string;
  microcopy: string;
  secondaryCta: { label: string; destination: string | null; leaveSiteNote: string };
}

export interface HomepageContent {
  locale: HomepageLocale;
  seo: SeoCopy;
  nav: { items: NavItem[] };
  hero: HomepageHero;
  problem: HomepageProblem;
  impact: HomepageImpact;
  betterWay: HomepageBetterWay;
  capabilities: HomepageCapabilities;
  method: HomepageMethod;
  differentiation: HomepageDifferentiation;
  evidence: HomepageEvidence;
  faq: HomepageFaq;
  diagnosis: HomepageDiagnosis;
  finalCta: HomepageFinalCta;
}
