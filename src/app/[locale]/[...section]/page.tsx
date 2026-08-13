import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SectionPage from "@/components/HomeExperience/SectionPage";
import EvidenceSection from "@/components/HomeExperience/EvidenceSection";
import Capabilities from "@/components/HomeExperience/Capabilities";
import Method from "@/components/HomeExperience/Method";
import Differentiation from "@/components/HomeExperience/Differentiation";
import FinalCTA from "@/components/HomeExperience/FinalCTA";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { admitPublication, getPublicationConfig } from "@/content/homepage/publication";
import {
  getHomepageContent,
  getSectionPage,
  sectionKeyForSlug,
  sectionPagePath,
} from "@/content/homepage";
import {
  HOMEPAGE_LOCALES,
  SECTION_PAGE_KEYS,
} from "@/content/homepage/types";
import type {
  HomepageContent,
  SectionPageKey,
} from "@/content/homepage/types";
import { buildSectionPageMetadata } from "@/utils/seo";
import { OG_DEFAULT_IMAGE } from "../../site";

type Props = {
  params: Promise<{ locale: string; section: string[] }>;
};

export function generateStaticParams() {
  return HOMEPAGE_LOCALES.flatMap((locale) =>
    SECTION_PAGE_KEYS.map((key) => ({
      locale,
      section: [sectionPagePath(locale, key).replace("/", "")],
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, section } = await params;
  const l = isLocale(localeParam) ? localeParam : defaultLocale;
  const key = sectionKeyForSlug(l, section[0]);
  if (!key) {
    return {};
  }
  const meta = getSectionPage(l, key);
  return buildSectionPageMetadata({
    locale: l,
    key,
    title: meta.seo.title,
    description: meta.seo.description,
    image: OG_DEFAULT_IMAGE,
  });
}

function SectionBody({
  sectionKey,
  content,
  locale,
}: {
  sectionKey: SectionPageKey;
  content: HomepageContent;
  locale: Locale;
}) {
  switch (sectionKey) {
    case "services":
      return <Capabilities content={content.capabilities} />;
    case "method":
      return <Method content={content.method} />;
    case "cases":
      return <EvidenceSection content={content.evidence} />;
    case "about":
      return <Differentiation content={content.differentiation} />;
  }
}

export default async function SectionPageRoute({ params }: Props) {
  const { locale: localeParam, section } = await params;

  if (!isLocale(localeParam) || !section || section.length === 0) {
    notFound();
  }

  const l: Locale = localeParam;
  const admission = admitPublication(getPublicationConfig());

  if (admission !== "experience") {
    notFound();
  }

  const key = sectionKeyForSlug(l, section[0]);
  if (!key) {
    notFound();
  }

  const content = getHomepageContent(l);

  return (
    <SectionPage page={content.sectionPages[key]}>
      <SectionBody sectionKey={key} content={content} locale={l} />
      <FinalCTA content={content.finalCta} locale={l} />
    </SectionPage>
  );
}
