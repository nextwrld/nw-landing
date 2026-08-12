import Link from "next/link";
import PlanCard from "@/components/PlanCard";
import { CALENDAR_URL } from "@/constants/links";
import { localizedHref } from "@/utils/i18n-url";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const Pricing = ({
  dict,
  locale,
}: {
  dict: Dictionary["pricing"];
  locale: Locale;
}) => {
  const contactHref = localizedHref(locale, "/#contact");

  const plan1Features = dict.plan1.features;
  const plan2Features = dict.plan2.features;

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-[60px] text-center">
          <span className="mb-2 block text-lg font-semibold text-primary">
            {dict.subtitle}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
            {dict.title}
          </h2>
          <p className="mx-auto max-w-[600px] text-base text-body-color dark:text-dark-6">
            {dict.paragraph}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PlanCard
            variant="default"
            label={dict.plan1.type}
            title={dict.plan1.name}
            description={dict.plan1.description}
            features={plan1Features}
            featuresTitle={dict.includes}
            ctaLabel={dict.plan1.cta}
            ctaHref={contactHref}
          />
          <PlanCard
            variant="highlighted"
            label={dict.plan2.type}
            title={dict.plan2.name}
            description={dict.plan2.description}
            features={plan2Features}
            featuresTitle={dict.includes}
            ctaLabel={dict.plan2.cta}
            ctaHref={CALENDAR_URL}
            ctaTarget="_blank"
            badge={dict.plan2.badge}
            ctaTrack={{ event: "calendar_booking_click", params: { cta_location: "pricing" } }}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-base text-body-color dark:text-dark-6">
            {dict.footerNote}{" "}
            <Link href={contactHref} className="font-semibold text-primary hover:underline">
              {dict.contactUs}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
