// app/api/test-connection/route.ts
import { NextResponse } from "next/server";
import { strapiApi } from "@/app/lib/api/strapi";

export async function GET() {
  try {
    console.log("🔧 API Route - Testing connection");

    const result = await strapiApi.testApiConnection();

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store", // Don't cache test results
      },
    });
  } catch (error) {
    console.error("❌ API Route Error (test connection):", error);
    return NextResponse.json(
      {
        success: false,
        message: "Connection test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
