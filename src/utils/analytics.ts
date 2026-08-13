export const EVENT_NAMES = [
  "diagnosis_cta_click",
  "whatsapp_click",
  "calendar_click",
  "service_view",
  "case_view",
  "insight_view",
  "contact_form_start",
  "contact_form_submit",
  "contact_form_success",
  "contact_form_error",
  "language_change",
] as const;

export type EventName = (typeof EVENT_NAMES)[number] | "calendar_booking_click";

export const DIAGNOSIS_CTA_LOCATIONS = ["header", "hero", "diagnosis_section", "final"] as const;

export type DiagnosisCtaLocation = (typeof DIAGNOSIS_CTA_LOCATIONS)[number];

export type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event, ...params });
}
