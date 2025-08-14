// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebVitals } from "@/components/performance/WebVitals";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Klinik Utama CMI - Pelayanan Kesehatan Terpercaya",
    template: "%s | Klinik Utama CMI",
  },
  description:
    "Klinik Utama CMI menyediakan pelayanan kesehatan terpercaya dengan tim medis berpengalaman dan fasilitas modern.",
  keywords: [
    "klinik",
    "kesehatan",
    "cmi",
    "pelayanan medis",
    "dokter",
    "pengobatan holistik",
    "rumah sakit",
  ],
  authors: [{ name: "Klinik Utama CMI" }],
  creator: "Klinik Utama CMI",
  publisher: "Klinik Utama CMI",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://cmihospital.com",
    siteName: "Klinik Utama CMI",
    title: "Klinik Utama CMI - Pelayanan Kesehatan Terpercaya",
    description:
      "Pengobatan kanker, jantung, diabetes & gagal ginjal tanpa operasi.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CMI Hospital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cmihospital",
    creator: "@cmihospital",
    title: "CMI Hospital",
    description:
      "Pengobatan terpercaya dan pendekatan personal di CMI Hospital.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="id" className={inter.className}>
      <head>
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />

        {/* Security meta tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
      </head>

      <body className="antialiased">
        {/* Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        <div id="main-content">{children}</div>

        {/* Performance Monitoring */}
        <WebVitals />

        {/* Google Analytics */}
        {process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        )}

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Klinik Utama CMI",
              url:
                process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com",
              logo: `${
                process.env.NEXT_PUBLIC_BASE_URL || "https://cmihospital.com"
              }/images/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "(022) 253 1000",
                contactType: "customer service",
                availableLanguage: ["Indonesian", "English"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40134", // ganti sesuai alamat
                addressLocality: "Bandung",
                addressCountry: "ID",
              },
              sameAs: [
                "https://facebook.com/cmihospital",
                "https://instagram.com/cmihospital.official",
                "https://linkedin.com/company/cmihospital",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
