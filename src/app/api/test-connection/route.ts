// src/app/api/test-connection/route.ts
import { NextRequest, NextResponse } from "next/server";
import { testApiConnection } from "../../lib/api/strapi";

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
    log("🔄 API Route - Testing Strapi connection");

    const result = await testApiConnection();

    log("✅ API Route - Connection test completed:", result.success);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    error("❌ API Route Error (test connection):", err);

    const errorMessage =
      err instanceof Error ? err.message : "Failed to test connection";

    return NextResponse.json(
      {
        success: false,
        message: "Connection test failed",
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
