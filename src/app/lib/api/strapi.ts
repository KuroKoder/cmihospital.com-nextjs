// lib/api/strapi.ts
import {
  StrapiResponse,
  StrapiArticle,
  StrapiCategory,
  Article,
  ArticleFilters,
} from "@/types/article";
import {
  mapStrapiArticleToArticle,
  mapStrapiCategoryToCategory,
} from "@/utils/articleUtils";

// Environment & Configuration
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN_STRAPI_API = process.env.STRAPI_API_TOKEN;
const isDevelopment = process.env.NODE_ENV === "development";
const isServer = typeof window === "undefined";

// Validation
if (!STRAPI_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_STRAPI_URL is required in environment variables"
  );
}

// Development logging
if (isDevelopment) {
  console.log("Environment Debug:");
  console.log("- NODE_ENV:", process.env.NODE_ENV);
  console.log("- STRAPI_BASE_URL:", STRAPI_BASE_URL);
  console.log("- Has TOKEN:", !!TOKEN_STRAPI_API);
  console.log("- Is Server:", isServer);

  if (!TOKEN_STRAPI_API) {
    console.warn("STRAPI_API_TOKEN missing - some requests may fail!");
    console.log("Steps to fix:");
    console.log("1. Create .env.local in project root");
    console.log("2. Add: STRAPI_API_TOKEN=your-actual-token");
    console.log("3. Generate token in Strapi Admin > Settings > API Tokens");
    console.log("4. Restart development server");
  }
}

const API_BASE_URL = `${STRAPI_BASE_URL}/api`;

// Logging Helpers
function devLog(...args: unknown[]) {
  if (isDevelopment) console.log(...args);
}

function devWarn(...args: unknown[]) {
  if (isDevelopment) console.warn(...args);
}

function devError(...args: unknown[]) {
  if (isDevelopment) console.error(...args);
}

/**
 * Get authorization headers
 */
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (TOKEN_STRAPI_API && TOKEN_STRAPI_API.length > 10) {
    headers["Authorization"] = `Bearer ${TOKEN_STRAPI_API}`;
    devLog("Using API token");
  } else {
    devWarn("No API token - requests may have limited access");
  }

  return headers;
}

/**
 * Simplified fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    devLog("Fetching:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        ...options?.headers,
      },
      signal: controller.signal,
      cache: isDevelopment ? "no-store" : "force-cache",
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error?.message || errorData.message || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      // Enhanced error messages for development
      if (isDevelopment) {
        switch (response.status) {
          case 401:
            errorMessage = "Authentication failed - Check API token";
            break;
          case 403:
            errorMessage = "Access forbidden - Check token permissions";
            break;
          case 404:
            errorMessage = `Endpoint not found: ${endpoint}`;
            break;
          case 500:
            errorMessage = "Strapi server error";
            break;
        }
      }

      devError("API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    devLog("API Response successful");
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout: ${STRAPI_BASE_URL}`);
      }
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(`Network error: Cannot connect to ${STRAPI_BASE_URL}`);
      }
    }

    throw error;
  }
}

/**
 * Build query string for Strapi API
 */
function buildQueryString(filters: Partial<ArticleFilters> = {}): string {
  const params = new URLSearchParams();

  // Populate all relations
  params.append("populate", "*");

  // Pagination
  if (filters.page) {
    params.append("pagination[page]", filters.page.toString());
  }
  if (filters.pageSize) {
    params.append(
      "pagination[pageSize]",
      Math.min(filters.pageSize, 100).toString()
    );
  }

  // Search
  if (filters.search?.trim()) {
    params.append("filters[title][$containsi]", filters.search.trim());
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    params.append("filters[category][documentId][$eq]", filters.category);
  }

  // Sorting
  const sortField = filters.sortBy === "oldest" ? "publishedAt" : "publishedAt";
  const sortOrder = filters.sortBy === "oldest" ? "asc" : "desc";
  params.append("sort[0]", `${sortField}:${sortOrder}`);

  // Only published content
  params.append("publicationState", "live");

  return params.toString();
}

/**
 * Test API connection
 */
export async function testApiConnection() {
  const testResult = {
    hasToken: !!TOKEN_STRAPI_API,
    tokenValid: TOKEN_STRAPI_API ? TOKEN_STRAPI_API.length > 10 : false,
    baseUrl: STRAPI_BASE_URL,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(
      "/articles?pagination[pageSize]=1&populate=*"
    );

    return {
      success: true,
      message: "API connection successful",
      details: {
        ...testResult,
        articlesFound: response.data?.length || 0,
        totalCount: response.meta?.pagination?.total || 0,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: "API connection failed",
      details: { ...testResult, errorType: errorMessage },
    };
  }
}

/**
 * Fetch articles with filters
 */
export async function fetchArticles(filters: Partial<ArticleFilters> = {}) {
  try {
    const queryString = buildQueryString(filters);
    devLog("Fetching articles with filters:", filters);

    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(
      `/articles?${queryString}`
    );

    const articles = response.data?.map(mapStrapiArticleToArticle) || [];
    const pagination = response.meta?.pagination || {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
    };

    devLog(
      `Successfully fetched ${articles.length} articles (${pagination.total} total)`
    );

    return { articles, pagination };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("Error fetching articles:", errorMessage);

    return {
      articles: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      error: errorMessage,
    };
  }
}

/**
 * Fetch single article by slug
 */
export async function fetchArticleBySlug(slug: string) {
  if (!slug?.trim()) {
    devError("Invalid slug provided");
    return null;
  }

  try {
    const params = new URLSearchParams({
      "filters[slug][$eq]": slug.trim(),
      populate: "*",
      publicationState: "live",
    });

    devLog(`Fetching article by slug: ${slug}`);

    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(
      `/articles?${params.toString()}`
    );

    if (!response.data?.length) {
      devWarn(`Article not found: ${slug}`);
      return null;
    }

    const article = mapStrapiArticleToArticle(response.data[0]);
    devLog("Successfully fetched article:", article.title);
    return article;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("Error fetching article by slug:", errorMessage);
    return null;
  }
}

/**
 * Fetch categories with fallback
 */
export async function fetchCategories() {
  const defaultCategories = [
    {
      id: "all",
      name: "Semua Kategori",
      slug: "all",
      description: "Tampilkan semua artikel",
    },
  ];

  try {
    devLog("Fetching categories...");
    const response = await apiFetch<StrapiResponse<StrapiCategory[]>>(
      "/categories?populate=*&publicationState=live"
    );

    const categories = response.data?.map(mapStrapiCategoryToCategory) || [];
    devLog(`Successfully fetched ${categories.length} categories`);

    return [...defaultCategories, ...categories];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("Error fetching categories:", errorMessage);
    return defaultCategories;
  }
}

/**
 * Debug function for development
 */
export function debugApiConfig() {
  if (!isDevelopment) return;

  console.group("=== Strapi API Configuration Debug ===");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("STRAPI_BASE_URL:", STRAPI_BASE_URL);
  console.log("API_BASE_URL:", API_BASE_URL);
  console.log("Has STRAPI_API_TOKEN:", !!TOKEN_STRAPI_API);
  console.log(
    "Token is valid:",
    !!TOKEN_STRAPI_API && TOKEN_STRAPI_API.length > 10
  );
  console.log("Is Server:", isServer);
  console.log("Timestamp:", new Date().toISOString());

  if (TOKEN_STRAPI_API) {
    console.log("Token length:", TOKEN_STRAPI_API.length);
    console.log("Token preview:", TOKEN_STRAPI_API.substring(0, 20) + "...");
  }

  console.groupEnd();
}

// Initialize debug on load in development
if (isDevelopment) {
  debugApiConfig();
}

/**
 * Fetch articles by category
 */
export async function fetchArticlesByCategory(
  categorySlug: string,
  filters: Partial<ArticleFilters> = {}
) {
  try {
    const categoryResponse = await apiFetch<StrapiResponse<StrapiCategory[]>>(
      `/categories?filters[slug][$eq]=${categorySlug}&populate=*&publicationState=live`
    );

    const category = categoryResponse.data?.[0]
      ? mapStrapiCategoryToCategory(categoryResponse.data[0])
      : null;

    if (!category) {
      return {
        articles: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
        category: null,
      };
    }

    const articlesResult = await fetchArticles({
      ...filters,
      category: category.id,
    });

    return { ...articlesResult, category };
  } catch (error) {
    devError(
      "Error fetching articles by category:",
      error instanceof Error ? error.message : error
    );
    return {
      articles: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      category: null,
    };
  }
}

/**
 * Search articles
 */
export function searchArticles(
  query: string,
  filters: Partial<ArticleFilters> = {}
) {
  return fetchArticles({ ...filters, search: query });
}

/**
 * Fetch featured articles
 */
export async function fetchFeaturedArticles(limit: number = 6) {
  try {
    const result = await fetchArticles({
      pageSize: limit,
      sortBy: "newest",
    });
    return result.articles;
  } catch (error) {
    devError(
      "Error fetching featured articles:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

/**
 * Fetch related articles
 */
export async function fetchRelatedArticles(
  currentArticle: Article,
  limit: number = 4
) {
  try {
    const result = await fetchArticles({
      category: currentArticle.category,
      pageSize: limit + 1,
      sortBy: "newest",
    });

    return result.articles
      .filter((article) => article.slug !== currentArticle.slug)
      .slice(0, limit);
  } catch (error) {
    devError(
      "Error fetching related articles:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

/**
 * Get category article counts
 */
export async function getCategoryArticleCounts() {
  try {
    const categories = await fetchCategories();
    const counts: Record<string, number> = {};

    for (const category of categories) {
      if (category.id === "all") continue;

      try {
        const result = await fetchArticles({
          category: category.id,
          pageSize: 1,
        });
        counts[category.id] = result.pagination.total;
      } catch {
        counts[category.id] = 0;
      }
    }

    return counts;
  } catch (error) {
    devError(
      "Error getting category article counts:",
      error instanceof Error ? error.message : error
    );
    return {};
  }
}

// Export API object with all functions
export const strapiApi = {
  fetchArticles,
  fetchArticleBySlug,
  fetchCategories,
  fetchArticlesByCategory,
  searchArticles,
  fetchFeaturedArticles,
  fetchRelatedArticles,
  getCategoryArticleCounts,
  testApiConnection,
  debugApiConfig,
};
