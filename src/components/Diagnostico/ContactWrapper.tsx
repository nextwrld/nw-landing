"use client";

import { useTranslation } from "react-i18next";
import Contact from "@/components/Contact";

const DiagnosticoContact = () => {
  const { t } = useTranslation("common");

  return (
    <Contact
      title={t("diagnostico.cta.title")}
      formTitle={t("diagnostico.cta.formTitle")}
      subtitle={t("diagnostico.cta.subtitle")}
      placeholder={t("diagnostico.cta.placeholder")}
      buttonText={t("diagnostico.cta.buttonText")}
    />
  );
};

export default DiagnosticoContact;
