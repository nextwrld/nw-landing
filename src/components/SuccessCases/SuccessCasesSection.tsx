"use client";
import SectionTitle from "../Common/SectionTitle";
import SingleSuccessCase from "./SingleSuccessCase";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import type { SuccessCase } from "@/types/success-case";

const SuccessCasesSection = ({ cases }: { cases: SuccessCase[] }) => {
  const locale = useLocale();
  const { t } = useTranslation("common", { lng: locale });

  return (
    <section id="success-cases" className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle={t('successCases.subtitle')}
            title={t('successCases.title')}
            paragraph={t('successCases.description')}
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap">
          {cases.slice(0, 3).map((successCase) => (
            <div key={successCase.slug} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleSuccessCase successCase={successCase} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesSection;