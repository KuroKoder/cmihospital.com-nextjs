"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", metric);
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        custom_map: { metric_id: "custom_metric" },
        metric_id: metric.id,
        metric_value: Math.round(metric.value),
        metric_delta: metric.delta,
        event_category: "web-vitals",
      });
    }
  });

  return null;
}
