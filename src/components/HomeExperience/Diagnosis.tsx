"use client";
import { useRef, useState } from "react";
import TrackedLink from "@/components/Common/TrackedLink";
import type { Locale } from "@/i18n/config";
import type { HomepageDiagnosis } from "@/content/homepage/types";
import { formEventParams, trackEvent } from "@/utils/analytics";
import {
  resolveDiagnosisFeedback,
  submitDiagnosisContext,
  validateDiagnosisContext,
  type DiagnosisFieldErrors,
  type DiagnosisFormState,
} from "@/utils/diagnosis";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/utils/whatsapp";

const DIAGNOSIS_FORM_SOURCE = "homepage_diagnosis" as const;

const EMPTY_CONTEXT = {
  fullName: "",
  company: "",
  email: "",
  operationArea: "",
  privacyAccepted: false,
  website: "",
};

const Diagnosis = ({
  content,
  locale,
}: {
  content: HomepageDiagnosis;
  locale: Locale;
}) => {
  const [context, setContext] = useState(EMPTY_CONTEXT);
  const [fieldErrors, setFieldErrors] = useState<DiagnosisFieldErrors>({});
  const [state, setState] = useState<DiagnosisFormState>("idle");
  const startedRef = useRef(false);

  const handleChange = (field: keyof typeof EMPTY_CONTEXT, value: string | boolean) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("contact_form_start", formEventParams(DIAGNOSIS_FORM_SOURCE, locale));
    }
    setContext((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => (field in prev ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateDiagnosisContext(context, content.context);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setState("submitError");
      return;
    }
    setState("submitting");
    trackEvent("contact_form_submit", formEventParams(DIAGNOSIS_FORM_SOURCE, locale));
    const result = await submitDiagnosisContext(context);
    if (result.ok) {
      trackEvent("contact_form_success", formEventParams(DIAGNOSIS_FORM_SOURCE, locale));
      setState("contextAccepted");
      setContext(EMPTY_CONTEXT);
      setFieldErrors({});
    } else {
      trackEvent("contact_form_error", formEventParams(DIAGNOSIS_FORM_SOURCE, locale));
      setState(result.kind === "rejected" ? "submitError" : "handoffError");
    }
  };

  const feedback = resolveDiagnosisFeedback(state, content.context);
  const whatsappMessage = buildWhatsAppMessage(content.whatsapp.message, {
    company: context.company,
    operationArea: context.operationArea,
  });

  return (
    <section id={content.id} className="diagnosis-section experience-section">
      <div className="experience-container diagnosis-grid">
        <div className="diagnosis-copy">
          <p className="experience-eyebrow">{content.eyebrow}</p>
          <h2 className="exp-h2">{content.heading}</h2>
          <ul className="diagnosis-offer">
            <li>
              <strong>{content.offer.duration}</strong>
            </li>
            <li>
              <strong>{content.offer.cost}</strong>
            </li>
            <li>{content.offer.focus}</li>
            <li>{content.offer.nonObligation}</li>
          </ul>
          {content.offer.deliverables.approved &&
          content.offer.deliverables.lines.length > 0 ? (
            <ul className="diagnosis-deliverables">
              {content.offer.deliverables.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          {content.calendar.available && content.calendar.availabilityClaim ? (
            <p className="diagnosis-availability">
              {content.calendar.availabilityClaim}
            </p>
          ) : null}
          {feedback.kind !== "none" ? (
            <div
              role={feedback.kind === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`diagnosis-feedback ${
                feedback.kind === "error"
                  ? "diagnosis-feedback-error"
                  : "diagnosis-feedback-success"
              }`}
            >
              {feedback.message}
            </div>
          ) : null}
          {content.whatsapp.destination ? (
            <div className="diagnosis-whatsapp">
              <TrackedLink
                href={buildWhatsAppUrl(content.whatsapp.destination, whatsappMessage)}
                event="whatsapp_click"
                params={{ locale, cta_location: "diagnosis_section" }}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-btn exp-btn-secondary"
              >
                {content.whatsapp.label}
              </TrackedLink>
              <p className="diagnosis-whatsapp-note">
                {content.whatsapp.leaveSiteNote}
              </p>
            </div>
          ) : null}
        </div>

        <div className="diagnosis-form-card">
          <form onSubmit={handleSubmit} noValidate className="diagnosis-form">
            <div className="hidden">
              <label htmlFor="diagnosis-website">Website</label>
              <input
                id="diagnosis-website"
                type="text"
                name="website"
                value={context.website}
                onChange={(e) => handleChange("website", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>
            <div className="diagnosis-field">
              <label htmlFor="diagnosis-fullName">
                {content.context.fields.fullName.label}*
              </label>
              <input
                id="diagnosis-fullName"
                name="fullName"
                type="text"
                value={context.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
                autoComplete="name"
                aria-invalid={!!fieldErrors.fullName}
                aria-describedby={fieldErrors.fullName ? "diagnosis-fullName-error" : undefined}
                placeholder={content.context.fields.fullName.placeholder}
              />
              {fieldErrors.fullName ? (
                <p id="diagnosis-fullName-error" className="diagnosis-field-error" role="alert">
                  {fieldErrors.fullName}
                </p>
              ) : null}
            </div>
            <div className="diagnosis-field">
              <label htmlFor="diagnosis-company">
                {content.context.fields.company.label}*
              </label>
              <input
                id="diagnosis-company"
                name="company"
                type="text"
                value={context.company}
                onChange={(e) => handleChange("company", e.target.value)}
                required
                autoComplete="organization"
                aria-invalid={!!fieldErrors.company}
                aria-describedby={fieldErrors.company ? "diagnosis-company-error" : undefined}
                placeholder={content.context.fields.company.placeholder}
              />
              {fieldErrors.company ? (
                <p id="diagnosis-company-error" className="diagnosis-field-error" role="alert">
                  {fieldErrors.company}
                </p>
              ) : null}
            </div>
            <div className="diagnosis-field">
              <label htmlFor="diagnosis-email">{content.context.fields.email.label}*</label>
              <input
                id="diagnosis-email"
                name="email"
                type="email"
                value={context.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                autoComplete="email"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "diagnosis-email-error" : undefined}
                placeholder={content.context.fields.email.placeholder}
              />
              {fieldErrors.email ? (
                <p id="diagnosis-email-error" className="diagnosis-field-error" role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>
            <div className="diagnosis-field">
              <label htmlFor="diagnosis-operationArea">
                {content.context.fields.operationArea.label}*
              </label>
              <input
                id="diagnosis-operationArea"
                name="operationArea"
                type="text"
                value={context.operationArea}
                onChange={(e) => handleChange("operationArea", e.target.value)}
                required
                aria-invalid={!!fieldErrors.operationArea}
                aria-describedby={
                  fieldErrors.operationArea ? "diagnosis-operationArea-error" : undefined
                }
                placeholder={content.context.fields.operationArea.placeholder}
              />
              {fieldErrors.operationArea ? (
                <p
                  id="diagnosis-operationArea-error"
                  className="diagnosis-field-error"
                  role="alert"
                >
                  {fieldErrors.operationArea}
                </p>
              ) : null}
            </div>
            <div className="diagnosis-field diagnosis-privacy">
              <label htmlFor="diagnosis-privacy">
                <input
                  id="diagnosis-privacy"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={context.privacyAccepted}
                  onChange={(e) => handleChange("privacyAccepted", e.target.checked)}
                  aria-invalid={!!fieldErrors.privacyAccepted}
                  aria-describedby={
                    fieldErrors.privacyAccepted ? "diagnosis-privacy-error" : undefined
                  }
                />
                {content.context.privacy.consent}
              </label>
              {fieldErrors.privacyAccepted ? (
                <p id="diagnosis-privacy-error" className="diagnosis-field-error" role="alert">
                  {fieldErrors.privacyAccepted}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={state === "submitting"}
              className="diagnosis-submit"
            >
              {state === "submitting"
                ? content.context.submittingLabel
                : content.context.submitLabel}
            </button>
          </form>
          {state === "submitError" || state === "handoffError" ? (
            <p className="diagnosis-alternative">
              <a href={content.context.alternative.href}>
                {content.context.alternative.label}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Diagnosis;
