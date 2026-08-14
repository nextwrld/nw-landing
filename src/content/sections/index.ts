import type { Locale } from "@/i18n/config";
import { sectionsEN } from "./en";
import { sectionsES } from "./es";
import type { SectionContent, SectionRoute } from "./types";
import { SECTION_LOCALES, SECTION_ROUTES } from "./types";

/**
 * V3 section-page registry. One typed content entry per route per locale;
 * drives route generation, nav, footer, sitemap, and the publication gate so
 * withholding is atomic (locale-parity gate).
 */
export const sectionsByLocale: Record<Locale, SectionContent[]> = {
  es: sectionsES,
  en: sectionsEN,
};

export function isSectionContentComplete(entry: SectionContent): boolean {
  return (
    entry.approved &&
    Boolean(entry.seo?.title?.trim()) &&
    Boolean(entry.seo?.description?.trim()) &&
    Boolean(entry.heading?.trim()) &&
    Boolean(entry.intro?.trim())
  );
}

/**
 * Routes that are registered AND approved AND content-complete for a locale.
 * ES returns the Fase 1 skeleton routes (minus `insights`, which stays
 * approved:false); EN returns `[]` until Fase 2 approval flips the registry.
 */
export function publishedRoutes(locale: Locale): SectionRoute[] {
  const entries = sectionsByLocale[locale] ?? [];
  return entries.filter(isSectionContentComplete).map((entry) => entry.route);
}

/**
 * Returns the typed content for a route, throwing when the entry is missing or
 * unapproved (callers render `notFound()` in that case).
 */
export function getSectionContent(
  route: SectionRoute,
  locale: Locale
): SectionContent {
  const entry = (sectionsByLocale[locale] ?? []).find(
    (candidate) => candidate.route === route
  );
  if (!entry) {
    throw new Error(`No section content registered for route ${route} in ${locale}`);
  }
  if (!entry.approved) {
    throw new Error(`Section content for route ${route} in ${locale} is not approved`);
  }
  return entry;
}

/**
 * Per-route completeness validator: every entry of the locale must carry
 * non-empty seo/heading/intro and a valid route id.
 */
export function validateSectionContent(locale: Locale): string[] {
  const problems: string[] = [];
  for (const entry of sectionsByLocale[locale] ?? []) {
    if (!SECTION_ROUTES.includes(entry.route)) {
      problems.push(`${locale} has an unknown section route ${String(entry.route)}`);
    }
    if (!entry.seo?.title?.trim()) {
      problems.push(`${locale} section ${entry.route} is missing seo.title`);
    }
    if (!entry.seo?.description?.trim()) {
      problems.push(`${locale} section ${entry.route} is missing seo.description`);
    }
    if (!entry.heading?.trim()) {
      problems.push(`${locale} section ${entry.route} is missing its heading`);
    }
    if (!entry.intro?.trim()) {
      problems.push(`${locale} section ${entry.route} is missing its intro`);
    }
  }
  return problems;
}

/**
 * Maps a locale-relative destination ("/servicios/software-a-medida") to its
 * registered route id ("software-a-medida"). Anchor destinations yield null.
 */
export function routeFromDestination(destination: string): SectionRoute | null {
  if (destination.includes("#")) {
    return null;
  }
  const segments = destination.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null;
  }
  const route = segments[segments.length - 1];
  return (SECTION_ROUTES as readonly string[]).includes(route)
    ? (route as SectionRoute)
    : null;
}

export function isRegisteredRoute(route: string, locale: Locale): boolean {
  return (sectionsByLocale[locale] ?? []).some((entry) => entry.route === route);
}

export { SECTION_LOCALES };
