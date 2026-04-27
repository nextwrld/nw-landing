"use client";

import { useTranslation } from "react-i18next";
import { LightBulbIcon } from "@heroicons/react/24/outline";

const Outcomes = () => {
  const { t } = useTranslation("common");
  const items = t("diagnostico.outcomes.items", { returnObjects: true }) as string[];

  return (
    <section className="bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]">
      <div className="container">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
            {t("diagnostico.outcomes.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-stroke bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md dark:border-dark-3 dark:bg-dark-2"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LightBulbIcon className="h-5 w-5" />
              </div>
              <p className="text-base font-medium text-body-color dark:text-dark-6">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
