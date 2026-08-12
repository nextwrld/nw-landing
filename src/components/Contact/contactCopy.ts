import type { Dictionary } from "@/i18n/dictionaries";

export interface ContactCopy {
  title: string;
  subtitle: string;
  formTitle: string;
  buttonText: string;
  placeholder: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  send: string;
  sending: string;
  successMessage: string;
  errorMessage: string;
  location: string;
}

export function buildContactCopy(contact: Dictionary["contact"]): ContactCopy {
  return {
    title: contact.title,
    subtitle: contact.subtitle,
    formTitle: contact.sendMessage,
    buttonText: contact.send,
    placeholder: "Escribe tu mensaje aquí",
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,
    send: contact.send,
    sending: contact.sending,
    successMessage: contact.successMessage,
    errorMessage: contact.errorMessage,
    location: contact.location,
  };
}

export function buildDiagnosticoContactCopy(
  contact: Dictionary["contact"],
  cta: Dictionary["diagnostico"]["cta"]
): ContactCopy {
  return {
    ...buildContactCopy(contact),
    title: cta.title,
    subtitle: cta.subtitle,
    formTitle: cta.formTitle,
    buttonText: cta.buttonText,
    placeholder: cta.placeholder,
  };
}
