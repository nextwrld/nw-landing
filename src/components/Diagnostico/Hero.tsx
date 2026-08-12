"use client";

import { CALENDAR_URL } from "@/constants/links";
import type { Dictionary } from "@/i18n/dictionaries";

const Hero = ({ dict }: { dict: Dictionary["diagnostico"]["hero"] }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container">
        <div className="mx-auto max-w-[780px] text-center">
          <h1 className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
            {dict.title}
          </h1>
          <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]">
            {dict.subtitle}
          </p>
          <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
            <li>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
              >
                {dict.primaryCTA}
              </a>
            </li>
            <li>
              <button
                onClick={() => scrollTo("modelo-trabajo")}
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-7 py-[14px] text-center text-base font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:text-dark"
              >
                {dict.secondaryCTA}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;