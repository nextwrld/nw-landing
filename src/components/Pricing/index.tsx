"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

const Pricing = () => {
  const { t } = useTranslation('common');

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
          {/* Plan 1: Cimentación Digital */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-stroke bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl dark:border-dark-3 dark:bg-dark-2 lg:p-10">
            <div className="mb-6">
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {t('pricing.plan1.type')}
              </span>
              <h3 className="mb-3 text-2xl font-bold text-dark dark:text-white lg:text-3xl">
                {t('pricing.plan1.name')}
              </h3>
              <p className="text-base text-body-color dark:text-dark-6">
                {t('pricing.plan1.description')}
              </p>
            </div>

            <div className="mb-8 flex-1">
              <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Incluye:
              </h4>
              <ul className="space-y-3">
                {(t('pricing.plan1.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-base text-body-color dark:text-dark-6">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="block w-full rounded-lg bg-primary px-6 py-4 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              {t('pricing.plan1.cta')}
            </Link>
          </div>

          {/* Plan 2: Evolución & Escala */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-dark-2 lg:p-10">
            {/* Badge */}
            <div className="absolute right-0 top-8 rounded-l-full bg-primary px-6 py-2">
              <span className="text-sm font-semibold text-white">
                {t('pricing.plan2.badge')}
              </span>
            </div>

            <div className="mb-6 mt-8">
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {t('pricing.plan2.type')}
              </span>
              <h3 className="mb-3 text-2xl font-bold text-dark dark:text-white lg:text-3xl">
                {t('pricing.plan2.name')}
              </h3>
              <p className="text-base text-body-color dark:text-dark-6">
                {t('pricing.plan2.description')}
              </p>
            </div>

            <div className="mb-8 flex-1">
              <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Incluye:
              </h4>
              <ul className="space-y-3">
                {(t('pricing.plan2.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-base text-body-color dark:text-dark-6">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="block w-full rounded-lg bg-primary px-6 py-4 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              {t('pricing.plan2.cta')}
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-base text-body-color dark:text-dark-6">
            ¿Tienes un proyecto específico en mente?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              {t('pricing.contactUs')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
