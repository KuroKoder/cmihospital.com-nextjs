import { NextResponse } from "next/server";
import { strapiApi } from "@/lib/api/strapi";

export async function GET() {
  try {
    const result = await strapiApi.testApiConnection();

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store", // Don't cache test results
      },
    });
  } catch (error) {
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
