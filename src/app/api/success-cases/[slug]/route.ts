import { getSuccessCaseBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "es";

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
