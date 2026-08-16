import Hero from "@/components/Diagnostico/Hero";
import Audience from "@/components/Diagnostico/Audience";
import Checklist from "@/components/Diagnostico/Checklist";
import Outcomes from "@/components/Diagnostico/Outcomes";
import Modelo from "@/components/Diagnostico/Modelo";
import Diagnosis from "@/components/HomeExperience/Diagnosis";
import { getHomepageContent } from "@/content/homepage";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/**
 * The context-first diagnosis experience (offer sections + form), rendered at
 * the localized diagnosis route: /es/diagnostico and /en/diagnosis. The
 * dictionary is resolved by the page and passed down so the component stays
 * synchronous (server-first).
 */
const DiagnosisExperience = ({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) => (
  <>
    <Hero dict={dict.diagnostico.hero} />
    <Audience dict={dict.diagnostico.audience} />
    <Checklist dict={dict.diagnostico.review} />
    <Outcomes dict={dict.diagnostico.outcomes} />
    <Modelo dict={dict.diagnostico.model} />
    <div id="contacto-diagnostico">
      <Diagnosis content={getHomepageContent(locale).diagnosis} locale={locale} />
    </div>
  </>
);

export default DiagnosisExperience;
