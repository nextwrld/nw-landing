export const LEGACY_CONTACT_SOURCES = ["home", "contact", "diagnostico"] as const;

export type LegacyContactSource = (typeof LEGACY_CONTACT_SOURCES)[number];

export const CONTACT_SOURCES = [...LEGACY_CONTACT_SOURCES, "homepage_diagnosis"] as const;

export type ContactSource = (typeof CONTACT_SOURCES)[number];

export interface LegacyContactData {
  source: LegacyContactSource;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  website?: string;
}

export interface HomepageDiagnosisData {
  source: "homepage_diagnosis";
  fullName: string;
  company: string;
  email: string;
  operationArea: string;
  privacyAccepted: true;
  website?: string;
}

export type ContactData = LegacyContactData | HomepageDiagnosisData;

export type ContactParseResult =
  | { ok: true; data: ContactData }
  | { ok: false; reason: string };

const LEGACY_ALLOWED_KEYS = [
  "fullName",
  "email",
  "phone",
  "message",
  "source",
  "website",
] as const;
const DIAGNOSIS_ALLOWED_KEYS = [
  "fullName",
  "company",
  "email",
  "operationArea",
  "privacyAccepted",
  "source",
  "website",
] as const;
const FORBIDDEN_KEYS = ["__proto__", "constructor", "prototype"];

const MAX_FULL_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;
const MAX_COMPANY = 200;
const MAX_OPERATION_AREA = 200;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContactSource(value: unknown): value is ContactSource {
  return typeof value === "string" && (CONTACT_SOURCES as readonly string[]).includes(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function rejectUnknownKeys(
  input: Record<string, unknown>,
  allowed: readonly string[]
): string | null {
  const unknownKeys = Object.keys(input).filter((key) => !(allowed as readonly string[]).includes(key));
  if (unknownKeys.length > 0) {
    return "Unexpected fields in request";
  }
  return null;
}

function parseEmail(input: Record<string, unknown>): string | null {
  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (email.length === 0 || email.length > MAX_EMAIL || !EMAIL_PATTERN.test(email)) {
    return null;
  }
  return email;
}

function parseLegacyContactPayload(input: Record<string, unknown>): ContactParseResult {
  const unknown = rejectUnknownKeys(input, LEGACY_ALLOWED_KEYS);
  if (unknown) {
    return { ok: false, reason: unknown };
  }

  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  if (fullName.length === 0 || fullName.length > MAX_FULL_NAME) {
    return { ok: false, reason: "Invalid name" };
  }

  const email = parseEmail(input);
  if (email === null) {
    return { ok: false, reason: "Invalid email" };
  }

  let phone: string | undefined;
  if (typeof input.phone === "string" && input.phone.trim() !== "") {
    phone = input.phone.trim();
    if (phone.length > MAX_PHONE) {
      return { ok: false, reason: "Invalid phone" };
    }
  } else if (input.phone !== undefined && input.phone !== null && typeof input.phone !== "string") {
    return { ok: false, reason: "Invalid phone" };
  }

  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (message.length === 0 || message.length > MAX_MESSAGE) {
    return { ok: false, reason: "Invalid message" };
  }

  let website: string | undefined;
  if (typeof input.website === "string") {
    website = input.website;
  } else if (input.website !== undefined) {
    return { ok: false, reason: "Invalid website" };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      message,
      source: input.source as LegacyContactSource,
      website,
    },
  };
}

function parseHomepageDiagnosisPayload(input: Record<string, unknown>): ContactParseResult {
  const unknown = rejectUnknownKeys(input, DIAGNOSIS_ALLOWED_KEYS);
  if (unknown) {
    return { ok: false, reason: unknown };
  }

  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  if (fullName.length === 0 || fullName.length > MAX_FULL_NAME) {
    return { ok: false, reason: "Invalid name" };
  }

  const company = typeof input.company === "string" ? input.company.trim() : "";
  if (company.length === 0 || company.length > MAX_COMPANY) {
    return { ok: false, reason: "Invalid company" };
  }

  const email = parseEmail(input);
  if (email === null) {
    return { ok: false, reason: "Invalid email" };
  }

  const operationArea =
    typeof input.operationArea === "string" ? input.operationArea.trim() : "";
  if (operationArea.length === 0 || operationArea.length > MAX_OPERATION_AREA) {
    return { ok: false, reason: "Invalid operation area" };
  }

  if (input.privacyAccepted !== true) {
    return { ok: false, reason: "Privacy must be accepted" };
  }

  let website: string | undefined;
  if (typeof input.website === "string") {
    website = input.website;
  } else if (input.website !== undefined) {
    return { ok: false, reason: "Invalid website" };
  }

  return {
    ok: true,
    data: {
      source: "homepage_diagnosis",
      fullName,
      company,
      email,
      operationArea,
      privacyAccepted: true,
      website,
    },
  };
}

export function parseContactPayload(input: unknown): ContactParseResult {
  if (!isPlainObject(input)) {
    return { ok: false, reason: "Invalid request payload" };
  }

  for (const key of Object.keys(input)) {
    if (FORBIDDEN_KEYS.includes(key)) {
      return { ok: false, reason: "Invalid request payload" };
    }
  }

  if (!isContactSource(input.source)) {
    return { ok: false, reason: "Invalid source" };
  }

  if (input.source === "homepage_diagnosis") {
    return parseHomepageDiagnosisPayload(input);
  }

  return parseLegacyContactPayload(input);
}
