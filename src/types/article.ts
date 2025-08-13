// types/aricle.ts
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
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
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
  previewUrl?: string;
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

export interface StrapiContentBlock {
  __component: string;
  id: number;
  body?: string; // for rich-text components
  // Add other component types as needed
}

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaRobots: string;
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

// / Transformed types for frontend components
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;
  authorEmail: string;
  category: string;
  categorySlug: string;
  categoryName: string;
  date: string;
  publishedAt: string;
  readTime: string;
  isFeatured: boolean;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaRobots: string;
  };
  relatedArticles: Article[];
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
}

// Sort and filter types
export type SortBy = "newest" | "oldest" | "popular";

export interface ArticleFilters {
  category?: string;
  search?: string;
  sortBy: SortBy;
  page: number;
  pageSize: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}