export const CONTACT_SOURCES = ["home", "contact", "diagnostico"] as const;

export type ContactSource = (typeof CONTACT_SOURCES)[number];

export interface ContactData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  source: ContactSource;
  website?: string;
}

export type ContactParseResult =
  | { ok: true; data: ContactData }
  | { ok: false; reason: string };

const ALLOWED_KEYS = ["fullName", "email", "phone", "message", "source", "website"] as const;
const FORBIDDEN_KEYS = ["__proto__", "constructor", "prototype"];

const MAX_FULL_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContactSource(value: unknown): value is ContactSource {
  return typeof value === "string" && (CONTACT_SOURCES as readonly string[]).includes(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

  const unknownKeys = Object.keys(input).filter(
    (key) => !(ALLOWED_KEYS as readonly string[]).includes(key)
  );
  if (unknownKeys.length > 0) {
    return { ok: false, reason: "Unexpected fields in request" };
  }

  const fullName = typeof input.fullName === "string" ? input.fullName.trim() : "";
  if (fullName.length === 0 || fullName.length > MAX_FULL_NAME) {
    return { ok: false, reason: "Invalid name" };
  }

  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (
    email.length === 0 ||
    email.length > MAX_EMAIL ||
    !EMAIL_PATTERN.test(email)
  ) {
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

  if (!isContactSource(input.source)) {
    return { ok: false, reason: "Invalid source" };
  }

  let website: string | undefined;
  if (typeof input.website === "string") {
    website = input.website;
  } else if (input.website !== undefined) {
    return { ok: false, reason: "Invalid website" };
  }

  return {
    ok: true,
    data: { fullName, email, phone, message, source: input.source, website },
  };
}