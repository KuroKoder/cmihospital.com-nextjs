// src/lib/performance/analytics.ts
export function trackPageView(url: string, title: string) {
  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("config", "GA_MEASUREMENT_ID", {
      page_title: title,
      page_location: url,
    });
  }
}

export function trackArticleRead(articleSlug: string, readTime: string) {
  if (typeof gtag !== "undefined") {
    gtag("event", "article_read", {
      article_slug: articleSlug,
      reading_time: readTime,
      event_category: "engagement",
    });
  }
}
