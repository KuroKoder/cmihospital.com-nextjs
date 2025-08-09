// components/public/detailArticle/HeaderDetail.tsx
import React from "react";
import Image from "next/image";
import { Calendar, Clock, User, Eye } from "lucide-react";
import { formatArticleDate, getImageUrl } from "@/utils/articleUtils";

interface ArticleHeaderProps {
  artikel: {
    title: string;
    author: string;
    date: string;
    readTime?: string;
    views?: number;
    image?: string;
    description?: string;
    category?: string;
    isFeatured?: boolean;
  };
}

const HeaderDetail: React.FC<ArticleHeaderProps> = ({ artikel }) => {
  return (
    <div className="relative bg-white">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={getImageUrl(artikel)}
          alt={artikel.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Featured Badge */}
        {artikel.isFeatured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 text-sm font-medium rounded-full">
            Artikel Unggulan
          </div>
        )}
        
        {/* Category Badge */}
        {artikel.category && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-full">
            {artikel.category}
          </div>
        )}
      </div>

      {/* Article Header Content */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {artikel.title}
          </h1>

          {/* Description */}
          {artikel.description && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {artikel.description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              <span className="font-medium">{artikel.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span>{formatArticleDate(artikel.date)}</span>
            </div>

            {/* Read Time */}
            {artikel.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span>{artikel.readTime}</span>
              </div>
            )}

            {/* Views */}
            {artikel.views !== undefined && (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span>{artikel.views.toLocaleString()} views</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default HeaderDetail;