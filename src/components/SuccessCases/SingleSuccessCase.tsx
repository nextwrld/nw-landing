import { SuccessCase } from "@/types/success-case";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const SingleSuccessCase = ({ successCase }: { successCase: SuccessCase }) => {
  const { title, coverImage, excerpt, date, slug } = successCase;

  return (
    <div className="wow fadeInUp group mb-10" data-wow-delay=".1s">
      {coverImage && (
        <div className="mb-8 overflow-hidden rounded">
          <Link href={`/success-cases/${slug}`} aria-label="success case cover" className="block">
            <Image
              src={coverImage}
              alt="image"
              className="w-full transition group-hover:rotate-6 group-hover:scale-125"
              width={408}
              height={272}
            />
          </Link>
        </div>
      )}
      <div>
        <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
          {(() => {
            const parsed = typeof date === "string" ? parseISO(date) : new Date(date as unknown as string);
            return parsed instanceof Date && !isNaN(parsed.getTime())
              ? format(parsed, "dd MMM yyyy")
              : "";
          })()}
        </span>
        <h3>
          <Link
            href={`/success-cases/${slug}`}
            className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <p className="text-base text-body-color dark:text-dark-6">{excerpt}</p>
      </div>
    </div>
  );
};

export default SingleSuccessCase;
