"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowPathIcon, SparklesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const CallToAction = () => {
  const { t } = useTranslation('common');

  return (
    <section className="relative z-10 overflow-hidden bg-primary py-20 lg:py-[115px]">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          {/* Header */}
          <div className="mx-auto max-w-[700px] text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
              <span>{t('callToAction.title')}</span>
              <span className="block text-3xl font-normal md:text-[40px] mt-2">
                {t('callToAction.subtitle')}
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-secondary/50 hover:shadow-xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors duration-300">
                  <ArrowPathIcon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t('callToAction.bulletPoints.bullet1.title')}
              </h3>
              <p className="text-base leading-relaxed text-white/80">
                {t('callToAction.bulletPoints.bullet1.description')}
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-secondary/50 hover:shadow-xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors duration-300">
                  <SparklesIcon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t('callToAction.bulletPoints.bullet2.title')}
              </h3>
              <p className="text-base leading-relaxed text-white/80">
                {t('callToAction.bulletPoints.bullet2.description')}
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-secondary/50 hover:shadow-xl">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors duration-300">
                  <RocketLaunchIcon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t('callToAction.bulletPoints.bullet3.title')}
              </h3>
              <p className="text-base leading-relaxed text-white/80">
                {t('callToAction.bulletPoints.bullet3.description')}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg border border-transparent bg-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#0BB489] hover:shadow-xl hover:scale-105"
            >
              {t('callToAction.cta')}
            </Link>
          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default CallToAction;
