// File: components/footer/FooterMain.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import SocialIcons from "./SocialIcons";
import FooterLinkList from "./FooterLinkList";
import NewsletterForm from "./NewsletterForm";
import ContactInfo from "./ContactInfo";

const layananKami: [string, string][] = [
  ["Penanganan Penyakit Kanker", "/layanan/onkologi"],
  ["Penanganan Penyakit Jantung", "/layanan/kardiologi"],
  ["Penanganan Penyakit Diabetes", "/layanan/endokrinologi"],
  ["Penanganan Penyakit Ginjal", "/layanan/nefrologi"],
  ["Medical Check Up", "/layanan/medical-check-up"],
  ["Konsultasi Kesehatan", "/layanan/konsultasi"],
  ["Pemeriksaan Laboratorium", "/layanan/laboratorium"],
];

const menuNavigasi: [string, string][] = [
  ["Beranda", "/"],
  ["Tentang Kami", "/tentang-kami"],
  ["Dokter", "/dokter"],
  ["Artikel", "/artikel-kesehatan"],
  ["Kontak", "/kontak"],
  ["FAQ", "/faq"],
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const FooterMain = () => (
  <motion.div
    className="max-w-7xl mx-auto pt-12 pb-8 px-6 lg:px-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {/* About */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center">
          <div className="w-16 h-16 relative mr-3">
            <Image src="/images/logo/logo.svg" alt="Logo CMI Hospital" fill className="object-contain" priority />
          </div>
          <h2 className="text-2xl font-bold text-white">CMI Hospital</h2>
        </div>
        <p className="text-white-100 leading-relaxed mb-6 mt-4">
          CMI Hospital memberikan pelayanan kesehatan dengan menggabungkan dua keilmuan kedokteran, yaitu Ilmu Kedokteran Barat dan Ilmu Kedokteran Klasik berdasarkan buku The Canon of Medicine karya dr. Ibnu Sina.
        </p>
        <SocialIcons rounded />
      </motion.div>

      {/* Layanan */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">Layanan Kami</h3>
        <FooterLinkList items={layananKami} />
      </motion.div>

      {/* Navigasi */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">Menu Navigasi</h3>
        <FooterLinkList items={menuNavigasi} />
      </motion.div>

      {/* Kontak & Newsletter */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">Hubungi Kami</h3>
        <ContactInfo />
        <NewsletterForm />
      </motion.div>
    </div>
  </motion.div>
);

export default FooterMain;