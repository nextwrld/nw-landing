import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const successCasesDirectory = join(process.cwd(), "markdown/success-cases");

export function getSuccessCaseSlugs(locale: string = "es") {
  const localeDirectory = join(successCasesDirectory, locale);
  if (!fs.existsSync(localeDirectory)) {
    return [];
  }
  return fs.readdirSync(localeDirectory);
}

export function getSuccessCaseBySlug(slug: string, locale: string = "es", fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const localeDirectory = join(successCasesDirectory, locale);
  const fullPath = join(localeDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | object;
  };

  const items: any = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // Return raw content - will be processed by markdownToHtml
      items[field] = content;
    }

    if (field === "metadata") {
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllSuccessCases(locale: string = "es", fields: string[] = []) {
  const slugs = getSuccessCaseSlugs(locale);
  const cases = slugs
    .map((slug) => getSuccessCaseBySlug(slug, locale, fields))
    .filter((item) => item !== null)
    // sort cases by date in descending order
    .sort((case1, case2) => (case1.date > case2.date ? -1 : 1));

  return cases;
}

// Legacy blog functions (keep for backwards compatibility if needed)
const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | object;
  };

  const items: any = {};

  function processImages(content: string) {
    return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
  }

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = processImages(content);
    }

    if (field === "metadata") {
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((item) => item !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
