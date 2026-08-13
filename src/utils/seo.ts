import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/app/site";
import { locales, type Locale } from "@/i18n/config";
import { getHomepageContent, sectionPagePath } from "@/content/homepage";
import type { HomepageContent, SectionPageKey } from "@/content/homepage/types";

const ogLocale = (locale: Locale): string => (locale === "es" ? "es_ES" : "en_US");

export const siteUrl = (path: string, baseUrl: string = SITE_URL): string =>
  new URL(path, baseUrl).toString();

export const localePath = (locale: Locale, path: string): string =>
  `/${locale}${path === "/" ? "" : path}`;

export const localeUrl = (locale: Locale, path: string, baseUrl: string = SITE_URL): string =>
  siteUrl(localePath(locale, path), baseUrl);

export function localeAlternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localeUrl(loc, path);
  }
  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}

export function buildPageMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const url = localeUrl(opts.locale, opts.path);
  const title = opts.absoluteTitle ? { absolute: opts.title } : opts.title;
  return {
    title,
    description: opts.description,
    alternates: localeAlternates(opts.locale, opts.path),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(opts.locale),
      type: opts.type ?? "website",
      images: opts.image ? [{ url: siteUrl(opts.image) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function buildHomepageMetadata(opts: {
  locale: Locale;
  seo: { title: string; description: string };
  image?: string;
}): Metadata {
  return buildPageMetadata({
    locale: opts.locale,
    path: "/",
    title: opts.seo.title,
    description: opts.seo.description,
    image: opts.image,
    absoluteTitle: true,
  });
}

export function buildSectionPageMetadata(opts: {
  locale: Locale;
  key: SectionPageKey;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = localeUrl(loc, sectionPagePath(loc, opts.key));
  }
  const url = languages[opts.locale];
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(opts.locale),
      type: "website",
      images: opts.image ? [{ url: siteUrl(opts.image) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function homepageSchema(content: HomepageContent): Record<string, unknown>[] {
  const schema: Record<string, unknown>[] = [];
  const approvedFaqs = content.faq.entries.filter((entry) => entry.approved);
  if (approvedFaqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: approvedFaqs.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    });
  }
  return schema;
}

export function validateCanonicalAndHreflang(opts: {
  locale: Locale;
  path: string;
  baseUrl?: string;
  canonical?: string;
  languages?: Record<string, string>;
}): string[] {
  const problems: string[] = [];
  if (!locales.includes(opts.locale)) {
    problems.push(`Unsupported locale ${opts.locale}`);
    return problems;
  }
  const baseUrl = opts.baseUrl ?? SITE_URL;
  const expected = localeUrl(opts.locale, opts.path, baseUrl);
  const canonical = opts.canonical ?? expected;
  if (new URL(canonical).origin !== new URL(baseUrl).origin) {
    problems.push(`Canonical ${canonical} is not on the public site origin ${new URL(baseUrl).origin}`);
  }
  if (canonical !== expected) {
    problems.push(
      `Canonical ${canonical} does not match the expected ${expected} for locale ${opts.locale}`
    );
  }
  const languages: Record<string, string> =
    opts.languages ??
    (localeAlternates(opts.locale, opts.path).languages as Record<string, string> | undefined) ??
    {};
  for (const loc of locales) {
    const actual = languages[loc];
    const expectedLoc = localeUrl(loc, opts.path, baseUrl);
    if (!actual) {
      problems.push(`Missing hreflang alternate for locale ${loc}`);
    } else if (actual !== expectedLoc) {
      problems.push(`Hreflang alternate for ${loc} is ${actual}, expected ${expectedLoc}`);
    }
  }
  if (languages[opts.locale] !== undefined && languages[opts.locale] !== canonical) {
    problems.push("Hreflang alternate for the current locale does not match the canonical");
  }
  return problems;
}

export function validateMetadataLocales(opts?: { baseUrl?: string; path?: string }): string[] {
  const problems: string[] = [];
  const baseUrl = opts?.baseUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const path = opts?.path ?? "/";
  for (const locale of locales) {
    const meta = buildHomepageMetadata({ locale, seo: getHomepageContent(locale).seo });
    const canonical = meta.alternates?.canonical as string | undefined;
    const languages = meta.alternates?.languages as Record<string, string> | undefined;
    problems.push(...validateCanonicalAndHreflang({ locale, path, baseUrl, canonical, languages }));
  }
  return problems;
}
