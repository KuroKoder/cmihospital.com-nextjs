// components/HealthTopicsSection.tsx
import React from "react";
import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { CATEGORIES, ARTICLES } from "../../../data/articles";

const HealthTopicsSection: React.FC = () => {
  const getArticleCount = (categoryId: string): number => {
    return ARTICLES.filter((article) => article.category === categoryId).length;
  };

  const topicsWithCounts = CATEGORIES.filter((cat) => cat.id !== "all").map(
    (category) => ({
      ...category,
      articleCount: getArticleCount(category.id),
    })
  );

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Topik Kesehatan Populer
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topicsWithCounts.map((category) => (
          <Link
            key={category.id}
            href={`/artikel/kategori/${category.id}`}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center justify-center text-center gap-2 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 group-hover:bg-green-200 transition-colors">
              <BookmarkIcon className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">
              {category.articleCount} artikel
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HealthTopicsSection;
