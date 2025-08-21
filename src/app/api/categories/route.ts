// app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchCategories } from "../../lib/api/strapi";

export async function GET(request: NextRequest) {
  try {
    console.log("🔄 API Route - Fetching categories");

    const categories = await fetchCategories();

    console.log("✅ API Route - Categories fetched:", categories.length);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("❌ API Route Error (categories):", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch categories";

    // Return default categories on error
    const defaultCategories = [
      {
        id: "all",
        name: "Semua Kategori",
        slug: "all",
        description: "Tampilkan semua artikel",
      },
    ];

    return NextResponse.json(
      { categories: defaultCategories, error: errorMessage },
      { status: 500 }
    );
  }
}
