import Breadcrumb from "@/components/Common/Breadcrumb";
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
    title: dict.legalNotice.title,
    description: dict.legalNotice.intro,
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);
  const d = dict.legalNotice;

  return (
    <main>
      <Breadcrumb pageName={d.title} locale={l} />
      <section className="relative z-10 bg-white py-16 dark:bg-dark">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
            <p className="text-sm text-gray-500 dark:text-gray-400">{d.updated}</p>

            <h2>{d.title}</h2>
            <p>{d.intro}</p>

            <h3>{d.companyInfoTitle}</h3>
            <ul>
              {d.companyInfo.map((item, idx) => (
                <li key={`ci-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.useTitle}</h3>
            <ul>
              {d.use.map((item, idx) => (
                <li key={`us-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.liabilityTitle}</h3>
            <p>{d.liability}</p>

            <h3>{d.ipTitle}</h3>
            <p>{d.ip}</p>

            <h3>{d.contactTitle}</h3>
            <p>
              {d.contact} {" "}
              <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
            </p>

            <h3>{d.changesTitle}</h3>
            <p>{d.changes}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
