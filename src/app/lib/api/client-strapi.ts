"use client";

// lib/api/client-strapi.ts
import { useState, useEffect } from "react";
import type { Article, ArticleFilters, Category } from "@/types/article";

// Re-export server-side functions for use in server components ONLY
export {
  fetchArticles,
  fetchArticleBySlug,
  fetchCategories,
  strapiApi,
} from "./strapi";

/**
 * Fetch related articles based on current article
 * This function should only be used in server components
 */
export async function fetchRelatedArticles(
  currentArticle: Article,
  limit: number = 4
): Promise<Article[]> {
  try {
    // Import at runtime to ensure it's only used server-side
    const { fetchArticles } = await import("./strapi");

    // Fetch articles from the same category
    const result = await fetchArticles({
      category: currentArticle.categorySlug || currentArticle.category,
      pageSize: limit + 1, // Get one extra to account for filtering out current article
      sortBy: "newest",
    });

    // Filter out the current article and limit results
    return result.articles
      .filter((article) => article.slug !== currentArticle.slug)
      .slice(0, limit);
  } catch (error) {
    console.error("❌ Error fetching related articles:", error);
    return [];
  }
}

// Client-side API class for browser-based requests via Next.js API routes
export class StrapiClientApi {
  private baseUrl = "/api";

  async fetchArticles(
    filters: {
      page?: number;
      pageSize?: number;
      search?: string;
      category?: string;
      sortBy?: "newest" | "oldest" | "popular";
    } = {}
  ) {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const url = `${this.baseUrl}/articles${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      console.log("🔄 Client API - Fetching articles:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Client API - Articles fetched successfully");
      return data;
    } catch (error) {
      console.error("❌ Client API Error (articles):", error);
      throw error;
    }
  }

  async fetchArticleBySlug(slug: string) {
    try {
      console.log("🔄 Client API - Fetching article by slug:", slug);
      const response = await fetch(
        `${this.baseUrl}/articles/${encodeURIComponent(slug)}`
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Client API - Article fetched successfully");
      return data;
    } catch (error) {
      console.error("❌ Client API Error (article by slug):", error);
      throw error;
    }
  }

  async fetchCategories() {
    try {
      console.log("🔄 Client API - Fetching categories");
      const response = await fetch(`${this.baseUrl}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Client API - Categories fetched successfully");
      return data;
    } catch (error) {
      console.error("❌ Client API Error (categories):", error);
      // Return default categories on error
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

  async fetchFeaturedArticles(limit = 6) {
    try {
      console.log("🔄 Client API - Fetching featured articles");
      const response = await fetch(
        `${this.baseUrl}/articles/featured?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Client API - Featured articles fetched successfully");
      return data;
    } catch (error) {
      console.error("❌ Client API Error (featured articles):", error);
      return [];
    }
  }

  async testConnection() {
    try {
      console.log("🔄 Client API - Testing connection");
      const response = await fetch(`${this.baseUrl}/test-connection`);
      const data = await response.json();
      console.log("✅ Client API - Connection test completed");
      return data;
    } catch (error) {
      console.error("❌ Client API Error (test connection):", error);
      return {
        success: false,
        message: "Failed to test connection",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const clientApi = new StrapiClientApi();

// React hooks for easy usage in client components
export function useArticles(
  filters: Parameters<StrapiClientApi["fetchArticles"]>[0] = {}
) {
  const [data, setData] = useState({
    articles: [],
    pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    let isMounted = true;

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
          setData((prev) => ({
            ...prev,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch articles",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(filters)]);

  return data;
}

export function useArticle(slug: string) {
  const [data, setData] = useState({
    article: null as Article | null,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!slug) return;

      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const article = await clientApi.fetchArticleBySlug(slug);

        if (isMounted) {
          setData({
            article,
            loading: false,
            error: article ? null : "Article not found",
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
  }, [slug]);

  return data;
}

export function useCategories() {
  const [data, setData] = useState({
    categories: [] as Category[],
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));
        const categories = await clientApi.fetchCategories();

        if (isMounted) {
          setData({
            categories: categories || [],
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
  }, []);

  return data;
}

// Export wrapper functions untuk backward compatibility
export const fetchFeaturedArticles = async (limit = 6) => {
  return await clientApi.fetchFeaturedArticles(limit);
};

export const fetchArticlesClient = async (filters = {}) => {
  return await clientApi.fetchArticles(filters);
};

export const fetchArticleBySlugClient = async (slug: string) => {
  return await clientApi.fetchArticleBySlug(slug);
};

export const fetchCategoriesClient = async () => {
  return await clientApi.fetchCategories();
};
