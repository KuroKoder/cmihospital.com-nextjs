// types/global.d.ts
declare global {
  function gtag(
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date | number,
    config?: {
      [key: string]: any;
      page_title?: string;
      page_location?: string;
      custom_map?: { [key: string]: string };
    }
  ): void;

  interface Window {
    gtag: typeof gtag;
    dataLayer: any[];
  }
}

export {};