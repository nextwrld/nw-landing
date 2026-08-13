import type { Locale } from "@/i18n/config";
import { homepageES } from "./es";
import { homepageEN } from "./en";
import type {
  HomepageContent,
  HomepageLocale,
  SectionPageKey,
  SectionPageMeta,
} from "./types";
import { HOMEPAGE_LOCALES, SECTION_PAGE_KEYS } from "./types";

export const contentByLocale: Record<HomepageLocale, HomepageContent> = {
  es: homepageES,
  en: homepageEN,
};

export function getHomepageContent(locale: Locale): HomepageContent {
  return contentByLocale[locale];
}

export const SECTION_SLUGS: Record<HomepageLocale, Record<SectionPageKey, string>> = {
  es: { services: "servicios", method: "metodo", cases: "casos", about: "nosotros" },
  en: { services: "services", method: "method", cases: "cases", about: "about" },
};

export function sectionSlug(locale: HomepageLocale, key: SectionPageKey): string {
  return SECTION_SLUGS[locale][key];
}

export function sectionPagePath(locale: HomepageLocale, key: SectionPageKey): string {
  return `/${sectionSlug(locale, key)}`;
}

export function sectionKeyForSlug(
  locale: HomepageLocale,
  slug: string | undefined
): SectionPageKey | undefined {
  if (!slug) {
    return undefined;
  }
  return SECTION_PAGE_KEYS.find((key) => SECTION_SLUGS[locale][key] === slug);
}

export function getSectionPage(locale: Locale, key: SectionPageKey): SectionPageMeta {
  return getHomepageContent(locale).sectionPages[key];
}

const REQUIRED_SECTIONS = [
  "problem",
  "impact",
  "betterWay",
  "capabilities",
  "method",
  "differentiation",
  "evidence",
  "diagnosis",
  "finalCta",
] as const;

export function validateContentParity(
  map: Record<string, HomepageContent> = contentByLocale
): string[] {
  const problems: string[] = [];

  for (const locale of HOMEPAGE_LOCALES) {
    const content = map[locale];
    if (!content) {
      problems.push(`Missing homepage content for locale ${locale}`);
      continue;
    }
    if (!content.hero?.h1?.trim()) {
      problems.push(`Locale ${locale} has no H1`);
    }
    if (!content.seo?.title?.trim() || !content.seo?.description?.trim()) {
      problems.push(`Locale ${locale} is missing SEO copy`);
    }
    for (const key of REQUIRED_SECTIONS) {
      if (!content[key]?.id) {
        problems.push(`Locale ${locale} is missing the ${key} section`);
      }
    }
    for (const key of SECTION_PAGE_KEYS) {
      const page = content.sectionPages?.[key];
      if (
        !page?.eyebrow?.trim() ||
        !page?.heading?.trim() ||
        !page?.seo?.title?.trim() ||
        !page?.seo?.description?.trim()
      ) {
        problems.push(`Locale ${locale} section page ${key} is missing meta`);
      }
    }
  }

  const esKeys = Object.keys(map.es ?? {}).sort();
  const enKeys = Object.keys(map.en ?? {}).sort();
  if (esKeys.length > 0 && JSON.stringify(esKeys) !== JSON.stringify(enKeys)) {
    problems.push("ES and EN homepage content shapes differ");
  }

  const esSectionKeys = Object.keys(map.es?.sectionPages ?? {}).sort();
  const enSectionKeys = Object.keys(map.en?.sectionPages ?? {}).sort();
  if (
    esSectionKeys.length > 0 &&
    JSON.stringify(esSectionKeys) !== JSON.stringify(enSectionKeys)
  ) {
    problems.push("ES and EN section page shapes differ");
  }

  return problems;
}
