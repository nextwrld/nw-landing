"use client";

import { useTranslation } from "react-i18next";
import PlanCard from "@/components/PlanCard";

const CALENDAR_URL = "https://calendar.app.google/JQnkVUqK3FF5VSRU6";

const Modelo = () => {
  const { t } = useTranslation("common");

  return (
    <section
      id="modelo-trabajo"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
            {t("diagnostico.model.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PlanCard
            variant="default"
            label=""
            title={t("diagnostico.model.plan1.title")}
            description={t("diagnostico.model.plan1.description")}
            features={[]}
            ctaLabel={t("diagnostico.model.plan1.cta")}
            ctaHref={CALENDAR_URL}
            ctaTarget="_blank"
          />
          <PlanCard
            variant="highlighted"
            label=""
            title={t("diagnostico.model.plan2.title")}
            description={t("diagnostico.model.plan2.description")}
            features={[]}
            ctaLabel={t("diagnostico.model.plan2.cta")}
            ctaHref={CALENDAR_URL}
            ctaTarget="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default Modelo;
