"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BookmarkIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Head from "next/head";
import MainLayout from "../../../components/layout/main-layout";

// Import components
import SearchSection from "../../../components/public/articles/SearchSection";
import FilterControls from "../../../components/public/articles/FilterControls";
import ArticleCard from "../../../components/public/articles/ArticleCard";
import Pagination from "../../../components/public/articles/Pagination";
import NewsletterSection from "../../../components/public/articles/NewsletterSection";
import HealthTopicsSection from "../../../components/public/articles/HealthTopicsSection";

// Import data and types
import { CATEGORIES, ARTICLES } from "../../../data/articles";
import { Article, FilterState } from "../../../types/article";
import {
  filterArticles,
  getFeaturedArticles,
  scrollToElement,
} from "../../../utils/articleUtils";

const ARTICLES_PER_PAGE = 6;

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
    // Scroll ke section artikel dengan delay kecil untuk smooth experience
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

      <main className="bg-white min-h-screen pt-36 pb-16">
        {/* Hero Section with Search */}
        <SearchSection
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearchChange}
          showFilters={filterState.showFilters}
          onToggleFilters={handleToggleFilters}
        />

        <div className="container mx-auto px-4">
          {/* Featured Articles Section */}
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
                <Link
                  href="/artikel/featured"
                  className="text-green-600 hover:text-green-800 flex items-center transition-colors duration-200"
                  aria-label="Lihat semua artikel unggulan"
                >
                  <span>Lihat Semua</span>
                  <ArrowLongRightIcon
                    className="h-5 w-5 ml-1"
                    aria-hidden="true"
                  />
                </Link>
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
          )}

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
                    // totalItems={filteredArticles.length}
                    // itemsPerPage={ARTICLES_PER_PAGE}
                  />
                )}
              </>
            )}
          </section>

          {/* Newsletter Signup */}
          <NewsletterSection />

          {/* Related Health Topics */}
          <HealthTopicsSection />
        </div>
      </main>
    </MainLayout>
  );
};

export default ArtikelKesehatan;
