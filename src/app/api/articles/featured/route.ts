// src/app/api/articles/featured/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchArticles } from "../../../lib/api/strapi";

const isDevelopment = process.env.NODE_ENV === "development";

function log(message: string, data?: unknown) {
  if (isDevelopment) {
    console.log(message, data);
  }
}

function error(message: string, data?: unknown) {
  if (isDevelopment) {
    console.error(message, data);
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 6;

    // Validate limit parameter
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        {
          articles: [],
          error: "Invalid limit parameter. Must be between 1 and 50.",
        },
        { status: 400 }
      );
    }

    log("🔄 API Route - Fetching featured articles, limit:", limit);

    const result = await fetchArticles({
      pageSize: limit,
      sortBy: "newest",
    });

    log(
      "✅ API Route - Featured articles fetched:",
      result.articles?.length || 0
    );

    return NextResponse.json(
      {
        articles: result.articles || [],
        success: true,
      },
      {
        headers: {
          "Cache-Control": isDevelopment ? "no-store" : "public, max-age=300",
        },
      }
    );
  } catch (err) {
    error("❌ API Route Error (featured articles):", err);

    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch featured articles";

    return NextResponse.json(
      {
        articles: [],
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
