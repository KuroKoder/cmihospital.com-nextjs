// components/public/detailArticle/RelatedArticle.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye } from "lucide-react";
import { formatArticleDate, getImageUrl } from "@/utils/articleUtils";

interface RelatedArticle {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  image: string;
  readTime: string;
  views: number;
  author: string;
  date: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticle: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Artikel Terkait
            </h2>
            <p className="text-gray-600">
              Baca juga artikel kesehatan lainnya yang mungkin menarik untuk Anda
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Article Image */}
                <Link href={`/artikel-kesehatan/${article.slug}`}>
                  <div className="relative h-48 overflow-hidden group">
                    <Image
                      src={getImageUrl(article)}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                {/* Article Content */}
                <div className="p-6">
                  {/* Title */}
                  <Link href={`/artikel-kesehatan/${article.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="font-medium">{article.author}</span>
                    <span>{formatArticleDate(article.date)}</span>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/artikel-kesehatan/${article.slug}`}>
                    <button className="w-full mt-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300">
                      Baca Selengkapnya
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <Link href="/artikel-kesehatan">
              <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300">
                Lihat Semua Artikel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticle;