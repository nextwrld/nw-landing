import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approvedCaseSlugs } from "@/content/sections";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSuccessCaseBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { buildPageMetadata, siteUrl } from "@/utils/seo";
import { SITE_NAME } from "../../../site";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    approvedCaseSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l: Locale = isLocale(locale) ? locale : locales[0];
  const successCase = getSuccessCaseBySlug(slug, l, ["title", "description", "coverImage"]);

  if (!successCase) {
    return { title: "Casos" };
  }

  return buildPageMetadata({
    locale: l,
    path: `/casos/${slug}`,
    title: successCase.title ?? "Casos",
    description: successCase.description ?? "",
    image: successCase.coverImage ?? undefined,
    type: "article",
  });
}

export default async function CasoDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !approvedCaseSlugs(locale).includes(slug)) {
    notFound();
  }

  const l: Locale = locale;
  const successCase = getSuccessCaseBySlug(slug, l, [
    "title",
    "description",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  if (!successCase) {
    notFound();
  }

  const content = await markdownToHtml(successCase.content || "");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: successCase.title,
    description: successCase.description,
    datePublished: successCase.date,
    author: { "@type": "Organization", name: successCase.author ?? SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: siteUrl(`/${l}/casos/${slug}`),
    ...(successCase.coverImage ? { image: siteUrl(successCase.coverImage) } : {}),
  };

  return (
    <main id="main-content" className="section-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="section-page__inner">
        <header>
          <h1 className="section-page__heading">{successCase.title}</h1>
          {successCase.description && (
            <p className="section-page__intro">{successCase.description}</p>
          )}
        </header>
        <div
          className="section-page__markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}
