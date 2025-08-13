// components/public/detailArticle/HeaderDetail.tsx
'use client';

import React from "react";
import Image from "next/image";
import { Calendar, Clock, User, Eye, Tag, Bookmark, Share2 } from "lucide-react";
import { formatDate, getOptimalImageUrl } from "@/utils/articleUtils";

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
    tags?: string[];
  };
}

const HeaderDetail: React.FC<ArticleHeaderProps> = ({ artikel }) => {
  const handleBookmark = () => {
    // Implement bookmark functionality
    console.log('Bookmark artikel:', artikel.title);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artikel.title,
        text: artikel.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel berhasil disalin!');
    }
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={artikel.image || '/images/placeholder-article.jpg'}
          alt={artikel.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">          
          {artikel.category && (
            <div className="bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-full flex items-center shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              {artikel.category}
            </div>
          )}
        </div>
      </div>

      {/* Article Header Content */}
      <header className="px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {artikel.title}
          </h1>
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
            {/* Author */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 text-green-600" />
              <span className="font-medium">{artikel.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-green-600" />
              <span>{formatDate(artikel.date)}</span>
            </div>

            {/* Read Time */}
            {artikel.readTime && (
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-green-600" />
                <span>{artikel.readTime}</span>
              </div>
            )}

            {/* Views */}
            {artikel.views !== undefined && (
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Eye className="w-4 h-4 text-green-600" />
                <span>{artikel.views.toLocaleString()} pembaca</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {artikel.tags && artikel.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {artikel.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {artikel.tags.length > 5 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    +{artikel.tags.length - 5} lainnya
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 pt-4">
            <div className="text-xs text-gray-500 text-center">
              Artikel ini telah diperiksa dan diverifikasi oleh tim medis profesional
            </div>
          </div>
        </div>
      </header>
    </article>
  );
};

export default HeaderDetail;