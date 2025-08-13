/// lib/api/strapi.ts
import { 
  StrapiResponse, 
  StrapiArticle, 
  StrapiCategory, 
  Article, 
  Category, 
  ArticleFilters,
  PaginationMeta 
} from '@/types/article';
import { 
  mapStrapiArticleToArticle, 
  mapStrapiCategoryToCategory 
} from '@/utils/articleUtils';

// API Configuration
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN_STRAPI_API = process.env.STRAPI_API_TOKEN || '22651316f08b6e8a3ccf495207c93a9188d4e7c8a129fd24816bc282d1e90647a532112ed63ac2e648500d148ffdc36b2174840ae90873f2fe960d034d563e013415ddd7f1851cb58615a4304085db4ed6688850ed9b8b6971a5011fbf380d807e26bc9bdaae03b7258674b1f7f8dc99363d6d9b63887e353f305ffc2ab11fe4';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment && !TOKEN_STRAPI_API) {
  console.warn('⚠️ STRAPI_API_TOKEN not found in environment variables');
}

const API_BASE_URL = `${STRAPI_BASE_URL}/api`;

// === Logging Helpers ===
function devLog(...args: any[]) {
  if (isDevelopment) console.log(...args);
}
function devWarn(...args: any[]) {
  if (isDevelopment) console.warn(...args);
}
function devError(...args: any[]) {
  if (isDevelopment) console.error(...args);
}

/**
 * Get authorization headers
 */
function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (TOKEN_STRAPI_API) {
    headers['Authorization'] = `Bearer ${TOKEN_STRAPI_API}`;
  }
  return headers;
}

/**
 * Enhanced fetch wrapper with better error handling and authentication
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    devLog('🔄 Fetching:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP ${response.status}`;

      switch (response.status) {
        case 400: errorMessage = `Bad Request: ${errorText}`; break;
        case 401: errorMessage = 'Authentication failed. Please check your API token.'; break;
        case 403: errorMessage = 'Access forbidden. Your API token may not have the required permissions.'; break;
        case 404: errorMessage = `Endpoint not found: ${endpoint}`; break;
        case 500: errorMessage = 'Strapi server error. Please check if Strapi is running properly.'; break;
        default:
          errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
          if (errorText) errorMessage += `\nDetails: ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout: Unable to connect to ${STRAPI_BASE_URL}. Please check if the server is running.`);
      }
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error(`Network error: Unable to connect to ${STRAPI_BASE_URL}. Please check your network connection and server status.`);
      }
    }
    throw error;
  }
}

/**
 * Build query string from filters
 */
function buildQueryString(filters: Partial<ArticleFilters> = {}): string {
  const params = new URLSearchParams();
  params.append('populate', '*');
  if (filters.page) params.append('pagination[page]', filters.page.toString());
  if (filters.pageSize) params.append('pagination[pageSize]', filters.pageSize.toString());
  if (filters.search) params.append('filters[title][$containsi]', filters.search);
  if (filters.category && filters.category !== 'all') {
    params.append('filters[category][documentId][$eq]', filters.category);
  }

  let sortField = 'publishedAt';
  let sortOrder = 'desc';
  switch (filters.sortBy) {
    case 'newest': sortField = 'publishedAt'; sortOrder = 'desc'; break;
    case 'oldest': sortField = 'publishedAt'; sortOrder = 'asc'; break;
    case 'popular': sortField = 'id'; sortOrder = 'desc'; break;
  }
  params.append('sort[0]', `${sortField}:${sortOrder}`);
  return params.toString();
}

/**
 * Test API connectivity
 */
export async function testApiConnection() {
  const testResults = { hasToken: !!TOKEN_STRAPI_API, baseUrl: STRAPI_BASE_URL };
  if (!TOKEN_STRAPI_API) {
    return { success: false, message: 'No API token configured.', details: testResults };
  }

  const testStrategies = [
    { name: 'asterisk', query: 'populate=*' },
    { name: 'deep', query: 'populate=deep' },
    { name: 'simple', query: 'populate=cover,author,category' },
    { name: 'minimal', query: '' },
  ];

  for (const strategy of testStrategies) {
    try {
      const testQuery = strategy.query 
        ? `/articles?pagination[pageSize]=1&${strategy.query}`
        : '/articles?pagination[pageSize]=1';
      const response = await apiFetch<any>(testQuery);
      return {
        success: true,
        message: `API connection successful using ${strategy.name} populate strategy`,
        details: { ...testResults, strategy: strategy.name, articlesFound: response.data?.length || 0, totalCount: response.meta?.pagination?.total || 0 }
      };
    } catch (error) {
      devWarn(`⚠️ ${strategy.name} strategy failed:`, error instanceof Error ? error.message : error);
      continue;
    }
  }

  return { success: false, message: 'All populate strategies failed.', details: { ...testResults, errorType: 'All strategies failed' } };
}

/**
 * Fetch all articles
 */
export async function fetchArticles(filters: Partial<ArticleFilters> = {}) {
  try {
    const queryString = buildQueryString(filters);
    devLog('📝 Fetching articles with filters:', filters);

    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(`/articles?${queryString}`);
    const articles = response.data?.map(mapStrapiArticleToArticle) || [];
    devLog(`✅ Successfully fetched ${articles.length} articles`);

    return { articles, pagination: response.meta?.pagination || { page: 1, pageSize: 10, pageCount: 0, total: 0 } };
  } catch (error) {
    devError('❌ Error fetching articles:', error instanceof Error ? error.message : error);
    return { articles: [], pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } };
  }
}

/**
 * Fetch single article by slug
 */
export async function fetchArticleBySlug(slug: string) {
  try {
    const queryString = new URLSearchParams({ 'filters[slug][$eq]': slug, populate: '*' }).toString();
    const response = await apiFetch<StrapiResponse<StrapiArticle[]>>(`/articles?${queryString}`);
    if (!response.data || response.data.length === 0) return null;

    const article = mapStrapiArticleToArticle(response.data[0]);
    devLog('✅ Successfully fetched article:', article.title);
    return article;
  } catch (error) {
    devError('❌ Error fetching article by slug:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  try {
    const response = await apiFetch<StrapiResponse<StrapiCategory[]>>('/categories');
    return [
      { id: 'all', name: 'Semua Kategori', slug: 'all', description: 'Tampilkan semua artikel' },
      ...(response.data?.map(mapStrapiCategoryToCategory) || [])
    ];
  } catch (error) {
    devError('❌ Error fetching categories:', error instanceof Error ? error.message : error);
    return [{ id: 'all', name: 'Semua Kategori', slug: 'all', description: 'Tampilkan semua artikel' }];
  }
}

/**
 * Fetch articles by category
 */
export async function fetchArticlesByCategory(
  categorySlug: string, 
  filters: Partial<ArticleFilters> = {}
): Promise<{
  articles: Article[];
  pagination: PaginationMeta;
  category: Category | null;
}> {
  try {
    const categoryResponse = await apiFetch<StrapiResponse<StrapiCategory[]>>(
      `/categories?filters[slug][$eq]=${categorySlug}`
    );
    
    const category = categoryResponse.data && categoryResponse.data.length > 0 
      ? mapStrapiCategoryToCategory(categoryResponse.data[0])
      : null;
    
    if (!category) {
      return {
        articles: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
        category: null
      };
    }
    
    const articlesResult = await fetchArticles({
      ...filters,
      category: category.id
    });
    
    return {
      ...articlesResult,
      category
    };
  } catch (error) {
    console.error('❌ Error fetching articles by category:', error instanceof Error ? error.message : error);
    return {
      articles: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      category: null
    };
  }
}

/**
 * Search articles by query
 */
export async function searchArticles(
  query: string,
  filters: Partial<ArticleFilters> = {}
): Promise<{
  articles: Article[];
  pagination: PaginationMeta;
}> {
  return fetchArticles({
    ...filters,
    search: query
  });
}

/**
 * Fetch featured/latest articles for homepage
 */
export async function fetchFeaturedArticles(limit: number = 6): Promise<Article[]> {
  try {
    const result = await fetchArticles({
      pageSize: limit,
      sortBy: 'newest'
    });
    
    return result.articles;
  } catch (error) {
    console.error('❌ Error fetching featured articles:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Fetch related articles
 */
export async function fetchRelatedArticles(
  currentArticle: Article,
  limit: number = 4
): Promise<Article[]> {
  try {
    const result = await fetchArticles({
      category: currentArticle.category,
      pageSize: limit + 1,
      sortBy: 'newest'
    });
    
    const relatedArticles = result.articles
      .filter(article => article.slug !== currentArticle.slug)
      .slice(0, limit);
    
    return relatedArticles;
  } catch (error) {
    console.error('❌ Error fetching related articles:', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Get article count by category
 */
export async function getCategoryArticleCounts(): Promise<Record<string, number>> {
  try {
    const categories = await fetchCategories();
    const counts: Record<string, number> = {};
    
    for (const category of categories) {
      if (category.id === 'all') continue;
      
      try {
        const result = await fetchArticles({
          category: category.id,
          pageSize: 1
        });
        
        counts[category.id] = result.pagination.total;
      } catch (error) {
        counts[category.id] = 0;
      }
    }
    
    return counts;
  } catch (error) {
    console.error('❌ Error getting category article counts:', error instanceof Error ? error.message : error);
    return {};
  }
}

/**
 * Debug function for development
 */
export function debugApiConfig() {
  if (!isDevelopment) return;
  
  console.log('=== API Configuration Debug ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('STRAPI_BASE_URL:', STRAPI_BASE_URL);
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Has STRAPI_API_TOKEN:', !!TOKEN_STRAPI_API);
  console.log('===============================');
}

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
  debugApiConfig
};