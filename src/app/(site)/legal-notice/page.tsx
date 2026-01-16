"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";

const LegalNoticePage = () => {
  const { t } = useTranslation();
  const companyInfo: string[] = t("legalNotice.companyInfo", { returnObjects: true }) as string[];
  const usePoints: string[] = t("legalNotice.use", { returnObjects: true }) as string[];

  return (
    <main>
      <Breadcrumb pageName={t("legalNotice.title", "Legal Notice")} />
      <section className="relative z-10 bg-white py-16 dark:bg-dark">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("legalNotice.updated")}</p>

            <h2>{t("legalNotice.title")}</h2>
            <p>{t("legalNotice.intro")}</p>

            <h3>{t("legalNotice.companyInfoTitle")}</h3>
            <ul>
              {companyInfo.map((item, idx) => (
                <li key={`ci-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("legalNotice.useTitle")}</h3>
            <ul>
              {usePoints.map((item, idx) => (
                <li key={`us-${idx}`}>{item}</li>
              ))}
            </ul>

            <h3>{t("legalNotice.liabilityTitle")}</h3>
            <p>{t("legalNotice.liability")}</p>

            <h3>{t("legalNotice.ipTitle")}</h3>
            <p>{t("legalNotice.ip")}</p>

            <h3>{t("legalNotice.contactTitle")}</h3>
            <p>
              {t("legalNotice.contact")} {" "}
              <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
            </p>

            <h3>{t("legalNotice.changesTitle")}</h3>
            <p>{t("legalNotice.changes")}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalNoticePage;
