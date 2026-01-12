"use client";
import SectionTitle from "../Common/SectionTitle";
import SingleSuccessCase from "./SingleSuccessCase";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const SuccessCasesSection = ({ casesES, casesEN }: { casesES: any[], casesEN: any[] }) => {
  const { t, i18n } = useTranslation('common');

  // Select cases based on current language
  const cases = useMemo(() => {
    return i18n.language === 'en' ? casesEN : casesES;
  }, [i18n.language, casesES, casesEN]);

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
          {cases.slice(0, 3).map((successCase: any, i: number) => (
            <div key={i} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleSuccessCase successCase={successCase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesSection;
