"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SingleFaq = (props: { question: string; answer: string }) => {
  const { question, answer } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 flex w-full flex-col overflow-hidden rounded-lg border border-stroke bg-white dark:border-dark-3 dark:bg-dark-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left transition-all hover:bg-gray-50 dark:hover:bg-dark-3"
      >
        <h3 className="pr-4 text-base font-semibold text-dark dark:text-white lg:text-lg">
          {question}
        </h3>
        <ChevronDownIcon
          className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-stroke px-6 pb-6 pt-4 dark:border-dark-3">
          <p className="text-base leading-relaxed text-body-color dark:text-dark-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFaq;
