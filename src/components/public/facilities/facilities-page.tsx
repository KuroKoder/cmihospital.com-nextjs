"use client";

import { useState } from "react";
import {
  ChevronRight,
  Heart,
  Users,
  Microscope,
  BedDouble,
  Coffee,
} from "lucide-react";
import ModalsKonsultasi from "../../ui/modal-konsultasi";
import { testimonials } from "../../../data/testimonials";
import { facilitiesData } from "../../../data/fasilitasData";
import Image from "next/image";

// Icon mapping
const iconMap = {
  Heart: Heart,
  Users: Users,
  Microscope: Microscope,
  BedDouble: BedDouble,
  Coffee: Coffee,
};
import Link from "next/link";
export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState("chronic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Select first 3 testimonials for display
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <div className="font-sans mt-26">
      {/* Hero Section with Enhanced Background */}
      <section className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white py-15 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />

          {/* Additional Pattern Variations */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%2310b981' fill-opacity='0.4'/%3E%3Ccircle cx='15' cy='15' r='0.8' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='45' cy='15' r='0.6' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='15' cy='45' r='0.7' fill='%23ffffff' fill-opacity='0.25'/%3E%3Ccircle cx='45' cy='45' r='0.5' fill='%2310b981' fill-opacity='0.35'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Extra Blur Elements for Depth */}
          <div className="absolute top-32 right-1/4 w-48 h-48 bg-emerald-300/8 rounded-full blur-2xl animate-pulse delay-300" />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white/6 rounded-full blur-2xl animate-pulse delay-700" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-600/10 to-green-800/20" />
        </div>

        <div className="container flex mx-auto px-4 items-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Fasilitas Lengkap Untuk Kesehatan Anda
            </h2>
            <p className="text-md leading-relaxed md:text-xl text-white mb-8">
              Klinik Utama CMI menyediakan fasilitas kesehatan terpadu dengan
              pendekatan pengobatan komplementer berlandaskan metode Ibnu Sina
              untuk meningkatkan kualitas hidup pasien.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-green-800 text-sm md:text-medium px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:cursor-pointer hover:bg-green-100 transition duration-300"
              >
                Jadwalkan Konsultasi
              </button>
              <button
                onClick={() => {
                  const target = document.getElementById("fasilitas");
                  target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="border border-white text-white text-sm md:text-medium px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
            {isModalOpen && (
              <ModalsKonsultasi
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="fasilitas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Fasilitas Unggulan Kami
              </h2>
              <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
                Klinik Utama CMI dilengkapi dengan berbagai fasilitas modern
                yang didukung oleh tim medis profesional untuk memberikan
                perawatan terbaik bagi pasien.
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {facilitiesData.map((facility) => (
                <button
                  key={facility.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeTab === facility.id
                      ? "bg-green-600 text-white"
                      : "bg-white text-green-800 border border-green-300 hover:bg-green-50"
                  }`}
                  onClick={() => setActiveTab(facility.id)}
                >
                  {facility.title}
                </button>
              ))}
            </div>

            {/* Content */}
            {facilitiesData.map((facility) => (
              <div
                key={facility.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                  activeTab === facility.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 hidden"
                }`}
              >
                {/* Facility Header with Image */}
                <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src={facility.image}
                    // src="/images/hero/cmi.webp"
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="bg-white bg-opacity-20 p-4 rounded-full inline-block mb-4">
                        {(() => {
                          const IconComponent = iconMap[facility.iconName];
                          return (
                            <IconComponent className="w-6 h-6 text-green-600" />
                          );
                        })()}
                      </div>
                      <h3 className="text-3xl font-bold">{facility.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-8 text-lg">
                    {facility.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {facility.details.map((detail) => (
                      <div
                        key={detail.id}
                        className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-green-100/50"
                      >
                        {/* Detail Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={detail.image}
                            alt={detail.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Detail Content */}
                        <div className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <ChevronRight className="w-5 h-5 text-green-600 mr-2" />
                            {detail.title}
                          </h4>
                          <p className="text-gray-600">{detail.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pendekatan Ibnu Sina with Enhanced Background */}
      <section className="py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-emerald-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h50v50H0z' fill='none'/%3E%3Ccircle cx='25' cy='25' r='1.5' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='10' cy='10' r='0.8' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='40' cy='40' r='1' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-16 left-16 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-16 right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-green-400/8 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Pengobatan Komplementer Metode Ibnu Sina
              </h2>
              <p className="text-md md:text-xl text-green-100 max-w-3xl mx-auto">
                Klinik Utama CMI mengadopsi pendekatan pengobatan komplementer
                berlandaskan metode Ibnu Sina yang telah terbukti secara ilmiah
                dan memiliki sejarah panjang dalam dunia kedokteran.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-600/80 backdrop-blur-sm inline-block p-3 rounded-full mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Holistik & Terpadu</h3>
                <p className="text-green-100">
                  Pendekatan holistik yang mempertimbangkan aspek fisik, mental,
                  dan spiritual pasien dalam proses penyembuhan.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-600/80 backdrop-blur-sm inline-block p-3 rounded-full mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Berbasis Bukti</h3>
                <p className="text-green-100">
                  Pengobatan komplementer yang didukung oleh penelitian ilmiah
                  dan telah terbukti efektif untuk berbagai kondisi kronis.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-600/80 backdrop-blur-sm inline-block p-3 rounded-full mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Personalisasi</h3>
                <p className="text-green-100">
                  Program pengobatan yang disesuaikan dengan kondisi dan
                  kebutuhan spesifik setiap pasien untuk hasil optimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial with Enhanced Background */}
      <section className="py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/20 to-gray-50">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Ccircle cx='20' cy='20' r='1.2' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='10' cy='30' r='0.8' fill='%2310b981' fill-opacity='0.2'/%3E%3Ccircle cx='30' cy='10' r='1' fill='%2310b981' fill-opacity='0.25'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-20 right-20 w-56 h-56 bg-green-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-300/15 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Apa Kata Mereka
              </h2>
              <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
                Berbagai testimonial dari pasien yang telah merasakan manfaat
                dari fasilitas dan pelayanan Klinik Utama CMI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayedTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100/50 transform hover:-translate-y-2"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 w-full gap-4">
                    {/* Gambar */}
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 160px"
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Teks */}
                    <div className="text-center sm:text-left">
                      <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {testimonial.condition} - {testimonial.age} Tahun
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {testimonial.tag}
                    </span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {testimonial.title}
                  </h5>
                  <p className="text-gray-600 italic text-sm">
                    &ldquo;{testimonial.story}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Background */}
      <section className="py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h45v45H0z' fill='none'/%3E%3Ccircle cx='22.5' cy='22.5' r='1.8' fill='%23ffffff' fill-opacity='0.2'/%3E%3Ccircle cx='10' cy='35' r='1' fill='%2310b981' fill-opacity='0.3'/%3E%3Ccircle cx='35' cy='10' r='1.2' fill='%23ffffff' fill-opacity='0.15'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Mulai Perjalanan Kesehatan Anda Bersama Kami
            </h2>
            <p className="text-md md:text-xl text-green-100 mb-8">
              Jadwalkan konsultasi dengan dokter spesialis kami dan temukan
              solusi terbaik untuk kondisi kesehatan Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/kontak"
                className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-center"
              >
                Jadwalkan Konsultasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
