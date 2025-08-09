// src/lib/api.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms-dev.cmihospital.com/api/articles';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Interface untuk response API
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// Interface untuk artikel dari Strapi
interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    category: string;
    readTime: number;
    tags: string[];
    featured: boolean;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          caption: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string;
          provider: string;
          provider_metadata: any;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}

// Headers untuk API request
const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }
  
  return headers;
};

// Fungsi untuk mengambil semua artikel dengan pagination dan filter
export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
  featured?: boolean;
}) {
  try {
    const searchParams = new URLSearchParams();
    
    // Pagination
    searchParams.append('pagination[page]', (params?.page || 1).toString());
    searchParams.append('pagination[pageSize]', (params?.pageSize || 10).toString());
    
    // Populate image
    searchParams.append('populate', 'image');
    
    // Sort by publishedAt descending
    searchParams.append('sort', 'publishedAt:desc');
    
    // Filter by category
    if (params?.category && params.category !== 'all') {
      searchParams.append('filters[category][$eq]', params.category);
    }
    
    // Filter by featured
    if (params?.featured) {
      searchParams.append('filters[featured][$eq]', 'true');
    }
    
    // Search filter
    if (params?.search) {
      searchParams.append('filters[$or][0][title][$containsi]', params.search);
      searchParams.append('filters[$or][1][excerpt][$containsi]', params.search);
      searchParams.append('filters[$or][2][content][$containsi]', params.search);
    }
    
    const response = await fetch(`${STRAPI_URL}/articles?${searchParams}`, {
      headers: getHeaders(),
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<StrapiArticle[]> = await response.json();
    
    // Transform data to match your Article interface
    const articles = data.data.map(article => ({
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      content: article.attributes.content,
      category: article.attributes.category,
      readTime: article.attributes.readTime,
      tags: article.attributes.tags || [],
      publishedAt: article.attributes.publishedAt,
      featured: article.attributes.featured || false,
      image: article.attributes.image?.data ? {
        url: article.attributes.image.data.attributes.url,
        alt: article.attributes.image.data.attributes.alternativeText || article.attributes.title,
        width: article.attributes.image.data.attributes.width,
        height: article.attributes.image.data.attributes.height
      } : null
    }));
    
    return {
      articles,
      pagination: data.meta.pagination
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

// Fungsi untuk mengambil artikel berdasarkan slug
export async function getArticleBySlug(slug: string) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', 'image');
    
    const response = await fetch(`${STRAPI_URL}/articles?${searchParams}`, {
      headers: getHeaders(),
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<StrapiArticle[]> = await response.json();
    
    if (data.data.length === 0) {
      return null;
    }
    
    const article = data.data[0];
    
    return {
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      content: article.attributes.content,
      category: article.attributes.category,
      readTime: article.attributes.readTime,
      tags: article.attributes.tags || [],
      publishedAt: article.attributes.publishedAt,
      featured: article.attributes.featured || false,
      image: article.attributes.image?.data ? {
        url: article.attributes.image.data.attributes.url,
        alt: article.attributes.image.data.attributes.alternativeText || article.attributes.title,
        width: article.attributes.image.data.attributes.width,
        height: article.attributes.image.data.attributes.height
      } : null
    };
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    throw error;
  }
}

// Fungsi untuk mengambil artikel terbaru (untuk homepage)
export async function getNewestArticles(limit: number = 6) {
  try {
    return await getArticles({
      pageSize: limit,
      page: 1
    });
  } catch (error) {
    console.error('Error fetching newest articles:', error);
    throw error;
  }
}

// Fungsi untuk mengambil artikel featured
export async function getFeaturedArticles(limit: number = 3) {
  try {
    return await getArticles({
      pageSize: limit,
      page: 1,
      featured: true
    });
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw error;
  }
}

// Fungsi untuk mengambil artikel terkait berdasarkan category
export async function getRelatedArticles(category: string, currentSlug: string, limit: number = 4) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('pagination[page]', '1');
    searchParams.append('pagination[pageSize]', limit.toString());
    searchParams.append('populate', 'image');
    searchParams.append('sort', 'publishedAt:desc');
    searchParams.append('filters[category][$eq]', category);
    searchParams.append('filters[slug][$ne]', currentSlug); // Exclude current article
    
    const response = await fetch(`${STRAPI_URL}/articles?${searchParams}`, {
      headers: getHeaders(),
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<StrapiArticle[]> = await response.json();
    
    const articles = data.data.map(article => ({
      id: article.id,
      title: article.attributes.title,
      slug: article.attributes.slug,
      excerpt: article.attributes.excerpt,
      content: article.attributes.content,
      category: article.attributes.category,
      readTime: article.attributes.readTime,
      tags: article.attributes.tags || [],
      publishedAt: article.attributes.publishedAt,
      featured: article.attributes.featured || false,
      image: article.attributes.image?.data ? {
        url: article.attributes.image.data.attributes.url,
        alt: article.attributes.image.data.attributes.alternativeText || article.attributes.title,
        width: article.attributes.image.data.attributes.width,
        height: article.attributes.image.data.attributes.height
      } : null
    }));
    
    return {
      articles,
      pagination: data.meta.pagination
    };
  } catch (error) {
    console.error('Error fetching related articles:', error);
    throw error;
  }
}

// Fungsi untuk mengambil kategori artikel yang tersedia
export async function getArticleCategories() {
  try {
    const response = await fetch(`${STRAPI_URL}/articles?fields[0]=category`, {
      headers: getHeaders(),
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<{ attributes: { category: string } }[]> = await response.json();
    
    // Extract unique categories
    const categories = [...new Set(data.data.map(item => item.attributes.category))].filter(Boolean);
    
    return categories;
  } catch (error) {
    console.error('Error fetching article categories:', error);
    throw error;
  }
}