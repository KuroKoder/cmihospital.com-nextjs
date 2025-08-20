import { NextResponse } from "next/server";
import { strapiApi } from "@/lib/api/strapi";

export async function GET() {
  try {
    const categories = await strapiApi.fetchCategories();

    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("❌ API Route Error (categories):", error);
    return NextResponse.json(
      [
        {
          id: "all",
          name: "Semua Kategori",
          slug: "all",
          description: "Tampilkan semua artikel",
        },
      ],
      { status: 500 }
    );
  }
}
