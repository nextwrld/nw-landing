import SuccessCaseContent from "@/components/SuccessCases/SuccessCaseContent";
import { getAllSuccessCases } from "@/utils/markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  return {
    title: `Success Case | Next Wrld`,
    description: "Real solutions for real businesses",
  };
}

export default async function SuccessCasePage({ params }: Props) {
  const { slug } = await params;

  return <SuccessCaseContent slug={slug} />;
}

// Generate static params for all success cases
export async function generateStaticParams() {
  const slugsES = getAllSuccessCases("es", ["slug"]);
  const slugsEN = getAllSuccessCases("en", ["slug"]);

  const allSlugs = Array.from(new Set([
    ...slugsES.map(c => c.slug),
    ...slugsEN.map(c => c.slug)
  ]));

  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}
