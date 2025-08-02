// types/article.ts
export interface Category {
  id: string;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  isFeatured?: boolean;
}

export type SortBy = "newest" | "oldest" | "popular";

export interface FilterState {
  selectedCategory: string;
  searchQuery: string;
  sortBy: SortBy;
  showFilters: boolean;
  currentPage: number;
}
