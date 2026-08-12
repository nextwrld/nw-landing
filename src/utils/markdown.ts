import fs from "fs";
import matter from "gray-matter";
import { join, resolve, sep } from "path";
import type { Blog } from "@/types/blog";
import type { SuccessCase } from "@/types/success-case";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { InvalidContentPathError, isValidSlug } from "@/utils/validate";
import { validateSuccessCaseFrontmatter } from "@/utils/frontmatter";

const contentRoot = join(process.cwd(), "markdown");
const successCasesDirectory = join(contentRoot, "success-cases");
const postsDirectory = join(contentRoot, "blogs");

function assertInside(baseDirectory: string, candidate: string): void {
  const base = resolve(baseDirectory);
  const candidatePath = resolve(candidate);
  const baseWithSep = base.endsWith(sep) ? base : `${base}${sep}`;
  if (candidatePath !== base && !candidatePath.startsWith(baseWithSep)) {
    throw new InvalidContentPathError(
      `Resolved path escapes the allowed directory: ${candidatePath}`
    );
  }
}

function assertLocaleValid(locale: Locale): void {
  if (!isLocale(locale)) {
    throw new InvalidContentPathError(`Unsupported locale: ${String(locale)}`);
  }
}

function resolveSuccessCasePath(locale: Locale, slug: string): string {
  assertLocaleValid(locale);
  if (!isValidSlug(slug)) {
    throw new InvalidContentPathError(`Invalid success case slug: ${String(slug)}`);
  }
  const candidate = resolve(successCasesDirectory, locale, `${slug}.mdx`);
  assertInside(successCasesDirectory, candidate);
  return candidate;
}

function resolvePostPath(slug: string): string {
  if (!isValidSlug(slug)) {
    throw new InvalidContentPathError(`Invalid post slug: ${String(slug)}`);
  }
  const candidate = resolve(postsDirectory, `${slug}.mdx`);
  assertInside(postsDirectory, candidate);
  return candidate;
}

function listSources(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.slice(0, -4));
}

export function getSuccessCaseSlugs(locale: Locale = defaultLocale): string[] {
  assertLocaleValid(locale);
  return listSources(join(successCasesDirectory, locale));
}

type SuccessCaseResult = Partial<SuccessCase> & { metadata?: Record<string, unknown> };

export function getSuccessCaseBySlug(
  slug: string,
  locale: Locale = defaultLocale,
  fields: string[] = []
): SuccessCaseResult | null {
  const fullPath = resolveSuccessCasePath(locale, slug);

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  validateSuccessCaseFrontmatter(slug, locale, data, fullPath);

  const items: SuccessCaseResult = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items.slug = slug;
    } else if (field === "content") {
      items.content = content;
    } else if (field === "metadata") {
      items.metadata = { ...data, coverImage: data.coverImage || null };
    } else if (typeof data[field] !== "undefined") {
      (items as Record<string, unknown>)[field] = data[field];
    }
  });

  return items;
}

export function getAllSuccessCases(
  locale: Locale = defaultLocale,
  fields: string[] = []
): SuccessCaseResult[] {
  const slugs = getSuccessCaseSlugs(locale);
  return slugs
    .map((slug) => getSuccessCaseBySlug(slug, locale, fields))
    .filter((item): item is SuccessCaseResult => item !== null)
    .sort((a, b) => ((a.date || "") > (b.date || "") ? -1 : 1));
}

export function getPostSlugs(): string[] {
  return listSources(postsDirectory);
}

type PostResult = Partial<Blog> & {
  author?: string;
  authorImage?: string;
  content?: string;
  metadata?: Record<string, unknown>;
};

export function getPostBySlug(slug: string, fields: string[] = []): PostResult | null {
  const fullPath = resolvePostPath(slug);

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: PostResult = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items.slug = slug;
    } else if (field === "content") {
      items.content = content;
    } else if (field === "metadata") {
      items.metadata = { ...data, coverImage: data.coverImage || null };
    } else if (typeof data[field] !== "undefined") {
      (items as Record<string, unknown>)[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []): PostResult[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((item): item is PostResult => item !== null)
    .sort((a, b) => ((a.date || "") > (b.date || "") ? -1 : 1));
}