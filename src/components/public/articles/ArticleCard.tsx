// components/public/articles/ArticleCard.tsx
import React from "react";
import Link from "next/link";
import { ChevronRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Article } from "@/types/article";
import { formatDate, getRelativeTime } from "@/utils/articleUtils";
import Image from "next/image";
interface ArticleCardProps {
  article: Article;
  showFeaturedBadge?: boolean;
  variant?: "default" | "compact" | "featured";
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = "default",
}) => {
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/placeholder-article.jpg";
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "bg-white rounded-lg shadow-sm hover:shadow-md";
      case "featured":
        return "bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100";
      default:
        return "bg-white rounded-xl shadow-md hover:shadow-lg";
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case "compact":
        return "h-32";
      case "featured":
        return "h-56";
      default:
        return "h-48";
    }
  };

  return (
    <article
      className={`${getVariantClasses()} overflow-hidden transition-all duration-300 group relative hover:-translate-y-1`}
    >
      <Link href={`/artikel-kesehatan/${article.slug}`} className="block">
        {/* Image Section */}
        <div className={`relative ${getImageHeight()} overflow-hidden`}>
          <Image
            src={article.image || "/images/fallback.jpg"}
            alt={article.title || "Artikel kesehatan"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-110 duration-500"
            onError={handleImageError}
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 bg-white/95 backdrop-blur-sm text-green-800 text-sm font-semibold rounded-full shadow-lg">
              {article.categoryName}
            </span>
          </div>

          {/* Read time indicator */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-2 py-1 bg-black/30 backdrop-blur-sm text-white text-xs rounded-full">
              <ClockIcon className="h-3 w-3 mr-1" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className={`${variant === "compact" ? "p-4" : "p-5"}`}>
          {/* Title */}
          <h3
            className={`font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200 leading-tight ${
              variant === "featured" ? "text-xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>

          {/* Description */}
          <p
            className={`text-gray-600 mb-4 line-clamp-2 leading-relaxed ${
              variant === "compact" ? "text-sm" : "text-sm"
            }`}
          >
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">
                {article.author}
              </span>
              <span>•</span>
              <span title={formatDate(article.date)}>
                {getRelativeTime(article.date)}
              </span>
            </div>
          </div>

          {/* Tags (for featured variant) */}
          {variant === "featured" && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Read More Link */}
            <span className="text-green-600 text-sm font-medium flex items-center group-hover:text-green-700 transition-colors duration-200">
              Baca Selengkapnya
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </Link>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-colors duration-300 pointer-events-none" />
    </article>
  );
};

export default ArticleCard;
