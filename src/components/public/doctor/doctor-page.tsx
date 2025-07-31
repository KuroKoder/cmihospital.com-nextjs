"use client";

import { useState } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Ahmad Wijaya",
    specialist: "Dokter Umum",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    tenure: "2025 - Sekarang",
  },
  {
    id: 2,
    name: "Dr. Sarah Melinda",
    specialist: "Dokter Jantung",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    tenure: "2023 - 2030",
  },
  {
    id: 3,
    name: "Dr. Budi Santoso",
    specialist: "Dokter Anak",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    tenure: "2022 - 2030",
  },
  {
    id: 4,
    name: "Dr. Maya Sari",
    specialist: "Dokter Mata",
    image:
      "https://images.unsplash.com/photo-1594824226608-b0361dd43d7d?w=400&h=400&fit=crop&crop=face",
    tenure: "2024 - Sekarang",
  },
  {
    id: 5,
    name: "Dr. Rudi Hakim",
    specialist: "Dokter Bedah",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    tenure: "2021 - 2030",
  },
  {
    id: 6,
    name: "Dr. Lisa Chen",
    specialist: "Dokter Kulit",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    tenure: "2023 - Sekarang",
  },
  {
    id: 7,
    name: "Dr. Andi Pratama",
    specialist: "Dokter Saraf",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    tenure: "2020 - 2030",
  },
  {
    id: 8,
    name: "Dr. Nina Kartika",
    specialist: "Dokter Kandungan",
    image:
      "https://images.unsplash.com/photo-1594824226608-b0361dd43d7d?w=400&h=400&fit=crop&crop=face",
    tenure: "2022 - Sekarang",
  },
  {
    id: 9,
    name: "Dr. Hendra Gunawan",
    specialist: "Dokter THT",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    tenure: "2024 - 2030",
  },
];

const Doctors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3;

  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;

  const currentDoctors = doctors.slice(startIndex, endIndex);

  const scrollToTop = () => {
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  return (
    <div className="w-full min-h-screen py-4 pb-13 md:py-8 bg-white">
      <div className="container mx-auto px-4 pt-30 md:py-30">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-4">
            Tim Dokter Kami
          </h1>
          <p className="text-sm text-justify md:text-lg text-black max-w-2xl mx-auto">
            Bertemu dengan tim Dokter profesional dan berpengalaman yang siap
            memberikan pelayanan kesehatan terbaik untuk anda dan keluarga.
          </p>
        </div>

        {/* Doctors Grid - Modern Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4 md:px-15">
          {currentDoctors.map((doctor) => (
            <div key={doctor.id} className="relative group">
              {/* Modern Full Image Card */}
              <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                {/* Subtle Color Overlay for brand consistency */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-teal-400/10 to-emerald-500/10 z-10"></div>

                {/* Full Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Strong Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-center z-10">
                  {/* Specialist Badge */}
                  <div className="inline-block mb-3">
                    <span className="bg-green-500/50 backdrop-blur-lg text-white text-sm font-medium px-4 py-2 rounded-full border border-white/30">
                      {doctor.specialist}
                    </span>
                  </div>

                  {/* Doctor Name */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {doctor.name}
                  </h3>

                  {/* Tenure */}
                  <p className="text-green-300 text-sm mb-4">
                    Masa jabatan {doctor.tenure}
                  </p>
                </div>

                {/* Glassmorphism Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Updated Style */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          {/* Previous button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${
              currentPage === 1
                ? "border-emerald-700 text-green-400 cursor-not-allowed"
                : "border-emerald-700 text-green-400 hover:bg-green-400 hover:text-white transform hover:scale-105"
            }`}
          >
            <svg
              className="w-5 h-5"
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
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-bold transition-all duration-200 transform hover:scale-105 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-green-400 to-emerald-600 text-white border-transparent shadow-lg"
                    : "border-green-400 text-green-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-emerald-600 hover:text-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${
              currentPage === totalPages
                ? "border-emerald-600 text-green-400 cursor-not-allowed"
                : "border-emerald-600 text-green-400 hover:bg-green-400 hover:text-white transform hover:scale-105"
            }`}
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
