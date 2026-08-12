import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/app/site";
import { locales, type Locale } from "@/i18n/config";

const ogLocale = (locale: Locale): string => (locale === "es" ? "es_ES" : "en_US");

export const siteUrl = (path: string): string => new URL(path, SITE_URL).toString();

export const localePath = (locale: Locale, path: string): string =>
  `/${locale}${path === "/" ? "" : path}`;

export const localeUrl = (locale: Locale, path: string): string =>
  siteUrl(localePath(locale, path));

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
