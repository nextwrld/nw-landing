import { describe, expect, it } from "vitest";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import markdownToHtml from "@/utils/markdownToHtml";
import { getAllSuccessCases, getSuccessCaseBySlug } from "@/utils/markdown";
import { getDictionary } from "@/i18n/dictionaries";

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

describe("markdown content pipeline (CONTENT-002)", () => {
  it("keeps only .md sources in markdown/", () => {
    const files = walk(path.join(process.cwd(), "markdown"));
    expect(files.length).toBeGreaterThan(0);
    expect(files.filter((f) => f.endsWith(".mdx"))).toEqual([]);
    expect(files.every((f) => f.endsWith(".md"))).toBe(true);
  });

  it("loads every case from .md with validated frontmatter", () => {
    for (const locale of ["es", "en"] as const) {
      const cases = getAllSuccessCases(locale, ["slug", "title"]);
      expect(cases.length).toBe(3);
    }
    expect(getSuccessCaseBySlug("crm", "es", ["title"])?.title).toBeTruthy();
  });

  it("renders the GFM tables required by the case content", async () => {
    const html = await markdownToHtml("| A | B |\n| --- | --- |\n| 1 | 2 |");
    expect(html).toContain("<table>");
  });
});

describe("content dictionary (CONTENT-001)", () => {
  it("has no leftover blog section", async () => {
    const es = await getDictionary("es");
    expect(es).not.toHaveProperty("blog");
  });
});
