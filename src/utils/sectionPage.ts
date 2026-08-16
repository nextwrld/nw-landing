import type { Metadata } from "next";
import { publishedRoutes, routeForSlug, slugForRoute } from "@/content/sections";
import { getSectionContent } from "@/content/sections";
import type { SectionContent, SectionRoute } from "@/content/sections/types";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/utils/seo";

/**
 * Shared helpers for V3 section pages. Dynamic segment pages
 * ([locale]/[section] and [locale]/[servicePrefix]/[serviceSlug]) use these;
 * all converge on the localized publication registry so withholding and slug
 * localization stay atomic across routes, nav, sitemap, and metadata.
 */

export function sectionStaticParams(route: SectionRoute): { locale: Locale }[] {
  return locales
    .filter((locale) => publishedRoutes(locale).includes(slugForRoute(route, locale)))
    .map((locale) => ({ locale }));
}

export async function sectionPageMetadata(
  route: SectionRoute,
  locale: string
): Promise<Metadata> {
  const l: Locale = isLocale(locale) ? locale : locales[0];
  const slug = slugForRoute(route, l);
  if (!publishedRoutes(l).includes(slug)) {
    return { title: "Next Wrld" };
  }
  let content: SectionContent;
  try {
    content = getSectionContent(slug, l);
  } catch {
    return { title: "Next Wrld" };
  }
  return buildPageMetadata({
    locale: l,
    path: `/${slug}`,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export function sectionPageContent(
  route: SectionRoute,
  locale: string
): SectionContent | null {
  if (!isLocale(locale)) {
    return null;
  }
  const slug = slugForRoute(route, locale);
  if (!publishedRoutes(locale).includes(slug)) {
    return null;
  }
  try {
    return getSectionContent(slug, locale);
  } catch {
    return null;
  }
}

export { routeForSlug };
