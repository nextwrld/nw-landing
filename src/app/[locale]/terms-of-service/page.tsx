import Breadcrumb from "@/components/Common/Breadcrumb";
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
    path: "/terms-of-service",
    title: dict.termsOfService.title,
    description: dict.termsOfService.intro,
  });
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const l: Locale = locale;
  const dict = await getDictionary(l);
  const d = dict.termsOfService;

  return (
    <main>
      <Breadcrumb pageName={d.title} locale={l} />
      <section className="relative z-10 bg-white py-16 dark:bg-dark">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
            <p className="text-sm text-gray-500 dark:text-gray-400">{d.updated}</p>

            <h2>{d.title}</h2>
            <p>{d.intro}</p>

            <h3>{d.acceptanceTitle}</h3>
            <ul>
              {d.acceptance.map((item, idx) => (
                <li key={`ac-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.useTitle}</h3>
            <ul>
              {d.use.map((item, idx) => (
                <li key={`us-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.accountsTitle}</h3>
            <ul>
              {d.accounts.map((item, idx) => (
                <li key={`acnt-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.paymentsTitle}</h3>
            <p>{d.payments}</p>

            <h3>{d.ipTitle}</h3>
            <p>{d.ip}</p>

            <h3>{d.terminationTitle}</h3>
            <p>{d.termination}</p>

            <h3>{d.disclaimersTitle}</h3>
            <ul>
              {d.disclaimers.map((item, idx) => (
                <li key={`ds-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{d.lawTitle}</h3>
            <p>{d.law}</p>

            <h3>{d.changesTitle}</h3>
            <p>{d.changes}</p>

            <h3>{d.contactTitle}</h3>
            <p>
              {d.contact} {" "}
              <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
