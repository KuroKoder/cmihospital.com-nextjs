import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 6;

    const articles = await strapiApi.fetchFeaturedArticles(Math.min(limit, 20)); // Max 20

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
