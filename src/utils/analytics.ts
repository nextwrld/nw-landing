export type EventName =
  | "diagnosis_cta_click"
  | "calendar_booking_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error"
  | "case_view"
  | "language_change";

export type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event, ...params });
}
