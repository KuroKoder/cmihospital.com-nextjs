import React from "react";
import Image from "next/image";
import GedungCMI from "../../../../public/images/hero/cmi.webp";

const HistorySection: React.FC = () => {
  const milestones = [
    {
      year: "2008",
      title: "Berdirinya Poliklinik GR SETRA",
      description: "Awal mula perjalanan dengan 6 ruang perawatan",
    },
    {
      year: "2011",
      title: "Renovasi & Ekspansi",
      description: "Peningkatan fasilitas menjadi 84 ruang perawatan",
    },
    {
      year: "2019",
      title: "Klinik Utama CMI",
      description: "Upgrade status menjadi Klinik Utama dan Laboratorium CMI",
    },
  ];

  return (
    <div className="fade-in space-y-12 lg:space-y-16">
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4">
          Sejarah Perusahaan
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto"></div>
      </div>

      {/* Awal Mula Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4">
            Awal Mula
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Klinik Utama & Laboratorium CMI didirikan pada tanggal 8 Agustus
              2008 dengan nama awal Poliklinik dan Laboratorium GR Setra.
              Kepanjangan GR Setra adalah Glantrang Setra, diambil dari Bahasa
              Sansekerta yang berarti Pemberani Suci.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Berdirinya klinik dan laboratorium ini berawal dari niat tulus PT
              Canon Medicinae Indonesia untuk memberikan pelayanan kesehatan
              yang lengkap bagi masyarakat untuk menangani penyakit umum dan 4
              (empat) penyakit kronis yaitu kanker, diabetes melitus, penyakit
              jantung koroner (PJK) dan gagal ginjal.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Penanganan dilakukan dengan menggabungkan metode pengobatan
              konvensional modern (medis barat) dan pengobatan komplementer
              klasik timur secara terintegrasi berdasarkan pada buku The Canon
              of Medicine (Al-Qanun fi At-Thibb) Karya dr. Ibnu Sina (Avicenna),
              Bapak Kedokteran Modern Dunia.
            </p>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-gray-500 text-lg font-medium">
                  Foto Gedung Lama (2008)
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  [Placeholder untuk foto historical]
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-900 text-white">
              <p className="text-sm font-medium">GR SETRA CMI Tahun 2008</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perkembangan Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={GedungCMI}
            alt="Klinik Utama CMI Sekarang"
            className="w-full aspect-video object-cover"
            priority={true}
            quality={85}
            placeholder="blur"
          />
          <div className="p-4 bg-green-900 text-white">
            <p className="text-sm font-medium">Klinik Utama CMI Tahun 2025</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4">
            Perkembangan & Pencapaian
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Pada awal berdiri, Poliklinik dan Laboratorium GR Setra memiliki
              izin klinik sebagai klinik pratama dan hanya memiliki 6 (enam)
              ruang perawatan, namun karena tingginya antusias warga akan metode
              pengobatan komplementer untuk penyakit kronis tersebut.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pada tahun 2011 Poliklinik dan Laboratorium GR Setra memutuskan
              untuk melakukan renovasi gedung dan meningkatkan fasilitasnya
              sehingga memiliki 84 ruang perawatan yang didukung dengan
              teknologi yang mutakhir.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Di tahun 2019 GR Setra dapat mengubah izin kliniknya menjadi
              klinik utama dan kini dikenal sebagai Klinik Utama dan
              Laboratorium CMI.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 sm:p-8 lg:p-10 rounded-2xl border border-green-200">
        <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-6 sm:mb-8 text-center">
          Tonggak Sejarah
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="font-bold text-green-900 text-2xl sm:text-3xl mb-2">
                {milestone.year}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {milestone.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
