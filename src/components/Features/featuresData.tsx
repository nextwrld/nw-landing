'use client';
import { Feature } from "@/types/feature";
import { useTranslation } from "react-i18next";
import { LightBulbIcon, CpuChipIcon, ServerStackIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const useFeaturesData = (): Feature[] => {
  const { t } = useTranslation('common');

  return [
  {
    id: 1,
    icon: <LightBulbIcon className="w-10 h-10 text-white" />,
    title: t('features.feature1.title'),
    paragraph: t('features.feature1.paragraph'),
  },
  {
    id: 2,
    icon: <CpuChipIcon className="w-10 h-10 text-white" />,
    title: t('features.feature2.title'),
    paragraph: t('features.feature2.paragraph'),
  },
  {
    id: 3,
    icon: <ServerStackIcon className="w-10 h-10 text-white" />,
    title: t('features.feature3.title'),
    paragraph: t('features.feature3.paragraph'),
  },
  {
    id: 4,
    icon: <ShieldCheckIcon className="w-10 h-10 text-white" />,
    title: t('features.feature4.title'),
    paragraph: t('features.feature4.paragraph'),
  },
  ];
};
