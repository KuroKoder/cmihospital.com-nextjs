// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

// Optional: Metadata global untuk SEO
export const metadata: Metadata = {
  title: {
    default: "CMI Hospital",
    template: "%s | CMI Hospital",
  },
  description: "Rumah sakit dengan pendekatan holistik untuk penyakit kronis.",
  keywords: ["rumah sakit", "kesehatan", "pengobatan holistik", "CMI Hospital"],
  metadataBase: new URL("https://cmihospital.com"),
  openGraph: {
    title: "CMI Hospital",
    description:
      "Pengobatan kanker, jantung, diabetes & gagal ginjal tanpa operasi.",
    url: "https://cmihospital.com",
    siteName: "CMI Hospital",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CMI Hospital",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CMI Hospital",
    description:
      "Pengobatan terpercaya dan pendekatan personal di CMI Hospital.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
