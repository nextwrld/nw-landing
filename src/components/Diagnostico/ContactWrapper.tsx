"use client";

import { useTranslation } from "react-i18next";
import Contact from "@/components/Contact";
import { useLocale } from "@/hooks/useLocale";

const DiagnosticoContact = () => {
  const locale = useLocale();
  const { t } = useTranslation("common", { lng: locale });

  return (
    <Contact
      source="diagnostico"
      title={t("diagnostico.cta.title")}
      formTitle={t("diagnostico.cta.formTitle")}
      subtitle={t("diagnostico.cta.subtitle")}
      placeholder={t("diagnostico.cta.placeholder")}
      buttonText={t("diagnostico.cta.buttonText")}
    />
  );
};

export default DiagnosticoContact;
