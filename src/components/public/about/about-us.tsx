"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import GedungCMI from "../../../../public/images/about/cmi.webp";
import axios from "axios";

export default function AboutUs() {
  type TabType = "sejarah" | "visi-misi" | "lokasi";
  const [activeTab, setActiveTab] = useState<TabType>("sejarah");
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

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const totalSlides = {
    mobile: nilaiPerusahaan.length,
    tablet: Math.ceil(nilaiPerusahaan.length / itemsPerPage.tablet),
    desktop: Math.ceil(nilaiPerusahaan.length / itemsPerPage.desktop),
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides.desktop);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + totalSlides.desktop) % totalSlides.desktop
    );
  };

  // Types for form and error state
  type FormData = {
    nama: string;
    email: string;
    telepon: string;
    subjek: string;
    pesan: string;
  };

  type FormError = Partial<Record<keyof FormData, string>>;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const [formData, setFormData] = useState<FormData>({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormError>({});

  const validateForm = (): FormError => {
    const newError: FormError = {};

    if (!formData.nama.trim()) {
      newError.nama = "Nama harus diisi.";
    }

    if (!formData.email.trim()) {
      newError.email = "Email harus diisi.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newError.email = "Format email tidak valid.";
    }

    if (!formData.telepon.trim()) {
      newError.telepon = "Nomor telepon harus diisi.";
    } else if (!/^\d+$/.test(formData.telepon)) {
      newError.telepon = "Nomor telepon harus berupa angka.";
    }

    if (!formData.subjek.trim()) {
      newError.subjek = "Subjek harus diisi.";
    }

    if (!formData.pesan.trim()) {
      newError.pesan = "Pesan harus diisi.";
    } else if (formData.pesan.trim().length < 10) {
      newError.pesan = "Pesan harus memiliki minimal 10 karakter.";
    }

    return newError;
  };

  const handleHubungiChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, name, value } = e.target;
    const fieldName = (name || id) as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (error[fieldName]) {
      setError((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      subjek: "",
      pesan: "",
    });

    setError({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formError = validateForm();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }

    setIsLoading(true);
    setError({});

    try {
      const API_URL = process.env.REACT_APP_API_URL || "";

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Pesan berhasil dikirim, terima kasih!");
        resetForm();
      } else {
        throw new Error("Terjadi kesalahan saat mengirim pesan.");
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat mengirim pesan:", err);

      // Use type assertion for axios error
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          alert(
            "Koneksi timeout. Silakan periksa koneksi internet anda dan coba lagi."
          );
        } else if (err.response) {
          const status = err.response.status;
          if (status >= 400 && status < 500) {
            alert("Data yang dikirim tidak valid, silakan coba lagi.");
          } else if (status >= 500) {
            alert("Terjadi kesalahan di server, silakan coba lagi.");
          }
        } else if (err.request) {
          alert(
            "Tidak dapat terhubung ke server. Silakan periksa koneksi internet anda."
          );
        } else {
          alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
        }
      } else {
        alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-25">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Mengenal lebih dekat perusahaan kami dan perjalanan kami
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-green-800 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-hidden whitespace-nowrap">
            <button
              onClick={() => setActiveTab("sejarah")}
              className={`py-3 text-sm md:text-md px-3 md:px-6 transition-colors duration-200 ${
                activeTab === "sejarah"
                  ? "text-green-800 bg-white"
                  : "text-white hover:bg-green-700"
              }`}
            >
              Sejarah
            </button>
            <button
              onClick={() => setActiveTab("visi-misi")}
              className={`py-3 px-3 md:px-6 text-sm md:text-md transition-colors duration-200 ${
                activeTab === "visi-misi"
                  ? "text-green-800 bg-white"
                  : "text-white hover:bg-green-700"
              }`}
            >
              Visi & Misi
            </button>
            <button
              onClick={() => setActiveTab("lokasi")}
              className={`py-3 px-3 md:px-6 text-sm md:text-md  transition-colors duration-200 ${
                activeTab === "lokasi"
                  ? "text-green-800 bg-white"
                  : "text-white hover:bg-green-700"
              }`}
            >
              Lokasi & Kontak
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Sejarah */}
        {activeTab === "sejarah" && (
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-green-900 mb-8">
              Sejarah Perusahaan
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Awal Mula
                </h3>
                <p className="text-gray-700 mb-4">
                  Klinik Utama & Laboratorium CMI didirikan pada tanggal 8
                  Agustus 2008 dengan nama awal Poliklinik dan Laboratorium GR
                  Setra. Kepanjangan GR Setra adalah Glantrang Setra, diambil
                  dari Bahasa Sansekerta yang berarti Pemberani Suci. Berdirinya
                  klinik dan laboratorium ini berawal dari niat tulus PT Canon
                  Medicinae Indonesia untuk memberikan pelayanan kesehatan yang
                  lengkap bagi masyarakat untuk menangani penyakit umum dan 4
                  (empat) penyakit kronis yaitu kanker, diabetes melitus,
                  penyakit jantung koroner(PJK) dan gagal ginjal. Penanganan 4
                  (empat) penyakit kronis ini dilakukan dengan menggabungkan
                  metode pengobatan konvensional modern (medis barat) dan
                  pengobatan komplementer klasik timur secara terintegrasi
                  berdasarkan pada buku The Canon of Medicine (Al-Qanun fi
                  At-Thibb) Karya dr. Ibnu Sina (Avicenna), Bapak Kedokteran
                  Modern Dunia.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/api/placeholder/600/400"
                  alt="Foto Perusahaan Lama"
                  className="w-full h-full object-cover"
                />
                <div className="p-4 bg-green-900 text-white">
                  <p className="text-sm">GR SETRA CMI Tahun 2008</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={GedungCMI}
                  alt="Foto Perusahaan Sekarang"
                  className="w-full h-full object-cover"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                />
                <div className="p-4 bg-green-900 text-white">
                  <p className="text-sm">Klinik Utama CMI Tahun 2025</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Perkembangan & Pencapaian
                </h3>
                <p className="text-gray-700 mb-4">
                  Pada awal berdiri, Poliklinik dan Laboratorium GR Setra
                  memiliki izin klinik sebagai klinik pratama dan hanya memiliki
                  6 (enam) ruang perawatan, namun karena tingginya antusias
                  warga akan metode pengobatan komplementer untuk penyakit
                  kronis tersebut, pada tahun 2011 Poli klinik dan Laboratorium
                  GR Setra memutuskan untuk melakukan renovasi gedungdan
                  meningkatkan fasilitasnya sehingga memiliki 84 ruang perawatan
                  yang didukung dengan teknologi yang mutakhir, sehingga di
                  tahun 2019 GR Setra dapat mengubah izin kliniknya menjadi
                  klinik utama dan kini dikenal sebagai Klinik Utama dan
                  Laboratorium CMI
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border border-green-100 mb-8">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Tonggak Sejarah
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <div className="font-bold text-green-900 text-lg mb-1">
                    2008
                  </div>
                  <p className="text-gray-700">
                    Berdirinya Poliklinik GR SETRA
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="font-bold text-green-900 text-lg mb-1">
                    2011
                  </div>
                  <p className="text-gray-700">
                    Renovasi gedung dan peningkatan kualitas fasilitas
                  </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <div className="font-bold text-green-900 text-lg mb-1">
                    2019
                  </div>
                  <p className="text-gray-700">
                    Klinik Utama dan Laboratorium CMI
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visi & Misi */}
        {activeTab === "visi-misi" && (
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-green-900 mb-8">
              Visi & Misi Perusahaan
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-green-900 text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Visi Kami</h3>
                <div className="h-1 w-24 bg-white mb-6"></div>
                <p className="text-lg mb-4">
                  "Menjadi Rumah Sakit Komplementer Terbaik di Dunia Didukung
                  oleh Ilmu dan Teknologi yang Mutakhir."
                </p>
                <p className="text-green-100">
                  Kami berkomitmen untuk terus berada di garis depan inovasi
                  layanan kesehatan, dengan menggabungkan kearifan pengobatan
                  Timur klasik ala Ibnu Sina dan ilmu kedokteran modern, guna
                  memberikan solusi holistik dan berkelanjutan bagi penanganan
                  penyakit kronis.
                </p>
              </div>

              <div className="bg-gray-100 p-8 rounded-lg shadow border border-gray-200">
                <h3 className="text-2xl font-semibold text-green-900 mb-4">
                  Misi Kami
                </h3>
                <div className="h-1 w-24 bg-green-900 mb-6"></div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700">
                      Meningkatkan kesehatan pasien dengan menggabungkan ilmu
                      kedokteran barat dan ilmu kedokteran klasik timur secara
                      terintegrasi.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700">
                      Menjalin kerjasama dengan berbagai pihak dalam memperluas
                      jangkauan pelayanan.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700">
                      Meningkatkan kualitas SDM dengan pendidikan, pelatihan dan
                      penelitian yang berkesinambungan.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700">
                      Meningkatkan pengetahuan masyarakat dengan pemberian
                      edukasi kesehatan.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-green-800 mb-8 text-center">
                Nilai-Nilai Perusahaan
              </h3>

              {/* Desktop and Tablet Grid View */}
              <div className="hidden md:block">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nilaiPerusahaan.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                    >
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={item.img}
                          alt={item.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          width={400}
                          height={192}
                          quality={85}
                          placeholder="blur"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-green-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel for mobile/tablet */}
              <div className="md:hidden">
                <div className="relative">
                  <div className="overflow-hidden rounded-lg">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {nilaiPerusahaan.map((item, index) => (
                        <div
                          key={index}
                          className="min-w-full flex-shrink-0 flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
                        >
                          <Image
                            src={item.img}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                            width={400}
                            height={192}
                            quality={85}
                            placeholder="blur"
                          />
                          <h4 className="text-xl font-bold text-green-900 mb-3 mt-4">
                            {item.title}
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-green-800" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
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
                          ? "bg-green-600 scale-110"
                          : "bg-green-300 hover:bg-green-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats or Additional Info */}
              <div className="mt-8 pt-6 border-t border-green-200">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-green-800">
                      8
                    </div>
                    <div className="text-sm text-green-600">Nilai Utama</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-green-800">
                      100%
                    </div>
                    <div className="text-sm text-green-600">Komitmen</div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="text-2xl md:text-3xl font-bold text-green-800">
                      1
                    </div>
                    <div className="text-sm text-green-600">Visi Bersama</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lokasi & Kontak */}
        {activeTab === "lokasi" && (
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-green-900 mb-8">
              Lokasi & Kontak
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="bg-green-900 text-white p-6 rounded-t-lg">
                  <h3 className="text-xl font-semibold">Kantor Pusat</h3>
                </div>
                <div className="bg-white p-6 rounded-b-lg shadow-lg border border-gray-200">
                  <div className="flex items-start mb-4">
                    <MapPin className="text-green-800 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">
                      Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota
                      Bandung
                      <br />
                      Jawa Barat, 40134
                      <br />
                      Indonesia
                    </p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Phone className="text-green-800 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">(021) 7890-1234</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <Phone className="text-green-800 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">+62 821-2159-0000</p>
                  </div>

                  <div className="flex items-center mb-4">
                    <Mail className="text-green-800 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">info@cmihospital.com</p>
                  </div>

                  <div className="flex items-center">
                    <Clock className="text-green-800 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">
                        Senin - Sabtu: 08.00 - 17.00
                      </p>
                      <p className="font-medium text-green-800">IGD: 24 Jam</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-64 md:h-auto">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-gray-700 font-medium mb-2">
                      Peta Lokasi Perusahaan
                    </p>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0651863383387!2d107.61663887573904!3d-6.8827948673500305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bfa8371dbd07%3A0x96602a59adfec6bc!2sKlinik%20Utama%20CMI%20-%20Klinik%20Kanker%2C%20Jantung%2C%20Gagal%20Ginjal%20dan%20Diabetes!5e0!3m2!1sid!2sid!4v1747881562509!5m2!1sid!2sid"
                      width="725"
                      height="600"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <p className="text-gray-600 text-sm">
                      Maps Klinik Utama CMI Bandung
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-green-800 mb-6">
                Hubungi Kami
              </h3>
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg border border-gray-200">
                <form
                  onSubmit={handleSubmit}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="nama"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      value={formData.nama}
                      onChange={handleHubungiChange}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nama Lengkap"
                    />
                    {error.nama && (
                      <p className="text-red-500 text-sm mt-1">{error.nama}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleHubungiChange}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="email@example.com"
                    />
                    {error.email && (
                      <p className="text-red-500 text-sm mt-1">{error.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="telepon"
                    >
                      Telepon
                    </label>
                    <input
                      type="tel"
                      name="telepon"
                      id="telepon"
                      value={formData.telepon}
                      onChange={handleHubungiChange}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                    {error.telepon && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.telepon}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="subjek"
                    >
                      Subjek
                    </label>
                    <input
                      type="text"
                      name="subjek"
                      id="subjek"
                      value={formData.subjek}
                      onChange={handleHubungiChange}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Subjek pesan"
                    />
                    {error.subjek && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.subjek}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="pesan"
                    >
                      Pesan
                    </label>
                    <textarea
                      name="pesan"
                      id="pesan"
                      rows={5}
                      value={formData.pesan}
                      onChange={handleHubungiChange}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                    {error.pesan && (
                      <p className="text-red-500 text-sm mt-1">{error.pesan}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-green-900 text-white rounded hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Loading..." : "Kirim Pesan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
