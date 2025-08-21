// // app/api/articles/[slug]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { fetchArticleBySlug } from "../../../lib/api/strapi";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const slug = params.slug;

//     if (!slug) {
//       return NextResponse.json({ error: "Slug is required" }, { status: 400 });
//     }

//     console.log("🔄 API Route - Fetching article by slug:", slug);

//     const article = await fetchArticleBySlug(slug);

//     if (!article) {
//       console.log("⚠️ API Route - Article not found:", slug);
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     console.log("✅ API Route - Article fetched:", article.title);

//     return NextResponse.json({ article });
//   } catch (error) {
//     console.error("❌ API Route Error (article by slug):", error);

//     const errorMessage =
//       error instanceof Error ? error.message : "Failed to fetch article";

//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

// src/app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchArticleBySlug } from "../../../lib/api/strapi";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    // Await the params promise in Next.js 15
    const { slug } = await context.params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      article,
      success: true,
    });
  } catch (error) {
    console.error("API Error (article by slug):", error);

    return NextResponse.json(
      {
        error: "Failed to fetch article",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
