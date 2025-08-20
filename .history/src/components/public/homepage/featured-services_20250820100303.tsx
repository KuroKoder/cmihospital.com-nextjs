"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import ModalsKonsultasi, { FormDataJadwal } from "../../ui/modal-konsultasi";
import Image from "next/image";
import Button from "../../ui/button";
import { services, Service } from "../../../data/services";

const LayananUnggulan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [initialFormData, setInitialFormData] = useState<
    Partial<FormDataJadwal>
  >({});

  // Function to get image position style
  const getImagePositionStyle = (service: Service) => {
    if (!service.imagePosition) {
      return { objectPosition: "center center" };
    }

    return {
      "--object-position-mobile": service.imagePosition.mobile,
      "--object-position-sm": service.imagePosition.tablet,
      "--object-position-lg": service.imagePosition.desktop,
    } as React.CSSProperties;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const openModal = (service: Service) => {
    setSelectedService(service);
    // Set the jenisKeluhan based on the selected service
    let jenisKeluhanValue = "";

    switch (service.nama) {
      case "Pengobatan Kanker":
        jenisKeluhanValue = "kanker";
        break;
      case "Pengobatan Jantung":
        jenisKeluhanValue = "jantung";
        break;
      case "Pengobatan Diabetes":
        jenisKeluhanValue = "diabetes";
        break;
      case "Pengobatan Ginjal":
        jenisKeluhanValue = "ginjal";
        break;
      default:
        jenisKeluhanValue = "umum";
    }

    setInitialFormData({
      jenisKeluhan: jenisKeluhanValue,
    });
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Custom CSS untuk responsive image positioning */}
      <style jsx>{`
        .responsive-image-position {
          object-position: var(--object-position-mobile, center center);
        }

        @media (min-width: 640px) {
          .responsive-image-position {
            object-position: var(--object-position-sm, center center);
          }
        }

        @media (min-width: 1024px) {
          .responsive-image-position {
            object-position: var(--object-position-lg, center center);
          }
        }
      `}</style>

      <section className="relative py-10 min-h-screen overflow-hidden bg-gray-50">
        <div className="relative z-10 container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Layanan{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Unggulan
              </span>{" "}
              Kami
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Memberikan pelayanan kesehatan terbaik dengan teknologi modern dan
              tim profesional berpengalaman untuk kesembuhan optimal Anda.
            </p>
          </motion.div>

          {/* Services Carousel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative max-w-7xl mx-auto"
          >
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / services.length)
                  }%)`,
                  width: `${services.length * 100}%`,
                }}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group flex-shrink-0"
                    style={{ width: `${100 / services.length}%` }}
                  >
                    {/* Service Card Split Layout */}
                    <div className="relative h-[600px] mx-4 rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col md:flex-row">
                      <div> className= "absolute"</div>
                      {/* Left Content */}
                      <div className="flex-1 p-8 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 leading-tight">
                          {service.nama}
                        </h3>

                        <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-md">
                          {service.deskripsi}
                        </p>

                        <div className="mb-8">
                          <h4 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wider">
                            Pelayanan
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {service.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-emerald-50 rounded-full text-sm font-medium border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                          onClick={() => openModal(service)}
                          variant="primary"
                          size="lg"
                          className="w-fit"
                        >
                          Konsultasi Sekarang
                        </Button>
                      </div>

                      {/* Right Image */}
                      <div className="relative flex-1 h-[300px] md:h-full">
                        <Image
                          src={service.image}
                          alt={service.nama}
                          fill
                          className="object-cover responsive-image-position"
                          style={getImagePositionStyle(service)}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              {/* Previous Button */}
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-emerald-100 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-200 transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-emerald-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-emerald-100 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-200 transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom decorative section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mt-0 md:mt-6"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-50 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 text-sm font-medium">
                Lebih dari 10,000+ pasien telah merasakan kesembuhan
              </span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        <ModalsKonsultasi
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={initialFormData}
          title={`Konsultasi ${selectedService?.nama || "Kesehatan"}`}
        />
      </section>
    </>
  );
};

export default LayananUnggulan;
