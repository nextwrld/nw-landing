import type { Metadata } from "next";
import { getSectionContent, publishedRoutes } from "@/content/sections";
import type { SectionContent, SectionRoute } from "@/content/sections/types";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/utils/seo";

/**
 * Shared helpers for fixed-segment V3 section pages (como-trabajamos, nosotros,
 * casos, insights). Dynamic segment pages (servicios/[slug]) use their own
 * derivation; both converge on the same publication registry so withholding is
 * atomic across routes, nav, sitemap, and metadata.
 */

export function sectionStaticParams(
  route: SectionRoute
): { locale: Locale }[] {
  return locales
    .filter((locale) => publishedRoutes(locale).includes(route))
    .map((locale) => ({ locale }));
}

export async function sectionPageMetadata(
  route: SectionRoute,
  locale: string
): Promise<Metadata> {
  const l: Locale = isLocale(locale) ? locale : locales[0];
  if (!publishedRoutes(l).includes(route)) {
    return { title: "Next Wrld" };
  }
  let content: SectionContent;
  try {
    content = getSectionContent(route, l);
  } catch {
    return { title: "Next Wrld" };
  }
  return buildPageMetadata({
    locale: l,
    path: `/${route}`,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export function sectionPageContent(
  route: SectionRoute,
  locale: string
): SectionContent | null {
  if (!isLocale(locale) || !publishedRoutes(locale).includes(route)) {
    return null;
  }
  try {
    return getSectionContent(route, locale);
  } catch {
    return null;
  }
}
