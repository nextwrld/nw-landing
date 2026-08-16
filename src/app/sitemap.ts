import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { approvedCaseSlugs, publishedRoutes, routeForSlug, servicePrefix, slugForRoute } from "@/content/sections";
import { SERVICE_ROUTES } from "@/content/sections/types";
import { SITE_URL } from "./site";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const staticPaths: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/diagnostico", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal-notice", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

function alternates(locale: (typeof locales)[number], path: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE_URL}/${loc}${path === "/" ? "" : path}`;
  }
  return { languages };
}

function sectionPath(locale: (typeof locales)[number], slug: string): string {
  const route = routeForSlug(slug, locale);
  return route !== null && (SERVICE_ROUTES as readonly string[]).includes(route)
    ? `/${servicePrefix(locale)}/${slug}`
    : `/${slug}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, priority, changeFrequency } of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path === "/" ? "" : path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: alternates(locale, path),
      });
    }

    // Published V3 section routes (ES skeleton; EN withheld until approved).
    // `diagnostico` is already covered by staticPaths, so it is skipped here.
    for (const slug of publishedRoutes(locale)) {
      if (routeForSlug(slug, locale) === "diagnostico") continue;
      const path = sectionPath(locale, slug);
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(locale, path),
      });
    }

    // Approved case detail pages under /casos/[slug] (legacy /success-cases
    // URLs redirect 308 to these). Sitemap never emits /success-cases/*.
    for (const slug of approvedCaseSlugs(locale)) {
      const path = `/casos/${slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
        alternates: alternates(locale, path),
      });
    }
  }

  return entries;
}
