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
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Client API Error (articles):", error);
      throw error;
    }
  }

  async fetchArticleBySlug(slug: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/articles/${encodeURIComponent(slug)}`
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Client API Error (article by slug):", error);
      throw error;
    }
  }

  async fetchCategories() {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
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
      const response = await fetch(
        `${this.baseUrl}/articles/featured?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Client API Error (featured articles):", error);
      return [];
    }
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.baseUrl}/test-connection`);
      return await response.json();
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

// React hook for easy usage
import { useState, useEffect } from "react";

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
  }, [JSON.stringify(filters)]); // Dependency on serialized filters

  return data;
}

export function useArticle(slug: string) {
  const [data, setData] = useState({
    article: null as any,
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
