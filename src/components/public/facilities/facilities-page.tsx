"use client";

import { useState } from "react";
import { ChevronRight, Heart, Users, Microscope, BedDouble, Coffee } from "lucide-react";
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

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState("chronic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Select first 3 testimonials for display
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <div className="font-sans mt-26">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-15">
        <div className="container flex mx-auto px-4 items-center">
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
                          return <IconComponent className="w-6 h-6 text-green-600" />;
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
                    {facility.details.map((detail, index) => (
                      <div
                        key={detail.id}
                        className="bg-gray-50 rounded-lg overflow-hidden"
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

      {/* Pendekatan Ibnu Sina */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
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
              <div className="bg-green-700 rounded-xl p-6">
                <div className="bg-green-600 inline-block p-3 rounded-full mb-4">
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

              <div className="bg-green-700 rounded-xl p-6">
                <div className="bg-green-600 inline-block p-3 rounded-full mb-4">
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

              <div className="bg-green-700 rounded-xl p-6">
                <div className="bg-green-600 inline-block p-3 rounded-full mb-4">
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

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
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
                  <p className="text-gray-600 italic text-sm">&ldquo;{testimonial.story}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Mulai Perjalanan Kesehatan Anda Bersama Kami
            </h2>
            <p className="text-md md:text-xl text-green-100 mb-8">
              Jadwalkan konsultasi dengan dokter spesialis kami dan temukan
              solusi terbaik untuk kondisi kesehatan Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-100 transition duration-300"
              >
                Jadwalkan Konsultasi
              </button>
              {isModalOpen && (
                <ModalsKonsultasi
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
              {/* <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition duration-300">
                Hubungi Kami
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}