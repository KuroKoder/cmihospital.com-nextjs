// components/public/detailArticle/HeaderDetail.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Clock, User, Eye, Tag } from "lucide-react";
import { formatDate } from "@/utils/articleUtils";

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
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-[28rem] overflow-hidden">
        <Image
          src={artikel.image || "/images/placeholder-article.jpg"}
          alt={artikel.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        {/* Category Badge */}
        {artikel.category && (
          <div className="absolute top-4 left-4 bg-green-600/90 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow-md">
            <Tag size={14} />
            {artikel.category}
          </div>
        )}
      </div>

      {/* Content */}
      <header className="px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            {artikel.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-sm text-gray-600 mb-6">
            {/* Author */}
            <div className="flex items-center gap-2">
              <User size={16} className="text-green-600" />
              <span className="font-medium">{artikel.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-600" />
              <span>{formatDate(artikel.date)}</span>
            </div>

            {/* Read Time */}
            {artikel.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-green-600" />
                <span>{artikel.readTime}</span>
              </div>
            )}

            {/* Views */}
            {artikel.views !== undefined && (
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-green-600" />
                <span>{artikel.views.toLocaleString()} pembaca</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {artikel.tags?.length ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {artikel.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                >
                  #{tag}
                </span>
              ))}
              {artikel.tags.length > 5 && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  +{artikel.tags.length - 5} lainnya
                </span>
              )}
            </div>
          ) : null}

          {/* Verification Note */}
          <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 text-center">
            Artikel ini telah diperiksa dan diverifikasi oleh tim medis
            profesional
          </div>
        </div>
      </header>
    </article>
  );
};

export default HeaderDetail;
