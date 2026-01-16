"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";

const TermsOfServicePage = () => {
  const { t } = useTranslation();
  const acceptance: string[] = t("termsOfService.acceptance", { returnObjects: true }) as string[];
  const usePoints: string[] = t("termsOfService.use", { returnObjects: true }) as string[];
  const accounts: string[] = t("termsOfService.accounts", { returnObjects: true }) as string[];
  const disclaimers: string[] = t("termsOfService.disclaimers", { returnObjects: true }) as string[];

  return (
    <main>
      <Breadcrumb pageName={t("termsOfService.title", "Terms of Service")} />
      <section className="relative z-10 bg-white py-16 dark:bg-dark">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("termsOfService.updated")}</p>

            <h2>{t("termsOfService.title")}</h2>
            <p>{t("termsOfService.intro")}</p>

            <h3>{t("termsOfService.acceptanceTitle")}</h3>
            <ul>
              {acceptance.map((item, idx) => (
                <li key={`ac-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("termsOfService.useTitle")}</h3>
            <ul>
              {usePoints.map((item, idx) => (
                <li key={`us-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("termsOfService.accountsTitle")}</h3>
            <ul>
              {accounts.map((item, idx) => (
                <li key={`acnt-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("termsOfService.paymentsTitle")}</h3>
            <p>{t("termsOfService.payments")}</p>

            <h3>{t("termsOfService.ipTitle")}</h3>
            <p>{t("termsOfService.ip")}</p>

            <h3>{t("termsOfService.terminationTitle")}</h3>
            <p>{t("termsOfService.termination")}</p>

            <h3>{t("termsOfService.disclaimersTitle")}</h3>
            <ul>
              {disclaimers.map((item, idx) => (
                <li key={`ds-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("termsOfService.lawTitle")}</h3>
            <p>{t("termsOfService.law")}</p>

            <h3>{t("termsOfService.changesTitle")}</h3>
            <p>{t("termsOfService.changes")}</p>

            <h3>{t("termsOfService.contactTitle")}</h3>
            <p>
              {t("termsOfService.contact")} {" "}
              <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
