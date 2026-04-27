"use client";

import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

interface PlanCardProps {
  variant: "default" | "highlighted";
  label: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  ctaTarget?: string;
  sectionId?: string;
  className?: string;
  featuresTitle?: string;
}

const PlanCard = ({
  variant,
  label,
  title,
  description,
  features,
  ctaLabel,
  ctaHref,
  badge,
  ctaTarget,
  sectionId,
  className = "",
  featuresTitle,
}: PlanCardProps) => {
  const isHighlighted = variant === "highlighted";

  const containerClasses = isHighlighted
    ? "group relative flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-dark-2 lg:p-10"
    : "group relative flex flex-col overflow-hidden rounded-2xl border-2 border-stroke bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-xl dark:border-dark-3 dark:bg-dark-2 lg:p-10";

  return (
    <div id={sectionId} className={`${containerClasses} ${className}`}>
      {badge && (
        <div className="absolute right-0 top-8 rounded-l-full bg-primary px-6 py-2">
          <span className="text-sm font-semibold text-white">{badge}</span>
        </div>
      )}

      <div className={`mb-6 ${badge ? "mt-8" : ""}`}>
        <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          {label}
        </span>
        <h3 className="mb-3 text-2xl font-bold text-dark dark:text-white lg:text-3xl">
          {title}
        </h3>
        <p className="text-base text-body-color dark:text-dark-6">
          {description}
        </p>
      </div>

      <div className="mb-8 flex-1">
        {featuresTitle && (
          <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
            {featuresTitle}
          </h4>
        )}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-base text-body-color dark:text-dark-6">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={ctaHref}
        target={ctaTarget}
        rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
        className="block w-full rounded-lg bg-primary px-6 py-4 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
      >
        {ctaLabel}
      </Link>
    </div>
  );
};

export default PlanCard;
