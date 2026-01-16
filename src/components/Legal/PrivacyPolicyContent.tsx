"use client";

import { useTranslation } from "react-i18next";

const PrivacyPolicyContent = () => {
  const { t } = useTranslation();
  const rights: string[] = t("privacyPolicy.rights", { returnObjects: true }) as string[];
  const dataCollected: string[] = t("privacyPolicy.dataCollected", { returnObjects: true }) as string[];
  const usage: string[] = t("privacyPolicy.usage", { returnObjects: true }) as string[];

  return (
    <section className="relative z-10 bg-white py-16 dark:bg-dark">
      <div className="container">
        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("privacyPolicy.updated")}</p>

          <h2>{t("privacyPolicy.title")}</h2>
          <p>{t("privacyPolicy.intro")}</p>

          <h3>{t("privacyPolicy.dataCollectedTitle")}</h3>
          <ul>
            {dataCollected.map((item, idx) => (
              <li key={`dc-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{t("privacyPolicy.usageTitle")}</h3>
          <ul>
            {usage.map((item, idx) => (
              <li key={`us-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{t("privacyPolicy.cookiesTitle")}</h3>
          <p>{t("privacyPolicy.cookies")}</p>

          <h3>{t("privacyPolicy.legalBasisTitle")}</h3>
          <p>{t("privacyPolicy.legalBasis")}</p>

          <h3>{t("privacyPolicy.sharingTitle")}</h3>
          <p>{t("privacyPolicy.sharing")}</p>

          <h3>{t("privacyPolicy.retentionTitle")}</h3>
          <p>{t("privacyPolicy.retention")}</p>

          <h3>{t("privacyPolicy.rightsTitle")}</h3>
          <ul>
            {rights.map((item, idx) => (
              <li key={`ri-${idx}`}>{item}</li>
            ))}
          </ul>

          <h3>{t("privacyPolicy.securityTitle")}</h3>
          <p>{t("privacyPolicy.security")}</p>

          <h3>{t("privacyPolicy.contactTitle")}</h3>
          <p>
            {t("privacyPolicy.contact")} {" "}
            <a href="mailto:privacy@nextwrld.com">privacy@nextwrld.com</a>.
          </p>

          <h3>{t("privacyPolicy.changesTitle")}</h3>
          <p>{t("privacyPolicy.changes")}</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
