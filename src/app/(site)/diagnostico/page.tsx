import { Metadata } from "next";
import Hero from "@/components/Diagnostico/Hero";
import Audience from "@/components/Diagnostico/Audience";
import Checklist from "@/components/Diagnostico/Checklist";
import Outcomes from "@/components/Diagnostico/Outcomes";
import Modelo from "@/components/Diagnostico/Modelo";
import DiagnosticoContact from "@/components/Diagnostico/ContactWrapper";

export const metadata: Metadata = {
  title: "Diagnóstico Operativo | Next Wrld",
  description:
    "Diagnosticamos tu operación para encontrar fugas de tiempo, procesos rotos y oportunidades de escalar sin aumentar tu equipo.",
};

const DiagnosticoPage = () => {
  return (
    <>
      <Hero />
      <Audience />
      <Checklist />
      <Outcomes />
      <Modelo />
      <div id="contacto-diagnostico">
        <DiagnosticoContact />
      </div>
    </>
  );
};

export default DiagnosticoPage;
