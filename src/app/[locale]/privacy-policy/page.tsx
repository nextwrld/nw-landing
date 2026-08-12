import Breadcrumb from "@/components/Common/Breadcrumb";
import PrivacyPolicyContent from "@/components/Legal/PrivacyPolicyContent";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(l);
  return {
    title: dict.privacyPolicy.title,
    description: dict.privacyPolicy.intro,
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);

  return (
    <main>
      <Breadcrumb pageName={dict.privacyPolicy.title} locale={l} />
      <PrivacyPolicyContent dict={dict.privacyPolicy} />
    </main>
  );
}