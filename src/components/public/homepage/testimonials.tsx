"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Quote,
  Heart,
  Star,
  Calendar,
  Award,
  Users,
  Shield,
} from "lucide-react";
import ModalsKonsultasi from "../../ui/modal-konsultasi";

export default function PatientTestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  // Data testimoni pasien dengan data yang lebih emosional
  const testimonials = [
    {
      id: 1,
      name: "Hendra Johari",
      age: 45,
      condition: "Penyakit Ginjal Polikistik",
      title: "Dari Putus Asa Menuju Harapan Baru",
      tag: "Transplantasi Ginjal",
      story:
        "Ketika dokter mengatakan ginjalku hanya berfungsi 15%, dunia rasanya runtuh. Sebagai kepala keluarga dengan dua anak yang masih sekolah, aku merasa gagal. Tapi tim medis di sini tidak hanya mengobati penyakitku, mereka mengembalikan harapanku. Setelah transplantasi ginjal yang sukses, aku kembali bisa bermain dengan anak-anakku dan bekerja dengan normal. Terima kasih telah mengembalikan kehidupanku.",
      image: "/api/placeholder/400/300",
      duration: "8 bulan perawatan",
      rating: 5,
      beforeAfter: {
        before: "Fungsi ginjal 15%",
        after: "Kembali normal 100%",
      },
    },
    {
      id: 2,
      name: "Anita Sari",
      age: 38,
      condition: "Kanker Payudara Stadium 3",
      title: "Melawan Kanker dengan Senyuman",
      tag: "Survivor Kanker",
      story:
        "Mendengar diagnosis kanker payudara stadium 3 di usia 38 tahun seperti mimpi buruk yang tak berujung. Aku takut tidak bisa melihat putri kecilku tumbuh dewasa. Tapi di sinilah aku belajar bahwa kanker bukan akhir dari segalanya. Tim onkologi yang luar biasa, perawat yang selalu tersenyum, dan dukungan keluarga membuatku kuat. Kini, 2 tahun bebas kanker, aku tidak hanya survivor - aku adalah pejuang yang menginspirasi wanita lain.",
      image: "/api/placeholder/400/300",
      duration: "18 bulan perjuangan",
      rating: 5,
      beforeAfter: {
        before: "Stadium 3",
        after: "2 tahun bebas kanker",
      },
    },
    {
      id: 3,
      name: "Dimas Pratama",
      age: 32,
      condition: "Stroke Usia Muda",
      title: "Bangkit dari Kelumpuhan Total",
      tag: "Rehabilitasi Stroke",
      story:
        "Stroke di usia 32 tahun mengubah segalanya dalam sekejap. Dari eksekutif muda yang aktif, tiba-tiba aku tidak bisa menggerakkan tangan kananku, bahkan untuk makan sendiri. Istri dan anak-anakku melihatku menangis setiap hari. Tapi tim rehabilitasi di sini tidak pernah menyerah padaku. Mereka percaya aku bisa sembuh ketika aku sendiri sudah putus asa. 6 bulan kemudian, aku tidak hanya bisa berjalan normal, tapi kembali bekerja dan bahkan lari marathon. Ini bukan hanya kesembuhan fisik, tapi kelahiran kembali jiwaku.",
      image: "/api/placeholder/400/300",
      duration: "6 bulan rehabilitasi",
      rating: 5,
      beforeAfter: {
        before: "Kelumpuhan total",
        after: "Kembali normal 100%",
      },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentTestimonial, autoplay]);

  // Fungsi untuk menampilkan testimoni berikutnya dengan animasi minimal
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 200);
  };

  // Fungsi untuk menampilkan testimoni sebelumnya dengan animasi minimal
  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 200);
  };

  const testimonial = testimonials[currentTestimonial];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="w-full relative py-4 md:py-12 overflow-hidden"
      aria-label="Testimoni Pasien"
    >
      {/* Background profesional dengan warna netral */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-green-50">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      {/* Konten utama */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header dengan styling profesional */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-700 text-sm font-medium mb-6">
            <Award size={16} />
            Cerita Inspiratif Kesembuhan
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Testimoni <span className="text-green-600">Pasien</span> yang
            <br />
            Telah <span className="text-green-600">Sembuh</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Setiap cerita adalah bukti nyata komitmen kami dalam memberikan
            pelayanan kesehatan terbaik. Inilah kisah mereka yang telah
            merasakan perawatan berkualitas tinggi.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div
            className={`relative transition-opacity duration-300 ${
              isAnimating ? "opacity-75" : "opacity-100"
            }`}
          >
            {/* Card utama dengan desain profesional */}
            <article className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <div className="grid lg:grid-cols-2">
                {/* Bagian gambar */}
                <div className="relative h-80 lg:h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10"></div>
                  <img
                    src={testimonial.image}
                    alt={`Foto testimoni ${testimonial.name} - ${testimonial.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Tag kategori */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Shield size={14} />
                      {testimonial.tag}
                    </span>
                  </div>

                  {/* Navigation controls */}
                  <nav
                    className="absolute bottom-4 left-4 right-4 z-20"
                    aria-label="Navigasi testimoni"
                  >
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          prevTestimonial();
                          setAutoplay(false);
                        }}
                        className="p-2 bg-white/90 hover:bg-white rounded-full text-slate-700 transition-colors duration-200"
                        aria-label="Testimoni sebelumnya"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <div className="text-white text-sm font-medium bg-slate-800/80 px-3 py-1 rounded-full">
                        {currentTestimonial + 1} dari {testimonials.length}
                      </div>

                      <button
                        onClick={() => {
                          nextTestimonial();
                          setAutoplay(false);
                        }}
                        className="p-2 bg-white/90 hover:bg-white rounded-full text-slate-700 transition-colors duration-200"
                        aria-label="Testimoni berikutnya"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </nav>
                </div>

                {/* Bagian konten */}
                <div className="p-8 lg:p-10 relative">
                  {/* Quote icon */}
                  <div className="absolute top-8 right-8 text-slate-200">
                    <Quote size={48} />
                  </div>

                  {/* Patient info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-slate-800 font-semibold text-lg">
                          {testimonial.name}
                        </h2>
                        <p className="text-slate-600 text-sm">
                          {testimonial.age} tahun • {testimonial.condition}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                      {testimonial.title}
                    </h3>

                    {/* Rating dan duration */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`Rating ${testimonial.rating} dari 5 bintang`}
                      >
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar size={14} />
                        <span>{testimonial.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <blockquote className="mb-6">
                    <p className="text-slate-700 leading-relaxed text-base italic">
                      "{testimonial.story}"
                    </p>
                  </blockquote>

                  {/* Before/After */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-red-600 text-sm font-medium mb-1">
                          Sebelum
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {testimonial.beforeAfter.before}
                        </p>
                      </div>
                      <div>
                        <p className="text-green-600 text-sm font-medium mb-1">
                          Setelah
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {testimonial.beforeAfter.after}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Konsultasi Sekarang
                      <ArrowRight size={16} />
                    </button>
                    {isModalOpen && (
                      <ModalsKonsultasi
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                    <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                      <Users size={16} />
                      Cerita Lainnya
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Indikator testimoni */}
          <nav
            className="flex justify-center mt-8 gap-2"
            aria-label="Pilih testimoni"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setAutoplay(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? "w-8 bg-green-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Tampilkan testimoni ${index + 1}`}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
