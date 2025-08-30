"use client";

// lib/api/client-strapi.ts
import { useState, useEffect } from "react";
import type { Article, ArticleFilters, Category } from "@/types/article";

// JANGAN import server-side functions di client components!
// Server-side functions hanya untuk server components

/**
 * Client-side API class yang menggunakan Next.js API routes
 * Tidak mengakses Strapi secara langsung dari browser
 */
export class StrapiClientApi {
  private baseUrl = "/api";
  private isDevelopment = process.env.NODE_ENV === "development";

  private log(message: string, data?: unknown) {
    if (this.isDevelopment) {
      console.log(message, data);
    }
  }

  private warn(message: string, data?: unknown) {
    if (this.isDevelopment) {
      console.warn(message, data);
    }
  }

  private error(message: string, data?: unknown) {
    if (this.isDevelopment) {
      console.error(message, data);
    }
  }

  async fetchArticles(
    filters: {
      page?: number;
      pageSize?: number;
      search?: string;
      category?: string;
      sortBy?: "newest" | "oldest" | "popular" | "trending";
    } = {}
  ) {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      const url = `${this.baseUrl}/articles${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      this.log("🔄 Client API - Fetching articles:", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Tidak perlu cache di development
        cache: this.isDevelopment ? "no-store" : "default",
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this.log(
        "✅ Client API - Articles fetched successfully:",
        data.articles?.length || 0
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (articles):", error);
      throw error;
    }
  }

  async fetchArticleBySlug(slug: string) {
    if (!slug || slug.trim() === "") {
      throw new Error("Slug is required");
    }

    try {
      this.log("🔄 Client API - Fetching article by slug:", slug);
      const response = await fetch(
        `${this.baseUrl}/articles/${encodeURIComponent(slug.trim())}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: this.isDevelopment ? "no-store" : "default",
        }
      );

      if (response.status === 404) {
        this.warn("⚠️ Article not found:", slug);
        return null;
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this.log(
        "✅ Client API - Article fetched successfully:",
        data.article?.title
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (article by slug):", error);
      throw error;
    }
  }

  async fetchCategories() {
    try {
      this.log("🔄 Client API - Fetching categories");
      const response = await fetch(`${this.baseUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: this.isDevelopment ? "no-store" : "default",
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        this.warn("⚠️ Categories fetch failed:", errorText);

        // Return default categories jika API gagal
        return this.getDefaultCategories();
      }

      const data = await response.json();
      this.log(
        "✅ Client API - Categories fetched successfully:",
        data.categories?.length || 0
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (categories):", error);
      // Return default categories on error
      return this.getDefaultCategories();
    }
  }

  private getDefaultCategories() {
    return {
      categories: [
        {
          id: "all",
          name: "Semua Kategori",
          slug: "all",
          description: "Tampilkan semua artikel",
        },
      ],
    };
  }

  async fetchFeaturedArticles(limit = 6) {
    try {
      this.log("🔄 Client API - Fetching featured articles");
      const response = await fetch(
        `${this.baseUrl}/articles/featured?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: this.isDevelopment ? "no-store" : "default",
        }
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this.log(
        "✅ Client API - Featured articles fetched successfully:",
        data.articles?.length || 0
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (featured articles):", error);
      return { articles: [] };
    }
  }

  async fetchRelatedArticles(
    currentSlug: string,
    categorySlug?: string,
    limit = 4
  ) {
    try {
      this.log("🔄 Client API - Fetching related articles");

      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (categorySlug && categorySlug !== "all") {
        params.append("category", categorySlug);
      }
      if (currentSlug) {
        params.append("exclude", currentSlug);
      }

      const response = await fetch(
        `${this.baseUrl}/articles/related?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: this.isDevelopment ? "no-store" : "default",
        }
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this.log(
        "✅ Client API - Related articles fetched successfully:",
        data.articles?.length || 0
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (related articles):", error);
      return { articles: [] };
    }
  }

  async testConnection() {
    try {
      this.log("🔄 Client API - Testing connection");
      const response = await fetch(`${this.baseUrl}/test-connection`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.log(
        "✅ Client API - Connection test completed:",
        data.success ? "Success" : "Failed"
      );
      return data;
    } catch (error) {
      this.error("❌ Client API Error (test connection):", error);
      return {
        success: false,
        message: "Failed to test connection from client",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const clientApi = new StrapiClientApi();

// React hooks for easy usage in client components
export function useArticles(
  filters: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    sortBy?: "newest" | "oldest" | "popular" | "trending";
  } = {},
  enabled: boolean = true
) {
  const [data, setData] = useState({
    articles: [] as Article[],
    pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
    loading: true,
    error: null as string | null,
  });

  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 2;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const result = await clientApi.fetchArticles(filters);

        if (isMounted) {
          setData({
            articles: result.articles || [],
            pagination: result.pagination || {
              page: 1,
              pageSize: 10,
              pageCount: 0,
              total: 0,
            },
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch articles";

          // Retry logic untuk network errors
          if (
            retryCount < maxRetries &&
            errorMessage.includes("Failed to fetch")
          ) {
            retryCount++;
            if (isDevelopment) {
              console.log(
                `🔄 Retrying articles fetch (${retryCount}/${maxRetries})`
              );
            }
            setTimeout(fetchData, 1000 * retryCount);
            return;
          }

          setData((prev) => ({
            ...prev,
            loading: false,
            error: errorMessage,
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(filters), enabled, isDevelopment]);

  return data;
}

export function useArticle(slug: string, enabled: boolean = true) {
  const [data, setData] = useState({
    article: null as Article | null,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!slug || !enabled) {
      setData({ article: null, loading: false, error: "No slug provided" });
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const result = await clientApi.fetchArticleBySlug(slug);

        if (isMounted) {
          setData({
            article: result?.article || null,
            loading: false,
            error: result?.article ? null : "Article not found",
          });
        }
      } catch (error) {
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch article",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [slug, enabled]);

  return data;
}

export function useCategories(enabled: boolean = true) {
  const [data, setData] = useState({
    categories: [] as Category[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const result = await clientApi.fetchCategories();

        if (isMounted) {
          setData({
            categories: result.categories || [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch categories",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [enabled]);

  return data;
}

export function useFeaturedArticles(
  limit: number = 6,
  enabled: boolean = true
) {
  const [data, setData] = useState({
    articles: [] as Article[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const result = await clientApi.fetchFeaturedArticles(limit);

        if (isMounted) {
          setData({
            articles: result.articles || [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch featured articles",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [limit, enabled]);

  return data;
}

export function useRelatedArticles(
  currentSlug: string,
  categorySlug?: string,
  limit: number = 4,
  enabled: boolean = true
) {
  const [data, setData] = useState({
    articles: [] as Article[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!currentSlug || !enabled) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const result = await clientApi.fetchRelatedArticles(
          currentSlug,
          categorySlug,
          limit
        );

        if (isMounted) {
          setData({
            articles: result.articles || [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setData((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch related articles",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [currentSlug, categorySlug, limit, enabled]);

  return data;
}

// Export untuk backward compatibility dan server-side usage
// IMPORTANT: Ini untuk digunakan di server components, bukan client components!

/**
 * Fetch related articles - untuk server components
 */
export async function fetchRelatedArticles(
  currentArticle: { slug: string; category?: string; categorySlug?: string },
  limit: number = 4
): Promise<Article[]> {
  try {
    if (typeof window === "undefined") {
      const { fetchArticles } = await import("./strapi");
      const result = await fetchArticles({
        category: currentArticle.categorySlug || currentArticle.category,
        pageSize: limit + 1,
        sortBy: "newest",
      });

      return result.articles
        .filter((article: Article) => article.slug !== currentArticle.slug)
        .slice(0, limit);
    }

    const result = await clientApi.fetchRelatedArticles(
      currentArticle.slug,
      currentArticle.categorySlug || currentArticle.category,
      limit
    );
    return result.articles || [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error fetching related articles:", error);
    }
    return [];
  }
}

/**
 * Fetch articles - untuk server components
 */
export async function fetchArticles(
  filters: {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    sortBy?: "newest" | "oldest" | "popular" | "trending";
  } = {}
) {
  try {
    // Jika digunakan di server component
    if (typeof window === "undefined") {
      const { fetchArticles: serverFetchArticles } = await import("./strapi");
      return await serverFetchArticles(filters);
    }

    // Jika digunakan di client
    return await clientApi.fetchArticles(filters);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error fetching articles:", error);
    }
    return {
      articles: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Fetch article by slug - untuk server components
 */
export async function fetchArticleBySlug(slug: string) {
  try {
    // Jika digunakan di server component
    if (typeof window === "undefined") {
      const { fetchArticleBySlug: serverFetchArticleBySlug } = await import(
        "./strapi"
      );
      return await serverFetchArticleBySlug(slug);
    }

    // Jika digunakan di client
    const result = await clientApi.fetchArticleBySlug(slug);
    return result?.article || null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error fetching article by slug:", error);
    }
    return null;
  }
}

/**
 * Fetch categories - untuk server components
 */
export async function fetchCategories() {
  try {
    // Jika digunakan di server component
    if (typeof window === "undefined") {
      const { fetchCategories: serverFetchCategories } = await import(
        "./strapi"
      );
      return await serverFetchCategories();
    }

    // Jika digunakan di client
    const result = await clientApi.fetchCategories();
    return result.categories || [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error fetching categories:", error);
    }
    return [
      {
        id: "all",
        name: "Semua Kategori",
        slug: "all",
        description: "Tampilkan semua artikel",
      },
    ];
  }
}

// Client-only exports (untuk dipanggil langsung di client)
export const fetchFeaturedArticles = async (limit = 6) => {
  const result = await clientApi.fetchFeaturedArticles(limit);
  return result.articles || [];
};

export const fetchArticlesClient = async (filters = {}) => {
  return await clientApi.fetchArticles(filters);
};

export const fetchArticleBySlugClient = async (slug: string) => {
  const result = await clientApi.fetchArticleBySlug(slug);
  return result?.article || null;
};

export const fetchCategoriesClient = async () => {
  const result = await clientApi.fetchCategories();
  return result.categories || [];
};
