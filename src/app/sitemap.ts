import { fetchArticles, fetchCategories } from "@/lib/api/strapi";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/artikel-kesehatan`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  // Dynamic article pages
  try {
    const { articles } = await fetchArticles({ pageSize: 1000 }); // All articles
    const articlePages = articles.map((article) => ({
      url: `${baseUrl}/artikel-kesehatan/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Category pages
    const categories = await fetchCategories();
    const categoryPages = categories
      .filter((cat) => cat.id !== "all")
      .map((category) => ({
        url: `${baseUrl}/artikel-kesehatan/kategori/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    return [...staticPages, ...articlePages, ...categoryPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
