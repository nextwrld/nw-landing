import type { Locale } from "@/i18n/config";
import { homepageES } from "./es";
import { homepageEN } from "./en";
import type { HomepageContent, HomepageLocale } from "./types";
import { HOMEPAGE_LOCALES } from "./types";

export const contentByLocale: Record<HomepageLocale, HomepageContent> = {
  es: homepageES,
  en: homepageEN,
};

export function getHomepageContent(locale: Locale): HomepageContent {
  return contentByLocale[locale];
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
  }

  const esKeys = Object.keys(map.es ?? {}).sort();
  const enKeys = Object.keys(map.en ?? {}).sort();
  if (esKeys.length > 0 && JSON.stringify(esKeys) !== JSON.stringify(enKeys)) {
    problems.push("ES and EN homepage content shapes differ");
  }

  return problems;
}
