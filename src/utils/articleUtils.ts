// utils/articleUtils.ts
import { StrapiArticle, StrapiCategory, Article, Category, Author, StrapiAuthor } from '@/types/article';

/**
 * Calculate estimated reading time based on content
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} menit baca`;
}

/**
 * Extract plain text from HTML content
 */
export function extractTextFromHTML(html: string, maxLength: number = 160): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Get best image URL from Strapi media formats
 */
export function getOptimalImageUrl(media: any, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'small'): string {
  if (!media) return '/images/placeholder-article.jpg';
  
  // Try to get the requested format
  if (size !== 'original' && media.formats && media.formats[size]) {
    return media.formats[size].url;
  }
  
  // Fallback to original URL
  return media.url || '/images/placeholder-article.jpg';
}

/**
 * Parse tags string into array
 */
export function parseTags(tagsString: string): string[] {
  if (!tagsString || typeof tagsString !== 'string') return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
}

/**
 * Generate mock views count (deprecated - remove when real analytics available)
 * @deprecated Use real analytics data instead
 */

/**
 * Check if article should be featured
 * Fixed: Better logic for featured articles
 */
export function determineIfFeatured(article: StrapiArticle): boolean {
  try {
    const featuredTags = ['unggulan', 'featured', 'terbaru', 'penting', 'headline'];
    const tags = parseTags(String(article.tags || ''));

    const hasFeaturetag = tags.some(tag =>
      featuredTags.some(featuredTag =>
        tag.toLowerCase().includes(featuredTag.toLowerCase())
      )
    );

    const publishDate = new Date(article.publishedAt);
    const now = new Date();
    const daysSincePublished = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
    const isVeryRecent = daysSincePublished <= 3;

    const importantCategories = ['ginjal', 'jantung', 'diabetes', 'kanker'];
    const hasImportantCategory = !!(article.category?.slug &&
      importantCategories.includes(article.category.slug.toLowerCase()));

    return Boolean(hasFeaturetag || (isVeryRecent && hasImportantCategory));
  } catch (error) {
    console.warn('Error determining featured status:', error);
    return false;
  }
}


/**
 * Combine all content blocks into single HTML string
 */
export function combineContentBlocks(contentBlocks: any[]): string {
  if (!contentBlocks || !Array.isArray(contentBlocks)) return '';
  
  return contentBlocks
    .filter(block => block && block.__component === 'shared.rich-text' && block.body)
    .map(block => block.body)
    .join('\n\n');
}

/**
 * Map Strapi article to frontend Article type
 * Fixed: Better handling of dates and missing fields
 */
export function mapStrapiArticleToArticle(strapiArticle: StrapiArticle): Article {
  try {
    const combinedContent = combineContentBlocks(strapiArticle.content);
    const description = strapiArticle.excerpt || extractTextFromHTML(combinedContent);
    
    // Use publishedAt as primary date, fallback to createdAt
    const primaryDate = strapiArticle.publishedAt || strapiArticle.createdAt;
    
    return {
      id: strapiArticle.id,
      documentId: strapiArticle.documentId,
      title: strapiArticle.title || 'Untitled Article',
      slug: strapiArticle.slug || generateSlug(strapiArticle.title || ''),
      description: description || 'No description available',
      content: combinedContent,
      image: getOptimalImageUrl(strapiArticle.cover, 'small'),
      author: strapiArticle.author?.name || 'Tim Medis CMI',
      authorEmail: strapiArticle.author?.email || 'info@cmihospital.com',
      category: strapiArticle.category?.documentId || 'uncategorized',
      categorySlug: strapiArticle.category?.slug || 'umum',
      categoryName: strapiArticle.category?.name || 'Artikel',
      date: primaryDate,
      publishedAt: primaryDate,
      readTime: calculateReadTime(combinedContent),
      isFeatured: determineIfFeatured(strapiArticle),
      tags: parseTags(strapiArticle.tags),
      seo: {
        metaTitle: strapiArticle.seo?.metaTitle || strapiArticle.title || 'CMI Hospital Article',
        metaDescription: strapiArticle.seo?.metaDescription || description || 'Read more on CMI Hospital',
        metaRobots: strapiArticle.seo?.metaRobots || 'index,follow'
      },
      relatedArticles: strapiArticle.relatedArticles?.map(mapStrapiArticleToArticle) || []
    };
  } catch (error) {
    console.error('Error mapping Strapi article:', error, strapiArticle);
    // Return a safe fallback article
    return {
      id: strapiArticle.id || 0,
      documentId: strapiArticle.documentId || '',
      title: strapiArticle.title || 'Error Loading Article',
      slug: strapiArticle.slug || 'error',
      description: 'Error loading article description',
      content: '',
      image: '/images/placeholder-article.jpg',
      author: 'Tim Medis CMI',
      authorEmail: 'info@cmihospital.com',
      category: 'error',
      categorySlug: 'error',
      categoryName: 'Error',
      date: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      readTime: '1 menit baca',
      // views: 0,
      isFeatured: false,
      tags: [],
      seo: {
        metaTitle: 'Error Loading Article',
        metaDescription: 'Error loading article',
        metaRobots: 'noindex,nofollow'
      },
      relatedArticles: []
    };
  }
}

/**
 * Map Strapi category to frontend Category type
 */
export function mapStrapiCategoryToCategory(strapiCategory: StrapiCategory): Category {
  return {
    id: strapiCategory.documentId,
    name: strapiCategory.name,
    slug: strapiCategory.slug,
    description: strapiCategory.description || ''
  };
}

/**
 * Map Strapi author to frontend Author type
 */
export function mapStrapiAuthorToAuthor(strapiAuthor: StrapiAuthor): Author {
  return {
    id: strapiAuthor.id,
    name: strapiAuthor.name,
    email: strapiAuthor.email
  };
}

/**
 * Format date for display in Indonesian locale
 * Fixed: Better error handling for invalid dates
 */
export function formatDate(dateString: string): string {
  try {
    if (!dateString) return 'Tanggal tidak tersedia';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';
    
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting date:', error, dateString);
    return 'Tanggal tidak valid';
  }
}

/**
 * Format date for display in short format
 */
export function formatDateShort(dateString: string): string {
  try {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid';
    
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting short date:', error, dateString);
    return 'Invalid';
  }
}

/**
 * Get relative time (e.g., "2 hari yang lalu")
 * Fixed: Better calculation and edge cases
 */
export function getRelativeTime(dateString: string): string {
  try {
    if (!dateString) return 'Waktu tidak diketahui';
    
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) return 'Waktu tidak valid';
    
    const diffInMs = now.getTime() - date.getTime();
    
    // If date is in the future, handle it gracefully
    if (diffInMs < 0) {
      return 'Baru saja dipublikasikan';
    }
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
    
    if (diffInMinutes < 60) return diffInMinutes <= 1 ? 'Baru saja' : `${diffInMinutes} menit yang lalu`;
    if (diffInHours < 24) return diffInHours === 1 ? '1 jam yang lalu' : `${diffInHours} jam yang lalu`;
    if (diffInDays === 0) return 'Hari ini';
    if (diffInDays === 1) return 'Kemarin';
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    if (diffInWeeks === 1) return '1 minggu yang lalu';
    if (diffInDays < 30) return `${diffInWeeks} minggu yang lalu`;
    if (diffInMonths === 1) return '1 bulan yang lalu';
    if (diffInDays < 365) return `${diffInMonths} bulan yang lalu`;
    if (diffInYears === 1) return '1 tahun yang lalu';
    return `${diffInYears} tahun yang lalu`;
  } catch (error) {
    console.warn('Error calculating relative time:', error, dateString);
    return 'Waktu tidak diketahui';
  }
}

/**
 * Get image URL with fallback handling
 */
export function getImageUrl(article: any): string {
  if (!article?.image) return '/images/placeholder-article.jpg';
  
  // If it's already a full URL, return as is
  if (article.image.startsWith('http')) {
    return article.image;
  }
  
  // If it's a relative path, add base URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://cms-dev.cmihospital.com';
  return article.image.startsWith('/') ? `${baseUrl}${article.image}` : `${baseUrl}/${article.image}`;
}

/**
 * Format article date for display
 */
export function formatArticleDate(dateString: string): string {
  return formatDate(dateString);
}

/**
 * Generate table of contents from HTML content
 * Fixed: Added safety check for document
 */
export function generateTableOfContents(htmlContent: string): Array<{
  id: string;
  title: string;
  level: number;
}> {
  try {
    // Check if we're in browser environment
    if (typeof document === 'undefined') return [];
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    return Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
  } catch (error) {
    console.warn('Error generating table of contents:', error);
    return [];
  }
}

/**
 * Estimate reading time more accurately
 */
export function calculateReadingTime(content: string): string {
  return calculateReadTime(content); // Use the existing function
}

/**
 * Truncate text with word boundary
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (!text || text.length <= maxLength) return text || '';
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Clean HTML content for preview
 */
export function cleanHtmlContent(html: string): string {
  if (!html) return '';
  
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
  if (!title) return 'untitled';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}

/**
 * Get reading progress percentage
 * Fixed: Added safety checks
 */
export function calculateReadingProgress(): number {
  try {
    if (typeof window === 'undefined') return 0;
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return 0;
    
    const progress = (window.scrollY / totalHeight) * 100;
    return Math.min(100, Math.max(0, progress));
  } catch (error) {
    console.warn('Error calculating reading progress:', error);
    return 0;
  }
}

/**
 * Format number for display (views, likes, etc.)
 */
export function formatNumber(num: number): string {
  if (!num || isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return num.toString();
}

/**
 * Check if article is recently published (within 7 days)
 */
export function isRecentArticle(publishedDate: string): boolean {
  try {
    if (!publishedDate) return false;
    
    const now = new Date();
    const articleDate = new Date(publishedDate);
    
    if (isNaN(articleDate.getTime())) return false;
    
    const diffTime = now.getTime() - articleDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays >= 0 && diffDays <= 7;
  } catch (error) {
    console.warn('Error checking if article is recent:', error);
    return false;
  }
}

/**
 * Get article URL for sharing
 */
export function getArticleUrl(slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cmihospital.com';
  return `${baseUrl}/artikel-kesehatan/${slug}`;
}

/**
 * Generate structured data for article
 */
export function generateArticleStructuredData(article: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cmihospital.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": {
      "@type": "ImageObject",
      "url": getImageUrl(article),
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "email": article.authorEmail
    },
    "publisher": {
      "@type": "Organization",
      "name": "Klinik Utama CMI",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`,
        "width": 200,
        "height": 60
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getArticleUrl(article.slug)
    },
    "articleSection": article.categoryName,
    "keywords": article.tags?.join(', '),
    "wordCount": cleanHtmlContent(article.content).split(/\s+/).filter(word => word.length > 0).length,
    "timeRequired": `PT${article.readTime?.replace(/\D/g, '') || '5'}M`,
    "inLanguage": "id-ID",
    "isAccessibleForFree": true,
    "genre": "Health",
    "about": {
      "@type": "Thing",
      "name": "Kesehatan"
    }
  };
}