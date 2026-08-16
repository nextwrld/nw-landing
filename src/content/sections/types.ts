import type { SeoCopy } from "@/content/homepage/types";

/**
 * Section-page content domain (V3).
 *
 * Every section sub-page (servicios/[slug] ×3, como-trabajamos, casos,
 * insights, nosotros, diagnostico) has one typed entry per locale. ES is the
 * primary locale; EN entries stay `approved: false` until Fase 2 approval so
 * the locale-parity gate can never half-publish an unapproved locale.
 */
export const SECTION_LOCALES = ["es", "en"] as const;

export type SectionLocale = (typeof SECTION_LOCALES)[number];

export const SECTION_ROUTES = [
  "software-a-medida",
  "sistemas-de-gestion",
  "automatizacion",
  "como-trabajamos",
  "casos",
  "insights",
  "nosotros",
  "diagnostico",
] as const;

/** The three service routes rendered under `/servicios/[slug]`. */
export const SERVICE_ROUTES = [
  "software-a-medida",
  "sistemas-de-gestion",
  "automatizacion",
] as const;

export type ServiceRoute = (typeof SERVICE_ROUTES)[number];

/**
 * URL slug per locale for every canonical route. ES slugs equal the canonical
 * route ids; EN slugs are localized (e.g. /en/services/custom-software,
 * /en/how-we-work, /en/cases, /en/about-us, /en/diagnosis).
 */
export const SECTION_SLUGS: Record<SectionLocale, Record<SectionRoute, string>> = {
  es: {
    "software-a-medida": "software-a-medida",
    "sistemas-de-gestion": "sistemas-de-gestion",
    automatizacion: "automatizacion",
    "como-trabajamos": "como-trabajamos",
    casos: "casos",
    insights: "insights",
    nosotros: "nosotros",
    diagnostico: "diagnostico",
  },
  en: {
    "software-a-medida": "custom-software",
    "sistemas-de-gestion": "management-systems",
    automatizacion: "automation",
    "como-trabajamos": "how-we-work",
    casos: "cases",
    insights: "insights",
    nosotros: "about-us",
    diagnostico: "diagnosis",
  },
};

/** Locale-relative path prefix for service routes. */
export const SERVICE_PREFIXES: Record<SectionLocale, string> = {
  es: "servicios",
  en: "services",
};

export type SectionRoute = (typeof SECTION_ROUTES)[number];

export interface SectionBlock {
  id: string;
  heading: string;
  body: string;
}

export interface CasosListingEntry {
  slug: string;
  approved: boolean;
}

export interface SectionContent {
  route: SectionRoute;
  seo: SeoCopy;
  heading: string;
  intro: string;
  sections: SectionBlock[];
  /** Listing entries for the `/casos` route; narrative is the completeness unit. */
  cases?: CasosListingEntry[];
  approved: boolean;
}
