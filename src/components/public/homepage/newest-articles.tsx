"use client";
import { ArrowRight, User, Calendar, Clock } from "lucide-react";
import { ARTICLES, CATEGORIES } from "@/data/articles";
import Link from "next/link";
import ArticleCard from "@/components/public/articles/ArticleCard";

// Komponen utama
export default function HealthArticlesSection() {
  // Ambil 3 artikel terbaru berdasarkan tanggal
  const latestArticles = ARTICLES
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Mengatur artikel featured berdasarkan views terbanyak
  const featuredArticles = ARTICLES
    .filter((article) => article.isFeatured)
    .sort((a, b) => b.views - a.views);
  const latestArticle = featuredArticles[0] || ARTICLES[0];

  // Handle tab change
  const handleReadMore = (slug: string) => {
    // Navigasi ke detail artikel akan ditambahkan di sini
    console.log('Navigate to:', `/artikel-kesehatan/${slug}`);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section dengan artikel unggulan */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 space-y-5">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                Artikel Unggulan
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 leading-tight">
                {latestArticle.title}
              </h1>
              <p className="text-gray-600 text-base text-justify">
                {latestArticle.description}
              </p>

              <div className="flex items-center gap-5 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User size={16} className="text-green-600" />
                  <span>{latestArticle.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-green-600" />
                  <span>{formatDate(latestArticle.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-green-600" />
                  <span>{latestArticle.readTime}</span>
                </div>
              </div>

              <Link href={`/artikel-kesehatan/${latestArticle.slug}`}>
                <button className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300">
                  Baca Selengkapnya
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="w-full md:w-1/2">
              <Link href={`/artikel-kesehatan/${latestArticle.slug}`}>
                <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group">
                  <img
                    src={latestArticle.image}
                    alt={latestArticle.title}
                    className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-md">
                        {CATEGORIES.find(cat => cat.id === latestArticle.category)?.name || latestArticle.category}
                      </span>
                      <span className="bg-white/90 text-green-800 text-xs px-2 py-1 rounded-md font-medium">
                        {latestArticle.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section Artikel Kesehatan */}
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

        {/* Grid artikel - menggunakan ArticleCard component */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              categories={CATEGORIES}
              showFeaturedBadge={true}
            />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 pt-12 border-t border-green-100">
          <div className="text-center bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ingin Membaca Lebih Banyak Artikel Kesehatan?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap artikel kesehatan kami dengan berbagai topik menarik dan informasi terkini dari para ahli.
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