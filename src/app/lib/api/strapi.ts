// lib/api/strapi.ts
import {
  StrapiResponse,
  StrapiArticle,
  StrapiCategory,
  Article,
  Category,
  ArticleFilters,
  PaginationMeta,
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
    "❌ NEXT_PUBLIC_STRAPI_URL is required in environment variables"
  );
}

// Token validation with helpful messages
if (isDevelopment) {
  console.log("🔍 Environment Debug:");
  console.log("- NODE_ENV:", process.env.NODE_ENV);
  console.log("- STRAPI_BASE_URL:", STRAPI_BASE_URL);
  console.log("- Has TOKEN:", !!TOKEN_STRAPI_API);
  console.log("- Is Server:", isServer);
  console.log("- Token length:", TOKEN_STRAPI_API?.length || 0);

  if (!TOKEN_STRAPI_API) {
    console.error("🚨 STRAPI_API_TOKEN missing!");
    console.log("📋 Steps to fix:");
    console.log("1. Create .env.local in project root");
    console.log("2. Add: STRAPI_API_TOKEN=your-actual-token");
    console.log("3. Generate token in Strapi Admin > Settings > API Tokens");
    console.log("4. Restart development server");
  }
}

const API_BASE_URL = `${STRAPI_BASE_URL}/api`;

// === Logging Helpers ===
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
 * Get authorization headers with validation
 */
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (
    TOKEN_STRAPI_API &&
    TOKEN_STRAPI_API !== "your-temporary-token-for-testing"
  ) {
    headers["Authorization"] = `Bearer ${TOKEN_STRAPI_API}`;
    devLog("🔑 Using valid API token");
  } else {
    devWarn("⚠️ No valid API token - requests will likely fail");
  }

  return headers;
}

/**
 * Enhanced fetch wrapper with comprehensive error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // Validation
  if (
    !TOKEN_STRAPI_API ||
    TOKEN_STRAPI_API === "your-temporary-token-for-testing"
  ) {
    throw new Error(
      "❌ Valid STRAPI_API_TOKEN is required. Please check your environment variables."
    );
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased timeout

  try {
    devLog("🔄 Fetching:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        ...options?.headers,
      },
      signal: controller.signal,
      cache: isDevelopment ? "no-store" : "force-cache", // Cache in production
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = "";
      let troubleshooting = "";

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.error?.message ||
          errorData.message ||
          `HTTP ${response.status}`;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || `HTTP ${response.status}`;
      }

      switch (response.status) {
        case 400:
          troubleshooting = isDevelopment
            ? "\n🔧 Check your query parameters and filters"
            : "";
          break;
        case 401:
          errorMessage = "Authentication failed - Invalid API token";
          troubleshooting = isDevelopment
            ? "\n🔧 Steps to fix:\n1. Check STRAPI_API_TOKEN in .env.local\n2. Generate new token in Strapi admin\n3. Restart dev server"
            : "";
          break;
        case 403:
          errorMessage = "Access forbidden - Insufficient permissions";
          troubleshooting = isDevelopment
            ? "\n🔧 Steps to fix:\n1. Check API token permissions in Strapi admin\n2. Ensure token has 'find' permission for Articles/Categories\n3. Check if content types are published"
            : "";
          break;
        case 404:
          errorMessage = `Endpoint not found: ${endpoint}`;
          troubleshooting = isDevelopment
            ? "\n🔧 Check if the content type exists in Strapi"
            : "";
          break;
        case 429:
          errorMessage = "Too many requests - Rate limit exceeded";
          break;
        case 500:
          errorMessage = "Strapi server error";
          troubleshooting = isDevelopment
            ? "\n🔧 Check Strapi server logs and database connection"
            : "";
          break;
        default:
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }

      const fullError = errorMessage + troubleshooting;
      devError("❌ API Error:", fullError);
      throw new Error(fullError);
    }

    const data = await response.json();
    devLog(
      "✅ API Response successful, data length:",
      JSON.stringify(data).length
    );
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          `⏱️ Request timeout: ${STRAPI_BASE_URL} took too long to respond`
        );
      }
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          `🌐 Network error: Cannot connect to ${STRAPI_BASE_URL}. Check server status.`
        );
      }
    }

    throw error;
  }
}

/**
 * Build optimized query string from filters using Strapi v5 syntax
 */
function buildQueryString(filters: Partial<ArticleFilters> = {}): string {
  const params = new URLSearchParams();

  // Strapi v5 populate syntax - populate specific relations
  params.append("populate[cover]", "true");
  params.append("populate[author]", "true");
  params.append("populate[category]", "true");

  // Pagination
  if (filters.page) {
    params.append("pagination[page]", filters.page.toString());
  }
  if (filters.pageSize) {
    params.append(
      "pagination[pageSize]",
      Math.min(filters.pageSize, 100).toString()
    ); // Limit max page size
  }

  // Search
  if (filters.search && filters.search.trim()) {
    params.append("filters[title][$containsi]", filters.search.trim());
  }

  // Category filter
  if (filters.category && filters.category !== "all") {
    params.append("filters[category][documentId][$eq]", filters.category);
  }

  // Sorting
  let sortField = "publishedAt";
  let sortOrder = "desc";

  switch (filters.sortBy) {
    case "newest":
      sortField = "publishedAt";
      sortOrder = "desc";
      break;
    case "oldest":
      sortField = "publishedAt";
      sortOrder = "asc";
      break;
    case "popular":
      sortField = "id";
      sortOrder = "desc";
      break;
    default:
      sortField = "publishedAt";
      sortOrder = "desc";
  }

  params.append("sort[0]", `${sortField}:${sortOrder}`);

  // Only published content
  params.append("publicationState", "live");

  return params.toString();
}

/**
 * Enhanced API connection test with detailed diagnostics
 */
export async function testApiConnection() {
  const testResults = {
    hasToken:
      !!TOKEN_STRAPI_API &&
      TOKEN_STRAPI_API !== "your-temporary-token-for-testing",
    baseUrl: STRAPI_BASE_URL,
    tokenValid: false,
    strategy: "",
    articlesFound: 0,
    totalCount: 0,
    errorType: "",
    timestamp: new Date().toISOString(),
  };

  if (!testResults.hasToken) {
    return {
      success: false,
      message: "❌ No valid API token configured",
      details: testResults,
    };
  }

  // Test different populate strategies for Strapi v5
  const testStrategies = [
    {
      name: "v5-specific",
      query:
        "populate[cover]=true&populate[author]=true&populate[category]=true",
    },
    {
      name: "v5-asterisk",
      query: "populate=*",
    },
    {
      name: "minimal",
      query: "",
    },
  ];

  for (const strategy of testStrategies) {
    try {
      const testQuery = `/articles?pagination[pageSize]=1&${strategy.query}`;
      devLog(`🧪 Testing ${strategy.name} strategy...`);

      const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(
        testQuery
      );

      return {
        success: true,
        message: `✅ API connection successful using '${strategy.name}' strategy`,
        details: {
          ...testResults,
          tokenValid: true,
          strategy: strategy.name,
          articlesFound: response.data?.length || 0,
          totalCount: response.meta?.pagination?.total || 0,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      devWarn(`⚠️ Strategy '${strategy.name}' failed:`, errorMessage);

      testResults.errorType = errorMessage;
      continue;
    }
  }

  return {
    success: false,
    message: "❌ All connection strategies failed",
    details: testResults,
  };
}

/**
 * Fetch articles with enhanced error handling
 */
export async function fetchArticles(filters: Partial<ArticleFilters> = {}) {
  try {
    const queryString = buildQueryString(filters);
    devLog("📝 Fetching articles with filters:", filters);
    devLog("🔗 Query string:", queryString);

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
      `✅ Successfully fetched ${articles.length} articles (${pagination.total} total)`
    );

    return { articles, pagination };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("❌ Error fetching articles:", errorMessage);

    return {
      articles: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      error: errorMessage,
    };
  }
}

/**
 * Fetch single article by slug with caching
 */
export async function fetchArticleBySlug(slug: string) {
  if (!slug || slug.trim() === "") {
    devError("❌ Invalid slug provided");
    return null;
  }

  try {
    const params = new URLSearchParams({
      "filters[slug][$eq]": slug.trim(),
      publicationState: "live",
    });

    // Add Strapi v5 populate syntax
    params.append("populate[cover]", "true");
    params.append("populate[author]", "true");
    params.append("populate[category]", "true");

    const queryString = params.toString();

    devLog(`📖 Fetching article by slug: ${slug}`);

    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(
      `/articles?${queryString}`
    );

    if (!response.data || response.data.length === 0) {
      devWarn(`⚠️ Article not found: ${slug}`);
      return null;
    }

    const article = mapStrapiArticleToArticle(response.data[0]);
    devLog("✅ Successfully fetched article:", article.title);
    return article;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("❌ Error fetching article by slug:", errorMessage);
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
    devLog("📂 Fetching categories...");
    const response = await apiFetch<StrapiResponse<StrapiCategory[]>>(
      "/categories?publicationState=live"
    );

    const categories = response.data?.map(mapStrapiCategoryToCategory) || [];
    devLog(`✅ Successfully fetched ${categories.length} categories`);

    return [...defaultCategories, ...categories];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    devError("❌ Error fetching categories:", errorMessage);
    return defaultCategories;
  }
}

/**
 * Debug function with comprehensive environment info
 */
export function debugApiConfig() {
  if (!isDevelopment) return;

  console.group("🔧 === Strapi API Configuration Debug ===");
  console.log("📍 Environment:", process.env.NODE_ENV);
  console.log("🌐 STRAPI_BASE_URL:", STRAPI_BASE_URL);
  console.log("🔗 API_BASE_URL:", API_BASE_URL);
  console.log("🔑 Has STRAPI_API_TOKEN:", !!TOKEN_STRAPI_API);
  console.log(
    "✅ Token is valid:",
    !!TOKEN_STRAPI_API &&
      TOKEN_STRAPI_API !== "your-temporary-token-for-testing"
  );
  console.log("🖥️ Is Server:", isServer);
  console.log("⏰ Timestamp:", new Date().toISOString());

  if (TOKEN_STRAPI_API) {
    console.log("🔐 Token length:", TOKEN_STRAPI_API.length);
    console.log("🔐 Token preview:", TOKEN_STRAPI_API.substring(0, 20) + "...");
  }

  console.groupEnd();
}

// Initialize debug on load in development
if (isDevelopment) {
  debugApiConfig();
}

// Export all functions
export const strapiApi = {
  fetchArticles,
  fetchArticleBySlug,
  fetchCategories,
  fetchArticlesByCategory: async (
    categorySlug: string,
    filters: Partial<ArticleFilters> = {}
  ) => {
    try {
      const categoryResponse = await apiFetch<StrapiResponse<StrapiCategory[]>>(
        `/categories?filters[slug][$eq]=${categorySlug}&publicationState=live`
      );

      const category =
        categoryResponse.data && categoryResponse.data.length > 0
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
        "❌ Error fetching articles by category:",
        error instanceof Error ? error.message : error
      );
      return {
        articles: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
        category: null,
      };
    }
  },
  searchArticles: (query: string, filters: Partial<ArticleFilters> = {}) => {
    return fetchArticles({ ...filters, search: query });
  },
  fetchFeaturedArticles: async (limit: number = 6) => {
    try {
      const result = await fetchArticles({
        pageSize: limit,
        sortBy: "newest",
      });
      return result.articles;
    } catch (error) {
      devError(
        "❌ Error fetching featured articles:",
        error instanceof Error ? error.message : error
      );
      return [];
    }
  },
  fetchRelatedArticles: async (currentArticle: Article, limit: number = 4) => {
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
        "❌ Error fetching related articles:",
        error instanceof Error ? error.message : error
      );
      return [];
    }
  },
  getCategoryArticleCounts: async () => {
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
        "❌ Error getting category article counts:",
        error instanceof Error ? error.message : error
      );
      return {};
    }
  },
  testApiConnection,
  debugApiConfig,
};
