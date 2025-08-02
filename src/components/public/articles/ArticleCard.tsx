// components/ArticleCard.tsx
import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Article, Category } from "../../../types/article";
import { formatDate } from "../../../utils/articleUtils";

interface ArticleCardProps {
  article: Article;
  categories: Category[];
  showFeaturedBadge?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  categories,
  showFeaturedBadge = false,
}) => {
  const categoryName =
    categories.find((cat) => cat.id === article.category)?.name || "Artikel";

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group relative">
      {showFeaturedBadge && article.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Unggulan
          </span>
        </div>
      )}

      <Link href={`/artikel/${article.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image || "/api/placeholder/600/400"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <span className="absolute bottom-4 left-4 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
            {categoryName}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {article.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{formatDate(article.date)}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {article.views.toLocaleString()} pembaca
            </span>
            <span className="text-green-600 text-sm font-medium flex items-center group-hover:underline">
              Baca Selengkapnya
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
