import Breadcrumb from "@/components/Common/Breadcrumb";
import PrivacyPolicyContent from "@/components/Legal/PrivacyPolicyContent";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Next Wrld",
  description:
    "Conoce cómo recopilamos, usamos y protegemos tus datos personales en Next Wrld.",
};

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const lng = cookieStore.get("language")?.value;
  const pageName = lng === "en" ? "Privacy Policy" : "Política de Privacidad";

  return (
    <main>
      <Breadcrumb pageName={pageName} />
      <PrivacyPolicyContent />
    </main>
  );
}
 
