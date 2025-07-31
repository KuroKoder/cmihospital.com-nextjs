"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaChevronRight,
  FaPaperPlane,
} from "react-icons/fa";
import ModalsKonsultasi from "../ui/modal-konsultasi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants
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

  // Newsletter subscription handler
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with actual API call
      // await subscribeToNewsletter(email);
      alert("Terima kasih telah berlangganan newsletter kami!");
      setEmail("");
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "CMI Hospital",
    alternateName: "Canon Medicinae Indonesia Hospital",
    description:
      "Rumah sakit yang memberikan pelayanan kesehatan dengan menggabungkan Ilmu Kedokteran Barat (Konvensional Modern) dengan Ilmu Kedokteran Klasik berdasarkan buku The Canon of Medicine (Al Qanun fii At-Tibb) karya dr. Ibnu Sina secara terintegrasi.",
    url: "https://cmihospital.com",
    logo: "https://cmihospital.com/assets/images/logo.svg",
    image: "https://cmihospital.com/assets/images/hospital-exterior.jpg",
    telephone: "+62821-2159-0000",
    email: "info@cmihospital.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Tubagus Ismail VII, Sekeloa",
      addressLocality: "Kecamatan Coblong",
      addressRegion: "Kota Bandung, Jawa Barat",
      postalCode: "40134",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.8951",
      longitude: "107.6084",
    },
    openingHours: ["Mo-Sa 08:00-17:00"],
    specialOpeningHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
      validFrom: "2024-01-01",
      description: "Emergency Department - 24 Hours",
    },
    sameAs: [
      "https://facebook.com/cmihospital",
      "https://instagram.com/cmihospital",
      "https://twitter.com/cmihospital",
      "https://linkedin.com/company/cmihospital",
      "https://youtube.com/@cmihospital",
    ],
    medicalSpecialty: [
      "Oncology",
      "Cardiology",
      "Endocrinology",
      "Nephrology",
      "Preventive Medicine",
      "Laboratory Medicine",
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <footer
        className="bg-gradient-to-b from-green-600 to-green-900 text-white"
        role="contentinfo"
        aria-label="Informasi kontak dan navigasi situs"
      >
        {/* Contact Info Bar */}
        <div className="bg-green-800 py-4 border-b border-green-600/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
            <address className="flex items-center gap-2 text-sm not-italic">
              <FaPhoneAlt className="text-green-300" aria-hidden="true" />
              <Link
                href="tel:+6282121590000"
                className="hover:text-green-200 transition-colors"
                aria-label="Telepon CMI Hospital"
              >
                +62 821-2159-0000
              </Link>
            </address>

            <div className="flex items-center gap-2 text-sm">
              <FaEnvelope className="text-green-300" aria-hidden="true" />
              <Link
                href="mailto:info@cmihospital.com"
                className="hover:text-green-200 transition-colors"
                aria-label="Email CMI Hospital"
              >
                info@cmihospital.com
              </Link>
            </div>

            <address className="flex items-center gap-2 text-sm not-italic">
              <FaMapMarkerAlt className="text-green-300" aria-hidden="true" />
              <span>
                Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota
                Bandung, Jawa Barat 40134
              </span>
            </address>

            <nav aria-label="Media sosial">
              <div className="flex items-center gap-4">
                <Link
                  href="https://facebook.com/cmihospital"
                  className="text-white hover:text-green-300 transition-colors"
                  aria-label="Facebook CMI Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="https://instagram.com/cmihospital"
                  className="text-white hover:text-green-300 transition-colors"
                  aria-label="Instagram CMI Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://twitter.com/cmihospital"
                  className="text-white hover:text-green-300 transition-colors"
                  aria-label="Twitter CMI Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href="https://linkedin.com/company/cmihospital"
                  className="text-white hover:text-green-300 transition-colors"
                  aria-label="LinkedIn CMI Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href="https://youtube.com/@cmihospital"
                  className="text-white hover:text-green-300 transition-colors"
                  aria-label="YouTube CMI Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Footer */}
        <motion.div
          className="max-w-7xl mx-auto pt-12 pb-8 px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* About Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center ">
                <div className="w-16 h-16 relative mr-3">
                  <div className="w-16 h-16 relative mr-3">
                    <Image
                      src="/images/logo/logo.svg"
                      alt="Logo CMI Hospital"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">CMI Hospital</h2>
              </div>

              <p className="text-white-100 leading-relaxed mb-6">
                CMI Hospital memberikan pelayanan kesehatan dengan menggabungkan
                dua keilmuan kedokteran, yaitu Ilmu Kedokteran Barat
                (Konvensional Modern) dengan Ilmu Kedokteran Klasik berdasarkan
                buku The Canon of Medicine (Al Qanun fii At-Tibb) karya dr. Ibnu
                Sina secara terintegrasi.
              </p>

              <nav aria-label="Media sosial CMI Hospital">
                <div className="flex space-x-3 mt-4">
                  <Link
                    href="https://facebook.com/cmihospital"
                    className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </Link>
                  <Link
                    href="https://instagram.com/cmihospital"
                    className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    href="https://twitter.com/cmihospital"
                    className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </Link>
                  <Link
                    href="https://linkedin.com/company/cmihospital"
                    className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </Link>
                </div>
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">
                Layanan Kami
              </h3>
              <nav aria-label="Layanan medis">
                <ul className="space-y-3">
                  {[
                    {
                      name: "Penanganan Penyakit Kanker",
                      href: "/layanan/onkologi",
                    },
                    {
                      name: "Penanganan Penyakit Jantung",
                      href: "/layanan/kardiologi",
                    },
                    {
                      name: "Penanganan Penyakit Diabetes",
                      href: "/layanan/endokrinologi",
                    },
                    {
                      name: "Penanganan Penyakit Ginjal",
                      href: "/layanan/nefrologi",
                    },
                    {
                      name: "Medical Check Up",
                      href: "/layanan/medical-check-up",
                    },
                    {
                      name: "Konsultasi Kesehatan",
                      href: "/layanan/konsultasi",
                    },
                    {
                      name: "Pemeriksaan Laboratorium",
                      href: "/layanan/laboratorium",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center group">
                      <FaChevronRight
                        className="mr-2 text-white-300 text-xs group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                      <Link
                        href={item.href}
                        className="text-white-100 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Navigation Menu */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">
                Menu Navigasi
              </h3>
              <nav aria-label="Navigasi utama">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Beranda", "/"],
                    ["Tentang Kami", "/tentang"],
                    ["Layanan", "/layanan"],
                    ["Dokter", "/dokter"],
                    ["Galeri", "/galeri"],
                    ["Testimoni", "/testimoni"],
                    ["Artikel", "/artikel-kesehatan"],
                    ["Kontak", "/kontak"],
                    ["FAQ", "/faq"],
                    ["Karir", "/karir"],
                  ].map(([label, url], index) => (
                    <div key={index} className="flex items-center group">
                      <FaChevronRight
                        className="mr-2 text-green-300 text-xs group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                      <Link
                        href={url}
                        className="text-white-100 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </div>
                  ))}
                </div>
              </nav>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-green-500 inline-block">
                Hubungi Kami
              </h3>

              <div className="space-y-4 mb-6">
                <address className="flex items-start not-italic">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <FaMapMarkerAlt className="text-sm" aria-hidden="true" />
                  </div>
                  <p className="text-white-100">
                    Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota
                    Bandung, Jawa Barat 40134
                  </p>
                </address>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <FaPhoneAlt className="text-sm" aria-hidden="true" />
                  </div>
                  <p className="text-white-100">
                    <Link
                      href="tel:+6281234567890"
                      className="hover:text-white transition-colors"
                      aria-label="Telepon rumah sakit"
                    >
                      +62 812-3456-789
                    </Link>
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <FaClock className="text-sm" aria-hidden="true" />
                  </div>
                  <div className="text-white-100">
                    <p>Senin - Sabtu: 08.00 - 17.00</p>
                    <p className="font-medium text-white-200">IGD: 24 Jam</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-white">
                  Berlangganan Newsletter
                </h4>
                <form onSubmit={handleSubscribe} className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Alamat email untuk newsletter
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                    aria-describedby="newsletter-description"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-full transition-colors disabled:opacity-50"
                    aria-label="Berlangganan newsletter"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
                <p
                  id="newsletter-description"
                  className="text-xs text-white-200 mt-2"
                >
                  Dapatkan informasi terbaru & promo spesial dari kami
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-green-200 text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-medium text-white">CMI Hospital</span>. All
              Rights Reserved by{" "}
              <Link
                href="https://cmihospital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-300 transition-colors"
              >
                PT. Canon Medicinae Indonesia
              </Link>
            </div>

            <nav aria-label="Link legal">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white-200">
                <Link
                  href="/kebijakan-privasi"
                  className="hover:text-white transition-colors"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  href="/syarat-ketentuan"
                  className="hover:text-white transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
                <Link
                  href="/sitemap"
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Float Appointment Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="hidden md:inline">Jadwalkan konsultasi</span>
          </button>
        </div>
        {isModalOpen && (
          <ModalsKonsultasi
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </footer>
    </>
  );
};

export default Footer;
