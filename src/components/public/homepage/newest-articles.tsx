"use client";
import { ArrowRight, User, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import ArticleCard from "@/components/public/articles/ArticleCard";
import { useState, useEffect } from "react";
import { Article, Category } from "@/types/article";
import Image from "next/image";

// Simplified client API functions
const clientApi = {
  async fetchFeaturedArticles(limit = 6): Promise<Article[]> {
    try {
      const response = await fetch(`/api/articles/featured?limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: process.env.NODE_ENV === "development" ? "no-store" : "default",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      return [];
    }
  },

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: process.env.NODE_ENV === "development" ? "no-store" : "default",
      });

      if (!response.ok) {
        // Return default categories on error
        return [
          {
            id: "all",
            name: "Semua Kategori",
            slug: "all",
            description: "Tampilkan semua artikel",
          },
        ];
      }

      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [
        {
          id: "all",
          name: "Semua Kategori",
          slug: "all",
          description: "Tampilkan semua artikel",
        },
      ];
    }
  },
};

// Loading component
function LoadingState() {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-16 px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Memuat artikel...</span>
        </div>
      </div>
    </div>
  );
}

// Error component
function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-16 px-6 md:px-10 lg:px-16">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={onRetry}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="w-full bg-white">
      <div className="container mx-auto py-16 px-6 md:px-10 lg:px-16">
        <div className="text-center text-gray-600">
          Belum ada artikel tersedia.
        </div>
      </div>
    </div>
  );
}

// Main component
export default function HealthArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date utility
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [fetchedArticles, fetchedCategories] = await Promise.all([
        clientApi.fetchFeaturedArticles(6),
        clientApi.fetchCategories(),
      ]);

      setArticles(fetchedArticles);
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat artikel. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle retry
  const handleRetry = () => {
    fetchData();
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  // Get latest articles and featured article
  const latestArticles = articles.slice(0, 3);
  const featuredArticle =
    articles.find((article) => article.isFeatured) || articles[0];

  // Show empty state if no articles
  if (!featuredArticle) {
    return <EmptyState />;
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Featured Article */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Content */}
            <div className="w-full md:w-1/2 space-y-5">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                Artikel Unggulan
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 leading-tight">
                {featuredArticle.title}
              </h1>
              <p className="text-gray-600 text-base text-justify line-clamp-3">
                {featuredArticle.description}
              </p>

              <div className="flex items-center gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User size={16} className="text-green-600" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-green-600" />
                  <span>{formatDate(featuredArticle.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-green-600" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>

              <Link href={`/artikel-kesehatan/${featuredArticle.slug}`}>
                <button className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300">
                  Baca Selengkapnya
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2">
              <Link href={`/artikel-kesehatan/${featuredArticle.slug}`}>
                <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group">
                  <div className="relative w-full h-64 md:h-96">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                      quality={85}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-md">
                        {featuredArticle.categoryName}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="container mx-auto py-16 px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">
              Artikel Kesehatan Terbaru
            </h2>
            <p className="text-gray-600 text-justify">
              Temukan informasi terkini untuk hidup sehat dan sejahtera
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link href="/artikel-kesehatan">
              <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300">
                Lihat Semua Artikel
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        {latestArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                showFeaturedBadge={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            Belum ada artikel terbaru tersedia.
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 pt-12 border-t border-green-100">
          <div className="text-center bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ingin Membaca Lebih Banyak Artikel Kesehatan?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap artikel kesehatan kami dengan berbagai
              topik menarik dan informasi terkini dari para ahli.
            </p>
            <Link href="/artikel-kesehatan">
              <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 text-lg">
                Jelajahi Semua Artikel
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
