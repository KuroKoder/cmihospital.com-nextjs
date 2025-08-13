// components/public/detailArticle/RelatedArticle.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Calendar, ArrowRight } from "lucide-react";
import { formatDateShort } from "@/utils/articleUtils";
import type { Article } from "@/types/article";

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticle: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Limit to 6 articles maximum
  const displayedArticles = articles.slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 rounded-2xl">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Artikel Terkait
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Baca juga artikel kesehatan lainnya yang mungkin menarik untuk Anda. 
              Dapatkan informasi lengkap untuk menjaga kesehatan optimal.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article) => (
              <article
                key={`${article.id}-${article.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Article Image */}
                <Link href={`/artikel-kesehatan/${article.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image || '/images/placeholder-article.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                      {article.categoryName || 'Kesehatan'}
                    </div>
                  </div>
                </Link>

                {/* Article Content */}
                <div className="p-6">
                  {/* Title */}
                  <Link href={`/artikel-kesehatan/${article.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors group-hover:text-green-600">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                      
                    </div>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-700">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateShort(article.publishedAt || article.date)}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/artikel-kesehatan/${article.slug}`}>
                    <button className="w-full mt-4 py-2.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group/btn flex items-center justify-center">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Show More Articles if there are more than 6 */}
          {articles.length > 6 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Dan {articles.length - 6} artikel terkait lainnya...
              </p>
            </div>
          )}

          {/* View More Button */}
          <div className="text-center mt-12">
            <Link href="/artikel-kesehatan">
              <button className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>Lihat Semua Artikel</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RelatedArticle;