// app/api/articles/featured/route.ts
import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/app/lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? Math.min(parseInt(searchParams.get("limit")!), 20)
      : 6;

    console.log("⭐ API Route - Fetching featured articles, limit:", limit);

    const articles = await strapiApi.fetchFeaturedArticles(limit);

    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("❌ API Route Error (featured articles):", error);
    return NextResponse.json([], { status: 500 });
  }
}
