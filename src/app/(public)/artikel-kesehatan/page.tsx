// pages/artikel-kesehatan/index.tsx (if using Pages Router)
// OR app/artikel-kesehatan/page.tsx (if using App Router)

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  BookmarkIcon, 
  ArrowLongRightIcon,
  EyeIcon,
  FireIcon,
  StarIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { 
  EyeIcon as EyeSolidIcon,
  FireIcon as FireSolidIcon 
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Head from "next/head";

// Import components
import SearchSection from "@/components/public/articles/SearchSection";
import FilterControls from "@/components/public/articles/FilterControls";
import ArticleCard from "@/components/public/articles/ArticleCard";
import Pagination from "@/components/public/articles/Pagination";
import NewsletterSection from "@/components/public/articles/NewsletterSection";
import MainLayout from "@/components/layout/main-layout";

// Import API and types
import { fetchArticles, fetchCategories } from "@/lib/api/strapi";
import { Article, Category, ArticleFilters, SortBy, PaginationMeta } from "@/types/article";
import { formatDate, getRelativeTime } from "@/utils/articleUtils";

const ARTICLES_PER_PAGE = 6;

// Loading skeleton component
const ArticleCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5">
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Coba Lagi
    </button>
  </div>
);

// Popular Article Card Component
const PopularArticleCard: React.FC<{
  article: Article;
  rank: number;
}> = ({ article, rank }) => {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-800 text-white";
      default:
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <StarIcon className="h-4 w-4" />;
    }
    return <FireIcon className="h-4 w-4" />;
  };

  return (
    <Link href={`/artikel-kesehatan/${article.slug}`} className="group block">
      <article className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Rank Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`${getRankStyle(rank)} px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg`}>
            {getRankIcon(rank)}
            <span className="text-sm font-bold">#{rank}</span>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Category Badge on Image */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-800 text-sm font-semibold rounded-full shadow-lg">
              {article.categoryName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200 leading-tight">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">{article.author}</span>
              <span>•</span>
              <span>{getRelativeTime(article.date)}</span>
            </div>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
              {article.readTime}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Read More */}
            <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
              <span className="text-sm">Baca Artikel</span>
              <ArrowLongRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-colors duration-300 pointer-events-none" />
      </article>
    </Link>
  );
};

const ArtikelKesehatan: React.FC = () => {
  // State management
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    pageSize: ARTICLES_PER_PAGE,
    pageCount: 0,
    total: 0
  });
  
  const [filters, setFilters] = useState<ArticleFilters>({
    category: 'all',
    search: '',
    sortBy: 'newest',
    page: 1,
    pageSize: ARTICLES_PER_PAGE
  });

  const [uiState, setUiState] = useState({
    showFilters: false,
    isLoading: true,
    isLoadingCategories: true,
    error: null as string | null
  });

  // Popular articles state
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setUiState(prev => ({ ...prev, isLoadingCategories: true }));
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setUiState(prev => ({ ...prev, isLoadingCategories: false }));
      }
    };

    loadCategories();
  }, []);

  // Load articles when filters change
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setUiState(prev => ({ ...prev, isLoading: true, error: null }));
        
        const { articles: articlesData, pagination: paginationData } = await fetchArticles(filters);
        
        setArticles(articlesData);
        setPagination(paginationData);

        // Load popular articles only on first load (no filters)
        if (filters.category === 'all' && !filters.search && filters.page === 1) {
          const popularData = await fetchArticles({ 
            sortBy: 'popular', 
            pageSize: 6 
          });
          setPopularArticles(popularData.articles);
        }

      } catch (error) {
        console.error('Error loading articles:', error);
        setUiState(prev => ({ 
          ...prev, 
          error: 'Gagal memuat artikel. Silakan coba lagi.' 
        }));
      } finally {
        setUiState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadArticles();
  }, [filters]);

  // Handler functions
  const handleSearchChange = useCallback((query: string) => {
    setFilters(prev => ({ 
      ...prev, 
      search: query, 
      page: 1 
    }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category, 
      page: 1 
    }));
  }, []);

  const handleSortChange = useCallback((sortBy: SortBy) => {
    setFilters(prev => ({ 
      ...prev, 
      sortBy, 
      page: 1 
    }));
  }, []);

  const handleToggleFilters = useCallback(() => {
    setUiState(prev => ({ 
      ...prev, 
      showFilters: !prev.showFilters 
    }));
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setFilters(prev => ({ ...prev, page: pageNumber }));
    
    // Scroll to articles section
    setTimeout(() => {
      const element = document.getElementById('articles-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  const handleResetSearch = useCallback(() => {
    setFilters({
      category: 'all',
      search: '',
      sortBy: 'newest',
      page: 1,
      pageSize: ARTICLES_PER_PAGE
    });
  }, []);

  const retryLoad = useCallback(() => {
    setFilters(prev => ({ ...prev })); // Trigger reload
  }, []);

  // Computed values
  const shouldShowPopularArticles = 
    filters.search === '' && 
    filters.category === 'all' && 
    popularArticles.length > 0 &&
    !uiState.isLoading;

  const getCategoryName = useCallback((categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "Semua Artikel";
  }, [categories]);

  return (
    <MainLayout>
      <Head>
        <title>Artikel Kesehatan Terbaru 2025 - Klinik Utama CMI</title>
        <meta
          name="description"
          content="Temukan informasi dan tips kesehatan terkini dari tim dokter Klinik Utama CMI. Artikel kesehatan tentang gaya hidup sehat, penyakit, nutrisi, dan kesehatan ibu anak."
        />
        <meta
          name="keywords"
          content="artikel kesehatan, tips kesehatan, informasi medis, klinik cmi, kesehatan ibu anak, gizi, penyakit, kesehatan mental"
        />
        <meta property="og:title" content="Artikel Kesehatan Terbaru 2025 - Klinik Utama CMI" />
        <meta property="og:description" content="Informasi dan tips kesehatan terkini dari tim dokter Klinik Utama CMI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cmihospital.com/artikel-kesehatan" />
        <link rel="canonical" href="https://cmihospital.com/artikel-kesehatan" />
      </Head>

      <main className="bg-white min-h-screen pt-28 pb-16">
        {/* Hero Section with Search */}
        <SearchSection
          searchQuery={filters.search || ''}
          onSearchChange={handleSearchChange}
          showFilters={uiState.showFilters}
          onToggleFilters={handleToggleFilters}
        />

        <div className="container mx-auto px-4">
          {/* Popular Articles Section */}
          {shouldShowPopularArticles && (
            <section className="mb-16" aria-labelledby="popular-articles-title">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
                  <FireSolidIcon className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-semibold text-sm">Trending Sekarang</span>
                </div>
                
                <h2 id="popular-articles-title" className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Artikel <span className="text-green-600">Terpopuler</span>
                </h2>
                
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Artikel kesehatan yang paling banyak dibaca dan dipercaya oleh ribuan pembaca
                </p>
              </div>

              {/* Popular Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularArticles.map((article, index) => (
                  <PopularArticleCard
                    key={article.documentId}
                    article={article}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Filter Controls */}
          <FilterControls
            categories={categories}
            selectedCategory={filters.category || 'all'}
            onCategoryChange={handleCategoryChange}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            showFilters={uiState.showFilters}
            onToggleFilters={handleToggleFilters}
            isLoading={uiState.isLoadingCategories}
          />

          {/* Article Results */}
          <section id="articles-section" className="mb-12" aria-labelledby="articles-title">
            <div className="flex justify-between items-center mb-6">
              <h2 id="articles-title" className="text-2xl font-bold text-gray-900">
                {getCategoryName(filters.category || 'all')}
              </h2>
              <p className="text-gray-600 text-sm" aria-live="polite">
                {uiState.isLoading ? "Memuat..." : `${pagination.total} artikel ditemukan`}
              </p>
            </div>

            {/* Error State */}
            {uiState.error && (
              <ErrorDisplay 
                message={uiState.error} 
                onRetry={retryLoad}
              />
            )}

            {/* Loading State */}
            {uiState.isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!uiState.isLoading && !uiState.error && articles.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center" role="status" aria-live="polite">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookmarkIcon className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-lg text-gray-700 mb-2 font-medium">
                  Tidak ada artikel yang ditemukan
                </p>
                <p className="text-gray-500 mb-6">
                  Coba ubah kata kunci pencarian atau filter kategori
                </p>
                <button
                  onClick={handleResetSearch}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                  aria-label="Reset semua pencarian dan filter"
                >
                  Reset Pencarian
                </button>
              </div>
            )}

            {/* Articles Grid */}
            {!uiState.isLoading && !uiState.error && articles.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.documentId}
                      article={article}
                      showFeaturedBadge={true}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pageCount > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pageCount}
                    onPageChange={handlePageChange}
                    pagination={pagination}
                    isLoading={uiState.isLoading}
                  />
                )}
              </>
            )}
          </section>

          {/* Newsletter Signup */}
          <NewsletterSection />
        </div>
      </main>
    </MainLayout>
  );
};

export default ArtikelKesehatan;