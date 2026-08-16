import type { Locale } from "@/i18n/config";
import { sectionsEN } from "./en";
import { sectionsES } from "./es";
import type { SectionContent, SectionRoute, ServiceRoute } from "./types";
import {
  SECTION_LOCALES,
  SECTION_ROUTES,
  SECTION_SLUGS,
  SERVICE_PREFIXES,
  SERVICE_ROUTES,
} from "./types";

/**
 * V3 section-page registry. One typed content entry per canonical route per
 * locale; URL slugs are localized per locale (e.g. "como-trabajamos" for ES,
 * "how-we-work" for EN). The registry drives route generation, nav, footer,
 * sitemap, and the publication gate so withholding is atomic.
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

/** Localized URL slug for a canonical route in a locale. */
export function slugForRoute(route: SectionRoute, locale: Locale): string {
  return SECTION_SLUGS[locale][route];
}

/** Canonical route for a localized slug in a locale, or null when unregistered. */
export function routeForSlug(slug: string, locale: Locale): SectionRoute | null {
  const entries = Object.entries(SECTION_SLUGS[locale]) as [SectionRoute, string][];
  const match = entries.find(([, candidate]) => candidate === slug);
  return match ? match[0] : null;
}

/**
 * Routes (localized slugs) that are registered AND approved AND content-complete
 * for a locale. ES returns the published skeleton slugs; EN returns the
 * localized English slugs once Fase 2 approval flips the registry.
 */
export function publishedCanonicalRoutes(locale: Locale): SectionRoute[] {
  const entries = sectionsByLocale[locale] ?? [];
  return entries.filter(isSectionContentComplete).map((entry) => entry.route);
}

export function publishedRoutes(locale: Locale): string[] {
  return publishedCanonicalRoutes(locale).map((route) => slugForRoute(route, locale));
}

/**
 * Returns the typed content for a localized slug, throwing when the entry is
 * missing or unapproved (callers render `notFound()` in that case).
 */
export function getSectionContent(slug: string, locale: Locale): SectionContent {
  const route = routeForSlug(slug, locale);
  if (!route) {
    throw new Error(`No section route registered for slug ${slug} in ${locale}`);
  }
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
 * Maps a locale-relative destination ("/servicios/software-a-medida" for ES,
 * "/services/custom-software" for EN) to its canonical route id. Anchor
 * destinations and unknown slugs yield null.
 */
export function routeFromDestination(
  destination: string,
  locale: Locale
): SectionRoute | null {
  if (destination.includes("#")) {
    return null;
  }
  const segments = destination.split("/").filter(Boolean);
  if (segments.length === 0) {
    return null;
  }
  return routeForSlug(segments[segments.length - 1], locale);
}

export function isRegisteredRoute(route: string, locale: Locale): boolean {
  return (sectionsByLocale[locale] ?? []).some((entry) => entry.route === route);
}

export function approvedCaseSlugs(locale: Locale): string[] {
  const entry = (sectionsByLocale[locale] ?? []).find(
    (candidate) => candidate.route === "casos"
  );
  return (entry?.cases ?? [])
    .filter((entryCase) => entryCase.approved)
    .map((entryCase) => entryCase.slug);
}

/** Locale-relative prefix for service routes ("servicios" | "services"). */
export function servicePrefix(locale: Locale): string {
  return SERVICE_PREFIXES[locale];
}

export function isServiceSlug(slug: string, locale: Locale): boolean {
  return serviceRoutes(locale).includes(slug);
}

/** Published service route slugs for a locale (localized). */
export function serviceRoutes(locale: Locale): string[] {
  const published = publishedRoutes(locale);
  return SERVICE_ROUTES.map((route) => slugForRoute(route, locale)).filter(
    (slug) => published.includes(slug)
  );
}

export { SECTION_LOCALES };
