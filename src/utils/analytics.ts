import type { Locale } from "@/i18n/config";

export const EVENT_NAMES = [
  "diagnosis_cta_click",
  "whatsapp_click",
  "calendar_click",
  "service_click",
  "case_click",
  "method_click",
  "contact_form_start",
  "contact_form_submit",
  "contact_form_success",
  "contact_form_error",
  "language_change",
] as const;

export type EventName = (typeof EVENT_NAMES)[number] | "calendar_booking_click";

export const DIAGNOSIS_CTA_LOCATIONS = ["header", "hero", "diagnosis_section"] as const;

export type DiagnosisCtaLocation = (typeof DIAGNOSIS_CTA_LOCATIONS)[number];

export type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  try {
    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
    dataLayer?.push({ event, ...params });
  } catch {
    // Analytics must degrade silently and never block navigation, forms, or assistive technology.
  }
}

export const EXTERNAL_ACTIVATION_EVENTS: ReadonlySet<EventName> = new Set([
  "whatsapp_click",
  "calendar_click",
]);

export function shouldTrackActivation(
  event: EventName,
  destination: string | undefined
): boolean {
  return !EXTERNAL_ACTIVATION_EVENTS.has(event) || Boolean(destination);
}

export function formEventParams(source: string, locale: string): EventParams {
  return { form_source: source, locale };
}

export function languageChangeParams(from: Locale, to: Locale, page: string): EventParams {
  return { from_locale: from, to_locale: to, page };
}
