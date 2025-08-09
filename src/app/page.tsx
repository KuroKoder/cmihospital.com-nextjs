// app/page.tsx
import Hero from "@/components/public/homepage/hero-banner";
import TentangKami from "@/components/public/homepage/about-us";
import LayananUnggulan from "@/components/public/homepage/featured-services";
import ArtikelTerbaru from "@/components/public/homepage/newest-articles";
import SocialMediaVideosSection from "@/components/public/homepage/video-section";
import PatientTestimonialSection from "@/components/public/homepage/testimonials";
import ConsultationSection from "@/components/public/homepage/consultation-contact";
// Update the import path below if the actual path is different, for example:
import MainLayout from "@/components/layout/main-layout";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda - CMI Hospital",
  description:
    "Selamat datang di CMI Hospital, rumah sakit terpercaya dengan layanan unggulan dan testimoni pasien terbaik.",
  keywords: [
    "rumah sakit",
    "layanan kesehatan",
    "CMI Hospital",
    "testimoni pasien",
  ],
  openGraph: {
    title: "Beranda - CMI Hospital",
    description: "Selamat datang di CMI Hospital...",
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
    title: "Beranda - CMI Hospital",
    description: "Selamat datang di CMI Hospital...",
    images: ["/images/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <LayananUnggulan />
      <TentangKami />
      <ArtikelTerbaru />
      <PatientTestimonialSection />
      <SocialMediaVideosSection />
      <ConsultationSection />
    </MainLayout>
  );
}
