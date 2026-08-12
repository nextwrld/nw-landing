import About from "@/components/About";
import SuccessCasesSection from "@/components/SuccessCases/SuccessCasesSection";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import { buildContactCopy } from "@/components/Contact/contactCopy";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { getAllSuccessCases } from "@/utils/markdown";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { buildPageMetadata } from "@/utils/seo";
import { OG_DEFAULT_IMAGE } from "../site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(l);
  return buildPageMetadata({
    locale: l,
    path: "/",
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    image: OG_DEFAULT_IMAGE,
    absoluteTitle: true,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);
  const cases = getAllSuccessCases(l, [
    "title",
    "date",
    "description",
    "coverImage",
    "slug",
    "author",
    "authorImage",
  ]);

  return (
    <main>
      <ScrollUp />
      <Hero dict={dict.hero} locale={l} />
      <Features dict={dict.features} />
      <About dict={dict} locale={l} />
      <Pricing dict={dict.pricing} locale={l} />
      <Faq dict={dict.faq} />
      <SuccessCasesSection dict={dict.successCases} cases={cases} locale={l} />
      <Contact copy={buildContactCopy(dict.contact)} source="home" />
    </main>
  );
}