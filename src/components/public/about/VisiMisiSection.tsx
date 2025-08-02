import React from "react";
import NilaiPerusahaanCarousel from "./NilaiPerusahaanCarousel";

const VisiMisiSection: React.FC = () => {
  const misiItems = [
    "Meningkatkan kesehatan pasien dengan menggabungkan ilmu kedokteran barat dan ilmu kedokteran klasik timur secara terintegrasi.",
    "Menjalin kerjasama dengan berbagai pihak dalam memperluas jangkauan pelayanan.",
    "Meningkatkan kualitas SDM dengan pendidikan, pelatihan dan penelitian yang berkesinambungan.",
    "Meningkatkan pengetahuan masyarakat dengan pemberian edukasi kesehatan.",
  ];

  return (
    <div className="fade-in space-y-12 lg:space-y-16">
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4">
          Visi & Misi Perusahaan
        </h2>
        <div className="w-24 h-1 bg-green-600 mx-auto"></div>
      </div>

      {/* Visi & Misi Cards */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Visi Card */}
        <div className="bg-gradient-to-br from-green-900 to-green-800 text-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            Visi Kami
          </h3>
          <div className="h-1 w-20 sm:w-24 bg-white mb-6 sm:mb-8"></div>

          <blockquote className="text-lg sm:text-xl lg:text-2xl mb-6 font-medium leading-relaxed">
  &ldquo;Menjadi Rumah Sakit Komplementer Terbaik di Dunia Didukung oleh
  Ilmu dan Teknologi yang Mutakhir.&rdquo;
</blockquote>


          <p className="text-green-100 leading-relaxed">
            Kami berkomitmen untuk terus berada di garis depan inovasi layanan
            kesehatan, dengan menggabungkan kearifan pengobatan Timur klasik ala
            Ibnu Sina dan ilmu kedokteran modern, guna memberikan solusi
            holistik dan berkelanjutan bagi penanganan penyakit kronis.
          </p>
        </div>

        {/* Misi Card */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-900 mb-6">
            Misi Kami
          </h3>
          <div className="h-1 w-20 sm:w-24 bg-green-900 mb-6 sm:mb-8"></div>

          <ul className="space-y-4 sm:space-y-6">
            {misiItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-green-900 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 mr-4 flex-shrink-0 font-semibold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nilai-Nilai Perusahaan */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-800 mb-4">
            Nilai-Nilai Perusahaan
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Delapan nilai fundamental yang menjadi landasan dalam setiap
            pelayanan dan operasional kami
          </p>
        </div>

        <NilaiPerusahaanCarousel />

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 sm:p-8 rounded-2xl border border-green-200">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
                8
              </div>
              <div className="text-sm sm:text-base text-green-600 font-medium">
                Nilai Utama
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
                100%
              </div>
              <div className="text-sm sm:text-base text-green-600 font-medium">
                Komitmen
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
                1
              </div>
              <div className="text-sm sm:text-base text-green-600 font-medium">
                Visi Bersama
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisiSection;
