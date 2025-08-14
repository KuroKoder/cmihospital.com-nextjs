// types/article.ts (fixed filename typo)
export interface StrapiResponse<T> {
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

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  excerpt: string;
  reference: string;
  tags: string;
  author: StrapiAuthor;
  category: StrapiCategory;
  cover: StrapiMedia;
  content: StrapiContentBlock[];
  relatedArticles: StrapiArticle[];
  seo: StrapiSeo;
  localizations: StrapiLocalization[];
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Add optional fields that might be useful
  bio?: string;
  avatar?: StrapiMedia;
  slug?: string;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Add optional color or icon fields
  color?: string;
  icon?: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

// Enhanced content block types for better type safety
export interface StrapiContentBlock {
  __component: string;
  id: number;
}

export interface StrapiRichTextBlock extends StrapiContentBlock {
  __component: "shared.rich-text";
  body: string;
}

export interface StrapiImageBlock extends StrapiContentBlock {
  __component: "shared.media";
  file: StrapiMedia;
  caption?: string;
}

export interface StrapiQuoteBlock extends StrapiContentBlock {
  __component: "shared.quote";
  title: string;
  body: string;
  author?: string;
}

// Union type for all possible content blocks
export type StrapiContentBlockType =
  | StrapiRichTextBlock
  | StrapiImageBlock
  | StrapiQuoteBlock;

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaRobots: string;
  // Add optional fields for enhanced SEO
  metaImage?: StrapiMedia;
  keywords?: string;
  structuredData?: Record<string, any>;
}

export interface StrapiLocalization {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  excerpt: string;
  reference: string;
  tags: string;
}

// Transformed types for frontend components
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;
  authorSlug?: string;
  authorEmail: string;
  category: string;
  categorySlug: string;
  categoryName: string;
  date: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  isFeatured: boolean;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaRobots: string;
  };
  relatedArticles?: Article[]; // Make optional to avoid circular dependency issues
}

// Extended Article type for detail pages with additional computed properties
export interface ExtendedArticle extends Article {
  wordCount?: number;
  estimatedReadingTime?: number;
  tableOfContents?: TableOfContentsItem[];
  nextArticle?: Pick<Article, "id" | "title" | "slug" | "image">;
  prevArticle?: Pick<Article, "id" | "title" | "slug" | "image">;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
  color?: string;
  icon?: string;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  slug?: string;
  articleCount?: number;
}

// Sort and filter types
export type SortBy = "newest" | "oldest" | "popular" | "trending";

export interface ArticleFilters {
  category?: string;
  search?: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
  tags?: string[];
  author?: string;
  featured?: boolean;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// API Response types
export interface ArticlesResponse {
  articles: Article[];
  meta: PaginationMeta;
  categories?: Category[];
}

export interface ArticleDetailResponse extends Article {
  relatedArticles: Article[];
  similarArticles?: Article[];
}

// Utility types
export type ArticleStatus = "draft" | "published" | "archived";

export interface ArticleSearchResult {
  articles: Article[];
  total: number;
  suggestions?: string[];
  filters: {
    categories: Category[];
    authors: Author[];
    tags: string[];
  };
}

// Form types for CMS
export interface CreateArticleDto {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  categoryId: number;
  authorId: number;
  tags: string[];
  isFeatured?: boolean;
  seo: Partial<StrapiSeo>;
  status?: ArticleStatus;
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {
  id: number;
}
