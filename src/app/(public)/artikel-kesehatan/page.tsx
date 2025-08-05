"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  BookmarkIcon, 
  ArrowLongRightIcon,
  EyeIcon,
  FireIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { 
  EyeIcon as EyeSolidIcon,
  FireIcon as FireSolidIcon 
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Head from "next/head";
import MainLayout from "../../../components/layout/main-layout";

// Import components
import SearchSection from "../../../components/public/articles/SearchSection";
import FilterControls from "../../../components/public/articles/FilterControls";
import ArticleCard from "../../../components/public/articles/ArticleCard";
import Pagination from "../../../components/public/articles/Pagination";
import NewsletterSection from "../../../components/public/articles/NewsletterSection";

// Import data and types
import { CATEGORIES, ARTICLES } from "../../../data/articles";
import { Article, FilterState } from "../../../types/article";
import {
  filterArticles,
  getFeaturedArticles,
  scrollToElement,
} from "../../../utils/articleUtils";

const ARTICLES_PER_PAGE = 6;

// Component untuk Popular Article Card
const PopularArticleCard: React.FC<{
  article: Article;
  rank: number;
  categories: typeof CATEGORIES;
}> = ({ article, rank, categories }) => {
  const categoryName = categories.find((cat) => cat.id === article.category)?.name || "Artikel";
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

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

        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={article.image || "/api/placeholder/600/400"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          
          {/* Category Badge on Image */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-800 text-sm font-semibold rounded-full shadow-lg">
              {categoryName}
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
              <span>{formatDate(article.date)}</span>
            </div>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
              {article.readTime}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Views with trend indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-600">
                <FireIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{article.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
              <span className="text-sm">Baca Artikel</span>
              <ArrowLongRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-colors duration-300 pointer-events-none"></div>
      </article>
    </Link>
  );
};

const ArtikelKesehatan: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategory: "all",
    searchQuery: "",
    sortBy: "newest",
    showFilters: false,
    currentPage: 1,
  });

  // Memoized filtered articles untuk optimasi performa
  const filteredArticles = useMemo(() => {
    return filterArticles(
      ARTICLES,
      filterState.selectedCategory,
      filterState.searchQuery,
      filterState.sortBy
    );
  }, [
    filterState.selectedCategory,
    filterState.searchQuery,
    filterState.sortBy,
  ]);

  // Memoized popular articles - diurutkan berdasarkan views
  const popularArticles = useMemo(() => {
    return [...ARTICLES]
      .sort((a, b) => b.views - a.views)
      .slice(0, 6); // Ambil 6 artikel terpopuler
  }, []);

  // Reset halaman ke 1 ketika filter berubah
  useEffect(() => {
    setFilterState((prev) => ({ ...prev, currentPage: 1 }));
  }, [
    filterState.selectedCategory,
    filterState.searchQuery,
    filterState.sortBy,
  ]);

  // Memoized pagination calculations
  const paginationData = useMemo(() => {
    const indexOfLastArticle = filterState.currentPage * ARTICLES_PER_PAGE;
    const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
    const currentArticles = filteredArticles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

    return {
      currentArticles,
      totalPages,
      indexOfFirstArticle,
      indexOfLastArticle,
    };
  }, [filteredArticles, filterState.currentPage]);

  // Memoized featured articles
  const featuredArticles = useMemo(() => {
    return getFeaturedArticles(ARTICLES);
  }, []);

  // Handler functions dengan useCallback untuk optimasi
  const handleSearchChange = useCallback((query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setFilterState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  const handleSortChange = useCallback((sortBy: FilterState["sortBy"]) => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  }, []);

  const handleToggleFilters = useCallback(() => {
    setFilterState((prev) => ({ ...prev, showFilters: !prev.showFilters }));
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setFilterState((prev) => ({ ...prev, currentPage: pageNumber }));
    setTimeout(() => {
      scrollToElement("articles-section");
    }, 100);
  }, []);

  const handleResetSearch = useCallback(() => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: "",
      selectedCategory: "all",
      currentPage: 1,
    }));
  }, []);

  const getCategoryName = useCallback((categoryId: string) => {
    return (
      CATEGORIES.find((cat) => cat.id === categoryId)?.name || "Semua Artikel"
    );
  }, []);

  // Show featured articles only when no search/filter applied
  const shouldShowFeaturedArticles =
    filterState.searchQuery === "" && filterState.selectedCategory === "all";

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
        <meta
          property="og:title"
          content="Artikel Kesehatan Terbaru 2025 - Klinik Utama CMI"
        />
        <meta
          property="og:description"
          content="Informasi dan tips kesehatan terkini dari tim dokter Klinik Utama CMI"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://klinikutamacmi.com/artikel" />
        <meta
          property="og:image"
          content="https://klinikutamacmi.com/images/artikel-banner.jpg"
        />
        <link rel="canonical" href="https://klinikutamacmi.com/artikel" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: "Artikel Kesehatan Terbaru - Klinik Utama CMI",
            description:
              "Temukan informasi dan tips kesehatan terkini dari tim dokter Klinik Utama CMI.",
            url: "https://klinikutamacmi.com/artikel",
            publisher: {
              "@type": "Organization",
              name: "Klinik Utama CMI",
              logo: {
                "@type": "ImageObject",
                url: "https://klinikutamacmi.com/images/logo.png",
              },
            },
          })}
        </script>
      </Head>

      <main className="bg-white min-h-screen pt-28 pb-16">
        {/* Hero Section with Search */}
        <SearchSection
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearchChange}
          showFilters={filterState.showFilters}
          onToggleFilters={handleToggleFilters}
        />

        <div className="container mx-auto px-4">
          {/* Popular Articles Section - Enhanced */}
          {shouldShowFeaturedArticles && popularArticles.length > 0 && (
            <section
              className="mb-16"
              aria-labelledby="popular-articles-title"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
                  <FireSolidIcon className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-semibold text-sm">Trending Sekarang</span>
                </div>
                
                <h2
                  id="popular-articles-title"
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                >
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
                    key={article.id}
                    article={article}
                    rank={index + 1}
                    categories={CATEGORIES}
                  />
                ))}
              </div>

          
            </section>
          )}

          {/* Featured Articles Section
          {shouldShowFeaturedArticles && featuredArticles.length > 0 && (
            <section
              className="mb-12"
              aria-labelledby="featured-articles-title"
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  id="featured-articles-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  Artikel Unggulan
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categories={CATEGORIES}
                    showFeaturedBadge={true}
                  />
                ))}
              </div>
            </section>
          )} */}

          {/* Filter Controls */}
          <FilterControls
            categories={CATEGORIES}
            selectedCategory={filterState.selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={filterState.sortBy}
            onSortChange={handleSortChange}
            showFilters={filterState.showFilters}
            onToggleFilters={handleToggleFilters}
          />

          {/* Article Results */}
          <section
            id="articles-section"
            className="mb-12"
            aria-labelledby="articles-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                id="articles-title"
                className="text-2xl font-bold text-gray-900"
              >
                {getCategoryName(filterState.selectedCategory)}
              </h2>
              <p className="text-gray-600 text-sm" aria-live="polite">
                {filteredArticles.length} artikel ditemukan
              </p>
            </div>

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <div
                className="bg-white rounded-lg shadow-md p-8 text-center"
                role="status"
                aria-live="polite"
              >
                <img
                  src="/images/no-results.svg"
                  alt=""
                  className="w-32 h-32 mx-auto mb-4 opacity-70"
                  aria-hidden="true"
                />
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
            {paginationData.currentArticles.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginationData.currentArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      categories={CATEGORIES}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {paginationData.totalPages > 1 && (
                  <Pagination
                    currentPage={filterState.currentPage}
                    totalPages={paginationData.totalPages}
                    onPageChange={handlePageChange}
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