"use client";

import Image from "next/image";
import { useState } from "react";
import GedungCMI from "../assets/images/cmi.webp";
import {
  ChevronRight,
  Building2,
  Beaker,
  Hospital,
  Heart,
  Users,
  Microscope,
  BedDouble,
  Coffee,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import ModalsKonsultasi from "../../ui/modal-konsultasi";
import { testimonials } from "../../../data/testimonials";

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState("chronic");
  // Data fasilitas (akan diambil dari API)
  const [facilities] = useState([
    {
      id: "chronic",
      title: "Spesialisasi Penyakit Kronis",
      icon: <Heart className="w-6 h-6 text-green-600" />,
      image: "/api/placeholder/600/400",
      description:
        "Pusat unggulan untuk pengobatan penyakit kronis dengan pendekatan komplementer berlandaskan metode Ibnu Sina.",
      details: [
        {
          id: 1,
          title: "Pengobatan Kanker",
          description:
            "Layanan terapi komplementer untuk pasien kanker dengan pendekatan holistik yang memadukan pengobatan tradisional dan modern.",
          image: "/images/fasilitas/chronic/kanker.png",
        },
        {
          id: 2,
          title: "Penanganan Gagal Ginjal",
          description:
            "Program komprehensif untuk pasien gagal ginjal dengan metode terapi yang membantu meningkatkan kualitas hidup.",
          image: "/images/fasilitas/chronic/gagal-ginjal.png",
        },
        {
          id: 3,
          title: "Manajemen Diabetes",
          description:
            "Program pengelolaan diabetes jangka panjang dengan pendekatan nutrisi, aktivitas fisik dan terapi komplementer.",
          image: "/images/fasilitas/chronic/diabetes.png",
        },
        {
          id: 4,
          title: "Perawatan Jantung",
          description:
            "Perawatan jantung terpadu dengan fokus pada pencegahan, pengobatan, dan rehabilitasi menggunakan metode Ibnu Sina.",
          image: "/images/fasilitas/chronic/jantung.png",
        },
      ],
    },
    {
      id: "general",
      title: "Poliklinik Umum",
      icon: <Users className="w-6 h-6 text-green-600" />,
      image: "/api/placeholder/600/400",
      description:
        "Layanan kesehatan umum untuk menangani berbagai keluhan dan penyakit sehari-hari.",
      details: [
        {
          id: 5,
          title: "Konsultasi Dokter Umum",
          description:
            "Layanan konsultasi dengan dokter umum berpengalaman untuk berbagai keluhan kesehatan.",
          image: "/images/fasilitas/general/konsultasi-dokter-umum.png",
        },
        {
          id: 6,
          title: "Pemeriksaan Kesehatan Rutin",
          description:
            "Layanan pemeriksaan kesehatan berkala untuk memantau kondisi kesehatan Anda.",
          image: "/images/fasilitas/general/pemeriksaan-kesehatan-rutin.png",
        },
        {
          id: 7,
          title: "Vaksinasi",
          description:
            "Program vaksinasi untuk berbagai penyakit menular sebagai upaya pencegahan.",
          image: "/images/fasilitas/general/vaksinasi.png",
        },
        {
          id: 8,
          title: "Pengobatan Penyakit Ringan",
          description:
            "Penanganan cepat untuk penyakit umum seperti flu, demam, dan infeksi ringan.",
          image: "/images/fasilitas/general/pengobatan-penyakit-ringan.png",
        },
      ],
    },
    {
      id: "laboratory",
      title: "Laboratorium",
      icon: <Microscope className="w-6 h-6 text-green-600" />,
      image: "/api/placeholder/600/400",
      description:
        "Fasilitas laboratorium modern untuk mendukung diagnosis dan pemantauan kesehatan pasien.",
      details: [
        {
          id: 9,
          title: "Pemeriksaan Darah Lengkap",
          description:
            "Analisis darah menyeluruh untuk mendeteksi berbagai kondisi kesehatan.",
          image: "/images/fasilitas/laboratory/pemeriksaan-darah-lengkap.png",
        },
        {
          id: 10,
          title: "Tes Fungsi Organ",
          description:
            "Pemeriksaan fungsi organ vital seperti hati, ginjal, dan jantung.",
          image: "/images/fasilitas/laboratory/tes-fungsi-organ.png",
        },
        {
          id: 11,
          title: "Tes Hormon",
          description:
            "Pemeriksaan kadar hormon untuk diagnosis dan pemantauan berbagai kondisi endokrin.",
          image: "/images/fasilitas/laboratory/tes-hormon.png",
        },
        {
          id: 12,
          title: "Tes Genetik",
          description:
            "Analisis genetik untuk mendeteksi predisposisi terhadap penyakit tertentu.",
          image: "/images/fasilitas/laboratory/tes-genetik.png",
        },
      ],
    },
    {
      id: "inpatient",
      title: "Rawat Inap",
      icon: <BedDouble className="w-6 h-6 text-green-600" />,
      image: "/api/placeholder/600/400",
      description:
        "Fasilitas rawat inap nyaman dengan perawatan optimal untuk pasien yang membutuhkan pengawasan intensif.",
      details: [
        {
          id: 13,
          title: "Kamar Rawat Inap Nyaman",
          description:
            "Kamar rawat inap dengan berbagai pilihan kelas yang dilengkapi fasilitas pendukung kenyamanan pasien.",
          image: "/images/fasilitas/inpatient/kamar-rawat-inap-nyaman.png",
        },
        {
          id: 14,
          title: "Perawatan 24 Jam",
          description:
            "Tim medis profesional yang siap memberikan perawatan 24 jam penuh.",
          image: "/images/fasilitas/inpatient/perawatan-24-jam.png",
        },
        {
          id: 15,
          title: "Ruang Keluarga",
          description:
            "Area khusus untuk keluarga pasien yang dilengkapi dengan fasilitas pendukung.",
          image: "/images/fasilitas/inpatient/ruang-keluarga.png",
        },
        {
          id: 16,
          title: "Program Rehabilitasi",
          description:
            "Program rehabilitasi terpadu untuk pemulihan pasien pascaperawatan.",
          image: "/images/fasilitas/inpatient/program-rehabilitasi.png",
        },
      ],
    },
    {
      id: "amenities",
      title: "Fasilitas Pendukung",
      icon: <Coffee className="w-6 h-6 text-green-600" />,
      image: "/api/placeholder/600/400",
      description:
        "Berbagai fasilitas pendukung untuk kenyamanan pasien dan keluarga selama berada di klinik.",
      details: [
        {
          id: 17,
          title: "Kafetaria",
          description:
            "Kafetaria yang menyediakan menu sehat dan bergizi untuk pasien dan pengunjung.",
          image: "/images/fasilitas/amenities/kafetaria.png",
        },
        {
          id: 18,
          title: "Apotek",
          description:
            "Apotek lengkap dengan berbagai obat konvensional dan herbal.",
          image: "/images/fasilitas/amenities/apotek.png",
        },
        {
          id: 19,
          title: "Area Parkir Luas",
          description:
            "Lahan parkir yang luas dan aman untuk kendaraan pasien dan pengunjung.",
          image: "/images/fasilitas/amenities/area-parkir-luas.png",
        },
        {
          id: 20,
          title: "Ruang Ibadah",
          description:
            "Ruang ibadah nyaman untuk mendukung kebutuhan spiritual pasien dan keluarga.",
          image: "/images/fasilitas/amenities/ruang-ibadah.png",
        },
      ],
    },
  ]);

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
              {facilities.map((facility) => (
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
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                  activeTab === facility.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 hidden"
                }`}
              >
                {/* Facility Header with Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="bg-white bg-opacity-20 p-4 rounded-full inline-block mb-4">
                        {facility.icon}
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
                        <div className="h-48 overflow-hidden">
                          <img
                            src={detail.image}
                            alt={detail.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
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