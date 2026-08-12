import PlanCard from "@/components/PlanCard";
import { CALENDAR_URL } from "@/constants/links";
import type { Dictionary } from "@/i18n/dictionaries";

const Modelo = ({ dict }: { dict: Dictionary["diagnostico"]["model"] }) => {
  return (
    <section
      id="modelo-trabajo"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px]">
            {dict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PlanCard
            variant="default"
            label=""
            title={dict.plan1.title}
            description={dict.plan1.description}
            features={[]}
            ctaLabel={dict.plan1.cta}
            ctaHref={CALENDAR_URL}
            ctaTarget="_blank"
          />
          <PlanCard
            variant="highlighted"
            label=""
            title={dict.plan2.title}
            description={dict.plan2.description}
            features={[]}
            ctaLabel={dict.plan2.cta}
            ctaHref={CALENDAR_URL}
            ctaTarget="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default Modelo;