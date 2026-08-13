import type { MetadataRoute } from "next";
import { getAllSuccessCases } from "@/utils/markdown";
import { locales } from "@/i18n/config";
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

    for (const c of getAllSuccessCases(locale, ["slug"])) {
      if (!c.slug) continue;
      const path = `/success-cases/${c.slug}`;
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
