import SectionTitle from "../Common/SectionTitle";
import SingleSuccessCase from "./SingleSuccessCase";
import type { SuccessCase } from "@/types/success-case";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const SuccessCasesSection = ({
  dict,
  cases,
  locale,
}: {
  dict: Dictionary["successCases"];
  cases: SuccessCase[];
  locale: Locale;
}) => {
  return (
    <section id="success-cases" className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle={dict.subtitle}
            title={dict.title}
            paragraph={dict.description}
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