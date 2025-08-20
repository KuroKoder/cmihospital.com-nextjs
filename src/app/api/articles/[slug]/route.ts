// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/app/lib/api/strapi";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    console.log("📖 API Route - Fetching article by slug:", slug);

    const article = await strapiApi.fetchArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("❌ API Route Error (article by slug):", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}
