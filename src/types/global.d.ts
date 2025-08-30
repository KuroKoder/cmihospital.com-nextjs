// types/global.d.ts
interface GTagConfig {
  page_title?: string;
  page_location?: string;
  custom_map?: { [key: string]: string };
  [key: string]: unknown;
}

declare global {
  function gtag(
    command: "config" | "event" | "js" | "set",
    targetId: string | Date | number,
    config?: GTagConfig
  ): void;

  interface Window {
    gtag: typeof gtag;
    dataLayer: unknown[];
  }
}

export {};
