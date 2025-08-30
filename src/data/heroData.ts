// data/heroData.ts
import { StaticImageData } from "next/image";
import ClinicExterior from "../../public/images/hero/Gedungcmi.jpg";
import CMI from "../../public/images/hero/HERO-3.webp";

export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  ctaPrimary: {
    text: string;
    ariaLabel: string;
    action: "scroll-to-contact" | "scroll-to-services" | "external-link";
    target?: string;
  };
  ctaSecondary: {
    text: string;
    ariaLabel: string;
    action: "scroll-to-contact" | "scroll-to-services" | "external-link";
    target?: string;
  };
  features: Array<{
    icon: "check" | "users" | "heart" | "shield" | "star";
    title: string;
    subtitle: string;
  }>;
  seo: {
    keywords: string[];
    structuredData: {
      "@context": "https://schema.org";
      "@type": "MedicalClinic" | "Hospital" | "HealthcareOrganization";
      name: string;
      description: string;
      address?: {
        "@type": "PostalAddress";
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
      };
      telephone?: string;
      url?: string;
    };
  };
}

export const heroData: HeroBanner[] = [
  {
    id: 1,
    title: "Gapai Kesehatan dengan Nyaman",
    subtitle: "Klinik Utama CMI",
    description:
      "Sejak 2008, CMI hadir sebagai pusat pengobatan penyakit kronis dengan metode terintegrasi antara medis modern dan pengobatan klasik timur. Kami menangani kanker, jantung, diabetes, dan gagal ginjal dengan hasil terukur, aman, dan minim efek samping. Ribuan pasien telah membuktikannya, kini giliran Anda untuk sehat kembali.",
    image: ClinicExterior,
    imageAlt:
      "Klinik Utama CMI - Spesialis penyakit kronis dengan metode pengobatan integratif",
    ctaPrimary: {
      text: "Konsultasi Gratis Sekarang",
      ariaLabel:
        "Hubungi kami untuk mendapatkan konsultasi gratis dengan dokter spesialis CMI",
      action: "scroll-to-contact",
      target: "/kontak", // Diubah ke route path
    },
    ctaSecondary: {
      text: "Lihat Kisah Kesembuhan",
      ariaLabel: "Lihat testimoni pasien yang berhasil sembuh di CMI",
      action: "scroll-to-services",
      target: "/testimoni", // Diubah ke route path
    },
    features: [
      {
        icon: "check",
        title: "Hasil Nyata & Terukur",
        subtitle: "Bukan sekadar janji",
      },
      {
        icon: "shield",
        title: "Aman & Minim Efek Samping",
        subtitle: "Terbukti dan terpercaya",
      },
    ],
    seo: {
      keywords: [
        "klinik penyakit kronis",
        "pengobatan kanker tanpa operasi",
        "terapi jantung tanpa operasi",
        "pengobatan diabetes tanpa insulin",
        "perawatan gagal ginjal untuk mengurangi frekuensi cuci darah",
        "CMI Hospital",
        "Klinik penyakit kronis terbaik",
        "konsultasi kesehatan gratis",
        "pengobatan integratif",
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: "Klinik Utama CMI",
        description:
          "Klinik spesialis pengobatan penyakit kronis dengan pendekatan integratif antara medis modern dan pengobatan alami. Menangani kanker tanpa operasi dan kemoterapi, jantung tanpa operasi ring dan bypass, diabetes tanpa suntik insulin dan minum obat seumur hidup, dan gagal ginjal untuk mengurangi frekuensi cuci darah.",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40134",
          addressLocality: "Bandung",
          addressRegion: "Jawa Barat",
          postalCode: "40134",
          addressCountry: "ID",
        },
        telephone: "22-(022)253-1000",
        url: "https://cmihospital.com",
      },
    },
  },
  {
    id: 2,
    title: "Kami Hadir untuk Kesehatan Anda",
    subtitle: "Klinik Utama CMI",
    description:
      "PENGOBATAN KANKER TANPA KEMOTERAPI & OPERASI, PENGOBATAN JANTUNG TANPA RING & BYPASS, PENGOBATAN GINJAL DAPAT MENGURANGI FREKUENSI CUCI DARAH, PENGOBATAN DIABETES TANPA INSULIN & OBAT SEUMUR HIDUP",
    image: CMI,
    imageAlt:
      "Klinik Utama CMI - Spesialis penyakit kronis dengan metode pengobatan integratif",
    ctaPrimary: {
      text: "Konsultasi Gratis Sekarang",
      ariaLabel:
        "Hubungi kami untuk mendapatkan konsultasi gratis dengan dokter spesialis CMI",
      action: "scroll-to-contact",
      target: "/kontak", // Diubah ke route path
    },
    ctaSecondary: {
      text: "Lihat Kisah Kesembuhan",
      ariaLabel: "Lihat testimoni pasien yang berhasil sembuh di CMI",
      action: "scroll-to-services",
      target: "/testimoni", // Diubah ke route path
    },
    features: [
      {
        icon: "check",
        title: "Hasil Nyata & Terukur",
        subtitle: "Bukan sekadar janji",
      },
      {
        icon: "shield",
        title: "Aman & Minim Efek Samping",
        subtitle: "Terbukti dan terpercaya",
      },
    ],
    seo: {
      keywords: [
        "klinik penyakit kronis",
        "pengobatan kanker tanpa operasi",
        "terapi jantung tanpa operasi",
        "pengobatan diabetes tanpa insulin",
        "perawatan gagal ginjal untuk mengurangi frekuensi cuci darah",
        "CMI Hospital",
        "Klinik penyakit kronis terbaik",
        "konsultasi kesehatan gratis",
        "pengobatan integratif",
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: "Klinik Utama CMI",
        description:
          "Klinik spesialis pengobatan penyakit kronis dengan pendekatan integratif antara medis modern dan pengobatan alami. Menangani kanker tanpa operasi dan kemoterapi, jantung tanpa operasi ring dan bypass, diabetes tanpa suntik insulin dan minum obat seumur hidup, dan gagal ginjal untuk mengurangi frekuensi cuci darah.",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40134",
          addressLocality: "Bandung",
          addressRegion: "Jawa Barat",
          postalCode: "40134",
          addressCountry: "ID",
        },
        telephone: "22-(022)253-1000",
        url: "https://cmihospital.com",
      },
    },
  },
];

// Utility functions
export const getHeroBannerById = (id: number): HeroBanner | undefined => {
  return heroData.find((banner) => banner.id === id);
};

export const getActiveBanners = (): HeroBanner[] => {
  return heroData.filter((banner) => banner.id > 0);
};

export const getHeroSEOKeywords = (): string[] => {
  return heroData.flatMap((banner) => banner.seo.keywords);
};

export const getHeroStructuredData = () => {
  return heroData.map((banner) => banner.seo.structuredData);
};
