import type { Feature } from "@/types/feature";
import { LightBulbIcon, CpuChipIcon, ServerStackIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Dictionary } from "@/i18n/dictionaries";

export const buildFeaturesData = (features: Dictionary["features"]): Feature[] => [
  {
    id: 1,
    icon: <LightBulbIcon className="w-10 h-10 text-white" />,
    title: features.feature1.title,
    paragraph: features.feature1.paragraph,
  },
  {
    id: 2,
    icon: <CpuChipIcon className="w-10 h-10 text-white" />,
    title: features.feature2.title,
    paragraph: features.feature2.paragraph,
  },
  {
    id: 3,
    icon: <ServerStackIcon className="w-10 h-10 text-white" />,
    title: features.feature3.title,
    paragraph: features.feature3.paragraph,
  },
  {
    id: 4,
    icon: <ShieldCheckIcon className="w-10 h-10 text-white" />,
    title: features.feature4.title,
    paragraph: features.feature4.paragraph,
  },
];
