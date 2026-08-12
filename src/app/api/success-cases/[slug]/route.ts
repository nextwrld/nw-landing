import { getSuccessCaseBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { defaultLocale, isLocale } from "@/i18n/config";
import { isValidSlug } from "@/utils/validate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const rawLocale = request.nextUrl.searchParams.get("locale");
  const locale = rawLocale === null ? defaultLocale : rawLocale;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const successCase = getSuccessCaseBySlug(slug, locale, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  if (!successCase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = await markdownToHtml(successCase.content || "");

  return NextResponse.json({
    ...successCase,
    content,
  });
}