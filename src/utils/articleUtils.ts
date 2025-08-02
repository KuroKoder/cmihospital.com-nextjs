// utils/articleUtils.ts
import { Article, SortBy } from "../types/article";

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

export const filterArticles = (
  articles: Article[],
  category: string,
  searchQuery: string,
  sortBy: SortBy
): Article[] => {
  let result = [...articles];

  // Filter by category
  if (category !== "all") {
    result = result.filter((article) => article.category === category);
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
    );
  }

  // Sort articles
  switch (sortBy) {
    case "newest":
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;
    case "oldest":
      result.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      break;
    case "popular":
      result.sort((a, b) => b.views - a.views);
      break;
  }

  return result;
};

export const getFeaturedArticles = (
  articles: Article[],
  limit: number = 3
): Article[] => {
  return articles.filter((article) => article.isFeatured).slice(0, limit);
};

export const scrollToElement = (
  elementId: string,
  offset: number = 100
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  }
};
