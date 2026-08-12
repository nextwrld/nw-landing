import Contact from "@/components/Contact";
import { buildDiagnosticoContactCopy } from "@/components/Contact/contactCopy";
import type { Dictionary } from "@/i18n/dictionaries";

const DiagnosticoContact = ({ dict }: { dict: Dictionary }) => {
  return (
    <Contact
      source="diagnostico"
      copy={buildDiagnosticoContactCopy(dict.contact, dict.diagnostico.cta)}
    />
  );
};

export default DiagnosticoContact;
