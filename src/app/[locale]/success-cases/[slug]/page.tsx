import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { localizedHref } from "@/utils/i18n-url";
import { getAllSuccessCases } from "@/utils/markdown";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * Legacy `/success-cases/[slug]` URLs redirect permanently (308) to the V3
 * `/casos/[slug]` detail pages, preserving locale and SEO equity (seo.md §34).
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllSuccessCases(locale, ["slug"])
      .map((c) => c.slug)
      .filter((slug): slug is string => typeof slug === "string")
      .map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export default async function SuccessCaseRedirect({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const l: Locale = locale;
  redirect(localizedHref(l, `/casos/${slug}`), "replace");
}
