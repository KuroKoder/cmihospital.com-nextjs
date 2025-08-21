// app/api/articles/related/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchArticles } from "../../../lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") ?? "4");
    const category = searchParams.get("category");
    const exclude = searchParams.get("exclude");

    if (limit < 1 || limit > 20) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 20" },
        { status: 400 }
      );
    }

    const result = await fetchArticles({
      pageSize: exclude ? limit + 1 : limit,
      category: category && category !== "all" ? category : undefined,
      sortBy: "newest",
    });

    // Filter out excluded article if provided
    let articles = result.articles;
    if (exclude) {
      articles = articles
        .filter((article) => article.slug !== exclude)
        .slice(0, limit);
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("API Route Error (related articles):", error);

    return NextResponse.json(
      {
        articles: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch related articles",
      },
      { status: 500 }
    );
  }
}
