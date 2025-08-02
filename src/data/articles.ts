// data/articles.ts
import { Category, Article } from "../types/article";

export const CATEGORIES: Category[] = [
  { id: "all", name: "Semua Artikel" },
  { id: "tips", name: "Tips Kesehatan" },
  { id: "penyakit", name: "Informasi Penyakit" },
  { id: "gaya-hidup", name: "Gaya Hidup Sehat" },
  { id: "ibu-anak", name: "Kesehatan Ibu & Anak" },
  { id: "gizi", name: "Nutrisi & Gizi" },
  { id: "mental", name: "Kesehatan Mental" },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "10 Cara Menjaga Kesehatan Jantung di Usia Muda",
    slug: "10-cara-menjaga-kesehatan-jantung-usia-muda",
    category: "tips",
    image: "/images/articles/articlepage/jantung.png",
    description:
      "Menjaga kesehatan jantung sejak dini sangat penting untuk mencegah penyakit kardiovaskular di masa depan.",
    author: "dr. Anisa Wijaya",
    date: "2025-05-10",
    readTime: "5 menit",
    views: 1240,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Mengenal Diabetes Tipe 2 dan Cara Pencegahannya",
    slug: "mengenal-diabetes-tipe-2-dan-cara-pencegahannya",
    category: "penyakit",
    image: "/images/articles/articlepage/diabetes-tipe-2.png",
    description:
      "Diabetes tipe 2 dapat dicegah dengan pola hidup sehat dan pemahaman yang baik tentang faktor risikonya.",
    author: "dr. Budi Santoso, Sp.PD",
    date: "2025-05-05",
    readTime: "7 menit",
    views: 980,
  },
  {
    id: 3,
    title: "Panduan Nutrisi Seimbang untuk Ibu Hamil",
    slug: "panduan-nutrisi-seimbang-untuk-ibu-hamil",
    category: "ibu-anak",
    image: "/images/articles/articlepage/nutrisi-ibu-hamil.png",
    description:
      "Nutrisi yang tepat selama kehamilan sangat penting untuk kesehatan ibu dan perkembangan optimal janin.",
    author: "dr. Dina Pratiwi, Sp.OG",
    date: "2025-04-28",
    readTime: "6 menit",
    views: 1560,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Manfaat Olahraga Rutin untuk Kesehatan Mental",
    slug: "manfaat-olahraga-rutin-untuk-kesehatan-mental",
    category: "gaya-hidup",
    image: "/images/articles/articlepage/olahraga-rutin.png",
    description:
      "Aktivitas fisik teratur tidak hanya bermanfaat untuk tubuh, tetapi juga sangat baik untuk kesehatan mental Anda.",
    author: "dr. Eko Prasetyo, Sp.KJ",
    date: "2025-04-22",
    readTime: "4 menit",
    views: 875,
  },
  {
    id: 5,
    title: "Pentingnya Sarapan Sehat untuk Produktivitas Harian",
    slug: "pentingnya-sarapan-sehat-untuk-produktivitas-harian",
    category: "gizi",
    image: "/images/articles/articlepage/sarapan-sehat.png",
    description:
      "Sarapan yang bergizi dapat meningkatkan energi, konsentrasi dan produktivitas Anda sepanjang hari.",
    author: "dr. Fina Maharani, M.Gizi",
    date: "2025-04-15",
    readTime: "5 menit",
    views: 1120,
  },
  {
    id: 6,
    title: "Panduan Lengkap Imunisasi untuk Bayi dan Anak",
    slug: "panduan-lengkap-imunisasi-untuk-bayi-dan-anak",
    category: "ibu-anak",
    image: "/images/articles/articlepage/imunisasi-bayi.png",
    description:
      "Jadwal imunisasi yang tepat sangat penting untuk melindungi anak dari berbagai penyakit berbahaya.",
    author: "dr. Gita Nurhasanah, Sp.A",
    date: "2025-04-10",
    readTime: "8 menit",
    views: 1890,
  },
  {
    id: 7,
    title: "Mengatasi Kecemasan dan Stres di Era Digital",
    slug: "mengatasi-kecemasan-dan-stres-di-era-digital",
    category: "mental",
    image: "/images/articles/articlepage/kecemasan-dan-stres.png",
    description:
      "Strategi efektif untuk mengelola kecemasan dan stres yang semakin umum terjadi di era digital saat ini.",
    author: "dr. Hendra Wijaya, Sp.KJ",
    date: "2025-04-05",
    readTime: "6 menit",
    views: 1350,
  },
  {
    id: 8,
    title: "Panduan Deteksi Dini Kanker yang Perlu Diketahui",
    slug: "panduan-deteksi-dini-kanker-yang-perlu-diketahui",
    category: "penyakit",
    image: "/images/articles/articlepage/deteksi-kanker.png",
    description:
      "Mengenal tanda-tanda awal berbagai jenis kanker dan kapan harus melakukan pemeriksaan rutin.",
    author: "dr. Indah Permata, Sp.PD-KHOM",
    date: "2025-03-28",
    readTime: "7 menit",
    views: 2100,
    isFeatured: true,
  },
];
