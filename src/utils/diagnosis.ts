import type { DiagnosisContextCopy } from "@/content/homepage/types";

export type DiagnosisFormState =
  | "idle"
  | "editing"
  | "submitting"
  | "contextAccepted"
  | "submitError"
  | "handoffError";

export interface DiagnosisContextInput {
  fullName: string;
  company: string;
  email: string;
  operationArea: string;
  privacyAccepted: boolean;
  website?: string;
}

export type DiagnosisField =
  | "fullName"
  | "company"
  | "email"
  | "operationArea"
  | "privacyAccepted";

export type DiagnosisFieldErrors = Partial<Record<DiagnosisField, string>>;

export const DIAGNOSIS_SUBMIT_TIMEOUT_MS = 10000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDiagnosisContext(
  input: DiagnosisContextInput,
  copy: DiagnosisContextCopy
): DiagnosisFieldErrors {
  const errors: DiagnosisFieldErrors = {};
  if (!input.fullName.trim()) {
    errors.fullName = copy.fields.fullName.required;
  }
  if (!input.company.trim()) {
    errors.company = copy.fields.company.required;
  }
  if (!input.email.trim() || !EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = copy.fields.email.required;
  }
  if (!input.operationArea.trim()) {
    errors.operationArea = copy.fields.operationArea.required;
  }
  if (!input.privacyAccepted) {
    errors.privacyAccepted = copy.privacy.required;
  }
  return errors;
}

export interface DiagnosisFeedback {
  message: string;
  kind: "none" | "neutral" | "success" | "error";
}

export function resolveDiagnosisFeedback(
  state: DiagnosisFormState,
  copy: DiagnosisContextCopy
): DiagnosisFeedback {
  switch (state) {
    case "submitting":
      return { message: copy.statusSubmitting, kind: "neutral" };
    case "contextAccepted":
      return { message: copy.statusAccepted, kind: "success" };
    case "submitError":
      return { message: copy.statusSubmitError, kind: "error" };
    case "handoffError":
      return { message: copy.statusHandoffError, kind: "error" };
    default:
      return { message: "", kind: "none" };
  }
}

export type DiagnosisSubmitResult =
  | { ok: true }
  | { ok: false; kind: "rejected" }
  | { ok: false; kind: "unknown" };

export async function submitDiagnosisContext(
  input: DiagnosisContextInput
): Promise<DiagnosisSubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DIAGNOSIS_SUBMIT_TIMEOUT_MS);
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: "homepage_diagnosis" }),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { ok: false, kind: "rejected" };
    }
    return { ok: true };
  } catch {
    return { ok: false, kind: "unknown" };
  } finally {
    clearTimeout(timer);
  }
}
