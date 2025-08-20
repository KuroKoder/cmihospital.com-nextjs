// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/app/lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const filters = {
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
      pageSize: searchParams.get("pageSize")
        ? Math.min(parseInt(searchParams.get("pageSize")!), 50)
        : 10,
      search: searchParams.get("search") || undefined,
      category:
        searchParams.get("category") && searchParams.get("category") !== "all"
          ? searchParams.get("category")!
          : undefined,
      sortBy:
        (searchParams.get("sortBy") as "newest" | "oldest" | "popular") ||
        "newest",
    };

    console.log("📊 API Route - Fetching articles with filters:", filters);

    const result = await strapiApi.fetchArticles(filters);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("❌ API Route Error (articles):", error);
    return NextResponse.json(
      {
        articles: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
        error:
          error instanceof Error ? error.message : "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}
