import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

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

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );

    const result = await strapiApi.fetchArticles(cleanFilters);

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
        error: "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}
