import fs from "fs";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  getAllSuccessCases,
  getSuccessCaseBySlug,
  getPostBySlug,
  getSuccessCaseSlugs,
} from "@/utils/markdown";
import { InvalidContentPathError } from "@/utils/validate";
import { FrontmatterError, validateSuccessCaseFrontmatter } from "@/utils/frontmatter";

let readSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  readSpy = vi.spyOn(fs, "readFileSync");
});

afterEach(() => {
  readSpy.mockRestore();
});

describe("markdown loader path validation", () => {
  it.each(["es", "en"] as const)("reads an existing success case for locale %s", (locale) => {
    const result = getSuccessCaseBySlug("crm", locale, ["title"]);
    expect(result?.title).toBeTruthy();
    expect(readSpy).toHaveBeenCalled();
  });

  it("returns null for a well-formed but unknown slug", () => {
    expect(getSuccessCaseBySlug("does-not-exist", "es", ["title"])).toBeNull();
  });

  it.each(["../blogs", "..", "../../", "foo", "es/../blogs", "ES", "es ", ""])(
    "rejects unsupported locale %j before disk access",
    (locale) => {
      readSpy.mockClear();
      expect(() => getSuccessCaseBySlug("crm", locale as never, ["title"])).toThrow(
        InvalidContentPathError
      );
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it.each(["..", "../blogs", "../../", "foo/bar", "foo\\bar", "crm.mdx", "", "%2e%2e"])(
    "rejects invalid slug %j before disk access",
    (slug) => {
      readSpy.mockClear();
      expect(() => getSuccessCaseBySlug(slug, "es", ["title"])).toThrow(
        InvalidContentPathError
      );
      expect(readSpy).not.toHaveBeenCalled();
    }
  );

  it("list slugs only for supported locales", () => {
    expect(getSuccessCaseSlugs("es")).toEqual(expect.arrayContaining(["crm"]));
    expect(() => getSuccessCaseSlugs("abc" as never)).toThrow(InvalidContentPathError);
  });

  it("getAllSuccessCases works per locale with clean slugs", () => {
    const cases = getAllSuccessCases("en", ["slug", "title"]);
    expect(cases.length).toBeGreaterThan(0);
    for (const item of cases) {
      expect(item.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(item.title).toBeTruthy();
    }
  });

  it("rejects blog slugs before disk access", () => {
    readSpy.mockClear();
    expect(() => getPostBySlug("../blogs/contact-form", [])).toThrow(
      InvalidContentPathError
    );
    expect(readSpy).not.toHaveBeenCalled();
  });
});

describe("success case frontmatter validation", () => {
  const validData = {
    title: "InmoCRM",
    description: "A real estate platform",
    slug: "crm",
    locale: "es",
    date: "2024-06-12",
  };

  it("accepts a complete valid frontmatter", () => {
    expect(() =>
      validateSuccessCaseFrontmatter("crm", "es", validData, "markdown/success-cases/es/crm.mdx")
    ).not.toThrow();
  });

  it.each([
    [{ ...validData, title: "" }, "empty title"],
    [{ ...validData, description: "" }, "empty description"],
    [{ ...validData, slug: "other" }, "mismatched slug"],
    [{ ...validData, locale: "en" }, "mismatched locale"],
    [{ ...validData, date: "12/06/2024" }, "invalid date"],
    [{ ...validData, date: "2024-02-30" }, "impossible date"],
  ])("rejects %s with FrontmatterError", (data) => {
    expect(() =>
      validateSuccessCaseFrontmatter("crm", "es", data, "markdown/success-cases/es/crm.mdx")
    ).toThrow(FrontmatterError);
  });

  it("loads all six published cases without frontmatter errors", () => {
    const es = getAllSuccessCases("es", ["slug", "title", "description"]);
    const en = getAllSuccessCases("en", ["slug", "title", "description"]);
    expect(es.length).toBe(3);
    expect(en.length).toBe(3);
    for (const item of [...es, ...en]) {
      expect(item.slug).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });
});