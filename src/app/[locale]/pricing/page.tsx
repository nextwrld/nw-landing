import Breadcrumb from "@/components/Common/Breadcrumb";
import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { buildPageMetadata } from "@/utils/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(l);
  return buildPageMetadata({
    locale: l,
    path: "/pricing",
    title: dict.menu.pricing,
    description: dict.pricing.paragraph,
  });
}

const PricingPage = async ({ params }: Props) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);

  return (
    <>
      <Breadcrumb pageName={dict.menu.pricing} locale={l} />
      <Pricing dict={dict.pricing} locale={l} />
      <Faq dict={dict.faq} />
    </>
  );
};

export default PricingPage;