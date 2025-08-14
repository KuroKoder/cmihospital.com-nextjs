// src/components/performance/WebVitals.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console dalam development
    if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", metric);
    }

    // Send to Google Analytics in production
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        custom_map: { metric_id: "custom_metric" },
        metric_id: metric.id,
        metric_value: Math.round(metric.value),
        metric_delta: metric.delta,
        event_category: "web-vitals",
      });
    }

    // Optional: Send to other analytics services
    if (process.env.NODE_ENV === "production") {
      // Example: Send to custom analytics endpoint
      // fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metric),
      // }).catch(console.error);
    }
  });

  return null;
}
