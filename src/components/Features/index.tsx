'use client';

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { useFeaturesData } from "./featuresData";
import { useTranslation } from 'react-i18next';


const Features = () => {
  const { t } = useTranslation('common');
  const featuresData = useFeaturesData();
  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle={t('features.title')}
          title={t('features.subtitle')}
          paragraph={t('features.description')}
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
