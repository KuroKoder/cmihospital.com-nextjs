import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GedungCMI from "../../../../public/images/about/cmi.webp";

const NilaiPerusahaanCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nilaiPerusahaan = [
    {
      title: "Integritas Ilmiah dan Spiritual",
      text: "Menggabungkan ilmu kedokteran modern dan klasik timur secara ilmiah dan etis, berpijak pada nilai spiritual dan filosofi pengobatan dari dr. Ibnu Sina.",
      img: GedungCMI,
    },
    {
      title: "Kepedulian terhadap Kesehatan Holistik",
      text: "Melayani pasien dengan pendekatan menyeluruh yang memperhatikan aspek fisik, mental, dan spiritual untuk penyembuhan yang utuh.",
      img: GedungCMI,
    },
    {
      title: "Inovasi Berkelanjutan",
      text: "Terus mengembangkan metode pengobatan berbasis riset, teknologi mutakhir, dan kebijaksanaan klasik demi hasil yang lebih baik bagi pasien.",
      img: GedungCMI,
    },
    {
      title: "Keberanian dan Ketulusan dalam Pelayanan",
      text: 'Meneladani semangat "Glantrang Setra" (Pemberani Suci), melayani dengan hati, keberanian, dan dedikasi tinggi untuk kesehatan masyarakat.',
      img: GedungCMI,
    },
    {
      title: "Kolaborasi dan Kemitraan",
      text: "Membangun jejaring dan kemitraan strategis secara nasional dan internasional demi pengembangan dan penerapan ilmu kedokteran yang lebih luas.",
      img: GedungCMI,
    },
    {
      title: "Pendidikan dan Pengembangan SDM",
      text: "Menumbuhkan budaya belajar, riset, dan pelatihan berkelanjutan bagi seluruh tenaga kesehatan untuk mencapai standar tertinggi.",
      img: GedungCMI,
    },
    {
      title: "Edukasi dan Pemberdayaan Masyarakat",
      text: "Memberikan edukasi kesehatan yang mudah dipahami untuk meningkatkan kesadaran masyarakat dalam mencegah dan menangani penyakit kronis.",
      img: GedungCMI,
    },
    {
      title: "Kualitas Tanpa Kompromi",
      text: "Berkomitmen memberikan layanan dengan standar kualitas terbaik dalam setiap tindakan medis dan pelayanan kepada pasien.",
      img: GedungCMI,
    },
  ];

  const totalSlides = {
    mobile: nilaiPerusahaan.length,
    desktop: Math.ceil(nilaiPerusahaan.length / 3),
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides.desktop);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + totalSlides.desktop) % totalSlides.desktop
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Desktop Grid View */}
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {nilaiPerusahaan.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full group"
            >
              <div className="mb-6 overflow-hidden rounded-lg">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={192}
                  quality={85}
                  placeholder="blur"
                />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-green-900 mb-3 line-clamp-2">
                {item.title}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Carousel */}
      <div className="lg:hidden">
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {nilaiPerusahaan.map((item, index) => (
                <div key={index} className="min-w-full flex-shrink-0 px-2">
                  <div className="bg-white p-6 rounded-xl shadow-lg mx-2">
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <Image
                        src={item.img}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        width={400}
                        height={192}
                        quality={85}
                        placeholder="blur"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-4 text-center">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed text-center">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-green-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-green-800" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {nilaiPerusahaan.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? "bg-green-600 scale-110 shadow-md"
                  : "bg-green-300 hover:bg-green-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NilaiPerusahaanCarousel;
