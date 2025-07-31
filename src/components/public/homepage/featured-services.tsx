"use client";
import { useState } from "react";
import ModalsKonsultasi from "../../ui/modal-konsultasi";

// Assume image imports are handled correctly
import ClinicExterior from "../../../../public/images/services/diabetes.png";

const layanan = [
  {
    nama: "Pengobatan Kanker",
    deskripsi:
      "Terapi kanker tanpa tindakan invasif seperti kemoterapi atau operasi dengan pendekatan holistik dan teknologi modern.",
    image: ClinicExterior,
    icon: "🩺",
    features: [
      "Terapi non-invasif",
      "Pendekatan holistik",
      "Minim efek samping",
    ],
  },
  {
    nama: "Pengobatan Jantung",
    deskripsi:
      "Penanganan penyakit jantung tanpa operasi pemasangan ring atau bypass melalui metode terapi terkini.",
    image: ClinicExterior,
    icon: "❤️",
    features: [
      "Tanpa operasi bypass",
      "Metode terapi terkini",
      "Pendekatan preventif",
    ],
  },
  {
    nama: "Pengobatan Diabetes",
    deskripsi:
      "Manajemen diabetes tanpa suntik insulin dan ketergantungan obat seumur hidup dengan pendekatan terintegrasi.",
    image: ClinicExterior,
    icon: "🩸",
    features: [
      "Manajemen nutrisi",
      "Terapi terintegrasi",
      "Pendekatan holistik",
    ],
  },
  {
    nama: "Pengobatan Ginjal",
    deskripsi:
      "Terapi gagal ginjal untuk mengurangi frekuensi cuci darah dan meningkatkan kualitas hidup pasien.",
    image: ClinicExterior,
    icon: "💧",
    features: [
      "Peningkatan kualitas hidup",
      "Program preventif",
      "Terapi farmakologis",
    ],
  },
  {
    nama: "Laboratorium Avicena",
    deskripsi:
      "Fasilitas laboratorium modern untuk pemeriksaan diagnostik menyeluruh dengan teknologi tinggi dan akurasi tinggi.",
    image: ClinicExterior,
    icon: "🔬",
    features: [
      "Diagnostik komprehensif",
      "Teknologi modern",
      "Hasil cepat dan akurat",
    ],
  },
];

const LayananUnggulan = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="layanan" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Layanan Unggulan
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            Pendekatan holistik dengan teknologi modern untuk penanganan
            penyakit kronis, memberikan kesembuhan dan kualitas hidup yang lebih
            baik.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {layanan.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === idx
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.nama}
            </button>
          ))}
        </div>

        {/* Active Service Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative">
              <img
                src={layanan[activeTab].image.src}
                alt={layanan[activeTab].nama}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{layanan[activeTab].icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {layanan[activeTab].nama}
                </h3>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {layanan[activeTab].deskripsi}
              </p>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Fitur Utama:
                </h4>
                <ul className="space-y-2">
                  {layanan[activeTab].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-600 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:cursor-pointer hover:bg-green-700 transition-colors"
                >
                  Konsultasi Sekarang
                </button>
                {isModalOpen && (
                  <ModalsKonsultasi
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {layanan.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTab === idx ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-label={`Pilih layanan ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LayananUnggulan;
