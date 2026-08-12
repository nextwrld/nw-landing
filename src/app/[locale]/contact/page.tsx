import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { buildContactCopy } from "@/components/Contact/contactCopy";
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
    title: `${dict.menu.contact} | Next Wrld`,
  };
}

const ContactPage = async ({ params }: Props) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);

  return (
    <>
      <Breadcrumb pageName={dict.menu.contact} locale={l} />

      <Contact copy={buildContactCopy(dict.contact)} source="contact" />
    </>
  );
};

export default ContactPage;