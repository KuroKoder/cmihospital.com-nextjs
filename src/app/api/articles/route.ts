// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchArticles } from "../../lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page")!)
        : undefined,
      pageSize: searchParams.get("pageSize")
        ? parseInt(searchParams.get("pageSize")!)
        : undefined,
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      sortBy:
        (searchParams.get("sortBy") as "newest" | "oldest" | "popular") ||
        undefined,
    };

    console.log("🔄 API Route - Fetching articles with filters:", filters);

    const result = await fetchArticles(filters);

    console.log("✅ API Route - Articles fetched:", result.articles.length);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ API Route Error (articles):", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch articles";

    return NextResponse.json(
      {
        articles: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
