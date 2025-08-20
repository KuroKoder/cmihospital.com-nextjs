// // app/api/articles/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { strapiApi } from "@/lib/api/strapi";

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const filters = {
//       page: searchParams.get("page")
//         ? parseInt(searchParams.get("page")!)
//         : undefined,
//       pageSize: searchParams.get("pageSize")
//         ? parseInt(searchParams.get("pageSize")!)
//         : undefined,
//       search: searchParams.get("search") || undefined,
//       category: searchParams.get("category") || undefined,
//       sortBy:
//         (searchParams.get("sortBy") as "newest" | "oldest" | "popular") ||
//         undefined,
//     };

//     // Remove undefined values
//     const cleanFilters = Object.fromEntries(
//       Object.entries(filters).filter(([_, value]) => value !== undefined)
//     );

//     const result = await strapiApi.fetchArticles(cleanFilters);

//     return NextResponse.json(result, {
//       headers: {
//         "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
//       },
//     });
//   } catch (error) {
//     console.error("❌ API Route Error (articles):", error);
//     return NextResponse.json(
//       {
//         articles: [],
//         pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
//         error: "Failed to fetch articles",
//       },
//       { status: 500 }
//     );
//   }
// }

// // app/api/articles/[slug]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { strapiApi } from "@/lib/api/strapi";

// interface RouteParams {
//   params: {
//     slug: string;
//   };
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const { slug } = params;

//     if (!slug) {
//       return NextResponse.json({ error: "Slug is required" }, { status: 400 });
//     }

//     const article = await strapiApi.fetchArticleBySlug(slug);

//     if (!article) {
//       return NextResponse.json({ error: "Article not found" }, { status: 404 });
//     }

//     return NextResponse.json(article, {
//       headers: {
//         "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
//       },
//     });
//   } catch (error) {
//     console.error("❌ API Route Error (article by slug):", error);
//     return NextResponse.json(
//       { error: "Failed to fetch article" },
//       { status: 500 }
//     );
//   }
// }

// // app/api/categories/route.ts
// import { NextResponse } from "next/server";
// import { strapiApi } from "@/lib/api/strapi";

// export async function GET() {
//   try {
//     const categories = await strapiApi.fetchCategories();

//     return NextResponse.json(categories, {
//       headers: {
//         "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
//       },
//     });
//   } catch (error) {
//     console.error("❌ API Route Error (categories):", error);
//     return NextResponse.json(
//       [
//         {
//           id: "all",
//           name: "Semua Kategori",
//           slug: "all",
//           description: "Tampilkan semua artikel",
//         },
//       ],
//       { status: 500 }
//     );
//   }
// }

// // app/api/articles/featured/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { strapiApi } from "@/lib/api/strapi";

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const limit = searchParams.get("limit")
//       ? parseInt(searchParams.get("limit")!)
//       : 6;

//     const articles = await strapiApi.fetchFeaturedArticles(Math.min(limit, 20)); // Max 20

//     return NextResponse.json(articles, {
//       headers: {
//         "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
//       },
//     });
//   } catch (error) {
//     console.error("❌ API Route Error (featured articles):", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

// // app/api/test-connection/route.ts
// import { NextResponse } from "next/server";
// import { strapiApi } from "@/lib/api/strapi";

// export async function GET() {
//   try {
//     const result = await strapiApi.testApiConnection();

//     return NextResponse.json(result, {
//       headers: {
//         "Cache-Control": "no-store", // Don't cache test results
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Connection test failed",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // lib/api/client-strapi.ts (Client-side API functions)
// export class StrapiClientApi {
//   private baseUrl = "/api";

//   async fetchArticles(
//     filters: {
//       page?: number;
//       pageSize?: number;
//       search?: string;
//       category?: string;
//       sortBy?: "newest" | "oldest" | "popular";
//     } = {}
//   ) {
//     try {
//       const params = new URLSearchParams();

//       Object.entries(filters).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           params.append(key, value.toString());
//         }
//       });

//       const url = `${this.baseUrl}/articles${
//         params.toString() ? `?${params.toString()}` : ""
//       }`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("❌ Client API Error (articles):", error);
//       throw error;
//     }
//   }

//   async fetchArticleBySlug(slug: string) {
//     try {
//       const response = await fetch(
//         `${this.baseUrl}/articles/${encodeURIComponent(slug)}`
//       );

//       if (response.status === 404) {
//         return null;
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("❌ Client API Error (article by slug):", error);
//       throw error;
//     }
//   }

//   async fetchCategories() {
//     try {
//       const response = await fetch(`${this.baseUrl}/categories`);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("❌ Client API Error (categories):", error);
//       // Return default categories on error
//       return [
//         {
//           id: "all",
//           name: "Semua Kategori",
//           slug: "all",
//           description: "Tampilkan semua artikel",
//         },
//       ];
//     }
//   }

//   async fetchFeaturedArticles(limit = 6) {
//     try {
//       const response = await fetch(
//         `${this.baseUrl}/articles/featured?limit=${limit}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error("❌ Client API Error (featured articles):", error);
//       return [];
//     }
//   }

//   async testConnection() {
//     try {
//       const response = await fetch(`${this.baseUrl}/test-connection`);
//       return await response.json();
//     } catch (error) {
//       console.error("❌ Client API Error (test connection):", error);
//       return {
//         success: false,
//         message: "Failed to test connection",
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//     }
//   }
// }

// // Export singleton instance
// export const clientApi = new StrapiClientApi();

// // React hook for easy usage
// import { useState, useEffect } from "react";

// export function useArticles(
//   filters: Parameters<StrapiClientApi["fetchArticles"]>[0] = {}
// ) {
//   const [data, setData] = useState({
//     articles: [],
//     pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
//     loading: true,
//     error: null as string | null,
//   });

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         setData((prev) => ({ ...prev, loading: true, error: null }));
//         const result = await clientApi.fetchArticles(filters);

//         if (isMounted) {
//           setData({
//             articles: result.articles || [],
//             pagination: result.pagination || {
//               page: 1,
//               pageSize: 10,
//               pageCount: 0,
//               total: 0,
//             },
//             loading: false,
//             error: null,
//           });
//         }
//       } catch (error) {
//         if (isMounted) {
//           setData((prev) => ({
//             ...prev,
//             loading: false,
//             error:
//               error instanceof Error
//                 ? error.message
//                 : "Failed to fetch articles",
//           }));
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [JSON.stringify(filters)]); // Dependency on serialized filters

//   return data;
// }

// export function useArticle(slug: string) {
//   const [data, setData] = useState({
//     article: null as any,
//     loading: true,
//     error: null as string | null,
//   });

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       if (!slug) return;

//       try {
//         setData((prev) => ({ ...prev, loading: true, error: null }));
//         const article = await clientApi.fetchArticleBySlug(slug);

//         if (isMounted) {
//           setData({
//             article,
//             loading: false,
//             error: article ? null : "Article not found",
//           });
//         }
//       } catch (error) {
//         if (isMounted) {
//           setData((prev) => ({
//             ...prev,
//             loading: false,
//             error:
//               error instanceof Error
//                 ? error.message
//                 : "Failed to fetch article",
//           }));
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   return data;
// }
