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
