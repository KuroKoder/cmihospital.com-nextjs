"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ClinicExterior from "../../../../public/images/hero/Gedungcmi.jpg"; // Update the path as necessary
import ModalsKonsultasi from "../../ui/modal-konsultasi";

// Tipe data untuk banner
interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: any; // bisa diganti jadi StaticImageData jika pakai `import image from ...`
  ctaPrimary: string;
  ctaSecondary: string;
}

const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    condition: "",
    notes: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const banners: Banner[] = [
    {
      id: 1,
      title: "Penanganan Penyakit Kronis Secara Holistik",
      subtitle: "Klinik Spesialis Penyakit Kronis",
      description:
        "Pendekatan integratif yang memadukan kedokteran modern dengan pengobatan klasik Timur untuk kanker, jantung, diabetes, dan gagal ginjal.",
      image: ClinicExterior,
      ctaPrimary: "Jadwalkan Konsultasi",
      ctaSecondary: "Layanan Kami",
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const waNumber = "628119161166";
  //   const message = `*Konsultasi Baru*\nNama: ${formData.name}\nTelepon: ${formData.phone}\nKeluhan: ${formData.condition}\nCatatan: ${formData.notes}`;
  //   const encodedMessage = encodeURIComponent(message);
  //   const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;
  //   window.open(waURL, "_blank");
  // };

  return (
    <section className="relative min-h-screen mt-[130px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={banners.length > 1}
        className="h-screen"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full flex items-center">
              <div className="absolute inset-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={banner.id === 1}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
              </div>

              <div className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-6 text-center lg:text-left"
                    >
                      <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        {banner.subtitle}
                      </div>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                        {banner.title.split(" ").map((word, index) => (
                          <span
                            key={index}
                            className={
                              index === 1 || index === 2 ? "text-green-300" : ""
                            }
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </h1>
                      <p className="text-gray-200 text-base lg:text-lg max-w-2xl leading-relaxed">
                        {banner.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-green-500/50 hover:cursor-pointer"
                        >
                          {banner.ctaPrimary}
                        </button>
                        <button
                          onClick={() => {
                            const target = document.getElementById("layanan");
                            target?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:cursor-pointer text-white border border-white/30 font-semibold px-8 py-3 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-white/30"
                        >
                          {banner.ctaSecondary}
                        </button>
                      </div>

                      {isModalOpen && (
                        <ModalsKonsultasi
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        />
                      )}

                      <div className="flex flex-wrap gap-6 pt-6 justify-center lg:justify-start">
                        <div className="flex items-center text-white/90">
                          <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center mr-3">
                            <svg
                              className="h-4 w-4 text-green-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">
                            Dokter Berpengalaman
                          </span>
                        </div>
                        <div className="flex items-center text-white/90">
                          <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center mr-3">
                            <svg
                              className="h-4 w-4 text-green-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            <span className="text-sm font-medium">
                              Perawatan Personal
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-full max-w-md mx-auto lg:max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigasi Slider */}
      {banners.length > 1 && (
        <>
          <div className="swiper-button-prev-custom ...">{/* SVG */}</div>
          <div className="swiper-button-next-custom ...">{/* SVG */}</div>
          <div className="swiper-pagination-custom ..." />
        </>
      )}

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #3b82f6;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Hero;
