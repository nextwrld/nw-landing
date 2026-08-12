import type { Locale } from "@/i18n/config";

export class FrontmatterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FrontmatterError";
  }
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateString(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateSuccessCaseFrontmatter(
  slug: string,
  locale: Locale,
  data: Record<string, unknown>,
  filePath: string
): void {
  const problems: string[] = [];

  if (typeof data.title !== "string" || data.title.trim() === "") {
    problems.push("title must be a non-empty string");
  }
  if (typeof data.description !== "string" || data.description.trim() === "") {
    problems.push("description must be a non-empty string");
  }
  if (data.slug !== slug) {
    problems.push(`slug must equal the filename slug "${slug}"`);
  }
  if (data.locale !== locale) {
    problems.push(`locale must equal the parent directory locale "${locale}"`);
  }
  if (typeof data.date !== "string" || !isValidDateString(data.date)) {
    problems.push("date must be a valid YYYY-MM-DD string");
  }

  if (problems.length > 0) {
    throw new FrontmatterError(
      `Invalid success case frontmatter in ${filePath}: ${problems.join("; ")}`
    );
  }
}