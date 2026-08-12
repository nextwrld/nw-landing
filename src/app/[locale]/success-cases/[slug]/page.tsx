import SuccessCaseContent from "@/components/SuccessCases/SuccessCaseContent";
import { getAllSuccessCases, getSuccessCaseBySlug } from "@/utils/markdown";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const successCase = getSuccessCaseBySlug(slug, l, ["title", "excerpt"]);
  if (!successCase) {
    return { title: "Success Case | Next Wrld" };
  }
  const dict = await getDictionary(l);
  return {
    title: `${successCase.title} | Next Wrld`,
    description: successCase.excerpt || dict.seo.home.description,
  };
}

export default async function SuccessCasePage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const successCase = getSuccessCaseBySlug(slug, l, ["title"]);
  if (!successCase) {
    notFound();
  }

  return <SuccessCaseContent slug={slug} locale={l} />;
}

export async function generateStaticParams() {
  const slugsES = getAllSuccessCases("es", ["slug"]);
  const slugsEN = getAllSuccessCases("en", ["slug"]);

  return [
    ...slugsES.map((c) => ({ locale: "es", slug: c.slug })),
    ...slugsEN.map((c) => ({ locale: "en", slug: c.slug })),
  ];
}