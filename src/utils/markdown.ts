import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import type { Blog } from "@/types/blog";
import type { SuccessCase } from "@/types/success-case";

const successCasesDirectory = join(process.cwd(), "markdown/success-cases");

export function getSuccessCaseSlugs(locale: string = "es") {
  const localeDirectory = join(successCasesDirectory, locale);
  if (!fs.existsSync(localeDirectory)) {
    return [];
  }
  return fs.readdirSync(localeDirectory);
}

type SuccessCaseResult = Partial<SuccessCase> & { metadata?: Record<string, unknown> };

export function getSuccessCaseBySlug(slug: string, locale: string = "es", fields: string[] = []): SuccessCaseResult | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const localeDirectory = join(successCasesDirectory, locale);
  const fullPath = join(localeDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: SuccessCaseResult = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items.slug = realSlug;
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

export function getAllSuccessCases(locale: string = "es", fields: string[] = []): SuccessCaseResult[] {
  const slugs = getSuccessCaseSlugs(locale);
  return slugs
    .map((slug) => getSuccessCaseBySlug(slug, locale, fields))
    .filter((item): item is SuccessCaseResult => item !== null)
    .sort((a, b) => ((a.date || "") > (b.date || "") ? -1 : 1));
}

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory);
}

type PostResult = Partial<Blog> & {
  author?: string;
  authorImage?: string;
  content?: string;
  metadata?: Record<string, unknown>;
};

export function getPostBySlug(slug: string, fields: string[] = []): PostResult | null {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: PostResult = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items.slug = realSlug;
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
