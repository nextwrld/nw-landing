import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionPageShell from "@/components/HomeExperience/SectionPageShell";
import { approvedCaseSlugs, getSectionContent } from "@/content/sections";
import type { SectionContent } from "@/content/sections/types";
import { isLocale, type Locale } from "@/i18n/config";
import { getSuccessCaseBySlug } from "@/utils/markdown";
import { sectionPageMetadata, sectionStaticParams } from "@/utils/sectionPage";
import { localizedHref } from "@/utils/i18n-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return sectionStaticParams("casos");
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return sectionPageMetadata("casos", locale);
}

export default async function CasosPage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  let content: SectionContent;
  try {
    content = getSectionContent("casos", locale);
  } catch {
    notFound();
    return null;
  }

  const l: Locale = locale;
  const cases = approvedCaseSlugs(l)
    .map((slug) => getSuccessCaseBySlug(slug, l, ["slug", "title", "description"]))
    .filter((entry) => entry !== null);

  return (
    <>
      <SectionPageShell content={content} />
      {cases.length > 0 && (
        <section className="section-page section-page--listing" aria-labelledby="casos-listing-heading">
          <h2 id="casos-listing-heading" className="section-page__block-heading">
            Casos publicados
          </h2>
          <ul className="section-page__list">
            {cases.map((entry) => (
              <li key={entry.slug} className="section-page__list-item">
                <Link href={localizedHref(l, `/casos/${entry.slug}`)}>
                  <span className="section-page__list-title">{entry.title}</span>
                  {entry.description && (
                    <span className="section-page__list-description">{entry.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
