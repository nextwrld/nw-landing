"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import PlanCard from "@/components/PlanCard";

const Pricing = () => {
  const { t } = useTranslation('common');

  const plan1Features = t('pricing.plan1.features', { returnObjects: true }) as string[];
  const plan2Features = t('pricing.plan2.features', { returnObjects: true }) as string[];

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-[60px] text-center">
          <span className="mb-2 block text-lg font-semibold text-primary">
            {t('pricing.subtitle')}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
            {t('pricing.title')}
          </h2>
          <p className="mx-auto max-w-[600px] text-base text-body-color dark:text-dark-6">
            {t('pricing.paragraph')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PlanCard
            variant="default"
            label={t('pricing.plan1.type')}
            title={t('pricing.plan1.name')}
            description={t('pricing.plan1.description')}
            features={plan1Features}
            featuresTitle={t('pricing.includes')}
            ctaLabel={t('pricing.plan1.cta')}
            ctaHref="/#contact"
          />
          <PlanCard
            variant="highlighted"
            label={t('pricing.plan2.type')}
            title={t('pricing.plan2.name')}
            description={t('pricing.plan2.description')}
            features={plan2Features}
            featuresTitle={t('pricing.includes')}
            ctaLabel={t('pricing.plan2.cta')}
            ctaHref="https://calendar.app.google/JQnkVUqK3FF5VSRU6"
            ctaTarget="_blank"
            badge={t('pricing.plan2.badge')}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-base text-body-color dark:text-dark-6">
            {t('pricing.footerNote', 'Tienes un proyecto específico en mente?')}{' '}
            <Link href="/#contact" className="font-semibold text-primary hover:underline">
              {t('pricing.contactUs')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
