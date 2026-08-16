import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import { getSectionContent, isServiceRoute, serviceRoutes } from "@/content/sections";
import type { SectionContent, ServiceRoute } from "@/content/sections/types";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/utils/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceRoutes(locale).map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l: Locale = isLocale(locale) ? locale : locales[0];
  if (!isServiceRoute(slug)) {
    return { title: "Servicios" };
  }
  let content: SectionContent;
  try {
    content = getSectionContent(slug, l);
  } catch {
    return { title: "Servicios" };
  }
  return buildPageMetadata({
    locale: l,
    path: `/servicios/${slug}`,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !isServiceRoute(slug)) {
    notFound();
  }

  const l: Locale = locale;
  if (!serviceRoutes(l).includes(slug)) {
    notFound();
  }

  let content: SectionContent;
  try {
    content = getSectionContent(slug, l);
  } catch {
    notFound();
    return null;
  }

  return <SectionPageShell content={content} />;
}
