// import React, { useState } from "react";
// import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import ContactForm from "./ContactForm";

// const LokasiKontakSection: React.FC = () => {
//   return (
//     <div className="fade-in space-y-12 lg:space-y-16">
//       <div className="text-center mb-8 lg:mb-12">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4">
//           Lokasi & Kontak
//         </h2>
//         <div className="w-24 h-1 bg-green-600 mx-auto"></div>
//       </div>

//       {/* Kontak Info & Map */}
//       <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//         {/* Contact Information Card */}
//         <div className="space-y-6">
//           <div className="bg-gradient-to-r from-green-900 to-green-800 text-white p-6 rounded-t-xl">
//             <h3 className="text-xl sm:text-2xl font-semibold">Kantor Pusat</h3>
//           </div>
//           <div className="bg-white p-6 sm:p-8 rounded-b-xl shadow-xl border border-gray-200">
//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <MapPin className="text-green-800 mt-1 mr-4 flex-shrink-0 w-5 h-5" />
//                 <div>
//                   <p className="text-gray-700 leading-relaxed">
//                     Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung
//                   </p>
//                   <p className="text-gray-700">Jawa Barat, 40134</p>
//                   <p className="text-gray-700">Indonesia</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <Phone className="text-green-800 mr-4 flex-shrink-0 w-5 h-5" />
//                 <p className="text-gray-700 font-medium">(021) 7890-1234</p>
//               </div>

//               <div className="flex items-center">
//                 <Phone className="text-green-800 mr-4 flex-shrink-0 w-5 h-5" />
//                 <p className="text-gray-700 font-medium">+62 821-2159-0000</p>
//               </div>

//               <div className="flex items-center">
//                 <Mail className="text-green-800 mr-4 flex-shrink-0 w-5 h-5" />
//                 <p className="text-gray-700 font-medium">info@cmihospital.com</p>
//               </div>

//               <div className="flex items-start">
//                 <Clock className="text-green-800 mr-4 flex-shrink-0 w-5 h-5 mt-1" />
//                 <div>
//                   <p className="text-gray-700">Senin - Sabtu: 08.00 - 17.00</p>
//                   <p className="font-semibold text-green-800 mt-1">IGD: 24 Jam</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Map */}
//         <div className="bg-gray-100 rounded-xl overflow-hidden shadow-xl h-96 lg:h-auto">
//           <div className="w-full h-full">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0651863383387!2d107.61663887573904!3d-6.8827948673500305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bfa8371dbd07%3A0x96602a59adfec6bc!2sKlinik%20Utama%20CMI%20-%20Klinik%20Kanker%2C%20Jantung%2C%20Gagal%20Ginjal%20dan%20Diabetes!5e0!3m2!1sid!2sid!4v1747881562509!5m2!1sid!2sid"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               className="rounded-xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Contact Form */}
//       <div className="space-y-6">
//         <div className="text-center lg:text-left">
//           <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
//             Hubungi Kami
//           </h3>
//           <p className="text-gray-600">
//             Silakan isi form di bawah ini untuk menghubungi kami. Kami akan merespons pesan Anda secepatnya.
//           </p>
//         </div>

//         <ContactForm />
//       </div>

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ContactForm component
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek wajib diisi";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    if (
      formData.phone &&
      !/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone.replace(/[-\s]/g, ""))
    ) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      if (Math.random() > 0.2) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        throw new Error("Network error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                errors.name
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
              placeholder="nama@email.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                errors.phone
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
              placeholder="+62 821-xxxx-xxxx"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subjek <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                errors.subject
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-green-500"
              }`}
              placeholder="Subjek pesan"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200 resize-vertical ${
              errors.message
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-green-500"
            }`}
            placeholder="Tulis pesan Anda di sini... (minimal 10 karakter)"
          />
          {errors.message && (
            <p className="text-red-600 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </p>
          )}
          <p className="text-gray-500 text-xs">
            {formData.message.length}/500 karakter
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">Pesan berhasil dikirim!</p>
              <p className="text-sm">Kami akan merespons dalam 1x24 jam.</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium">Terjadi kesalahan!</p>
              <p className="text-sm">Silakan periksa kembali dan coba lagi.</p>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Mengirim...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Kirim Pesan
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Dengan mengirim pesan ini, Anda menyetujui kebijakan privasi kami.
          <br />
          <span className="text-green-600">Tip:</span> Gunakan Ctrl+Enter untuk
          mengirim pesan dengan cepat.
        </p>
      </div>
    </div>
  );
};

// Contact Info Card Component
const ContactInfoCard: React.FC = () => {
  const contactItems = [
    {
      icon: MapPin,
      content: (
        <div>
          <p className="text-gray-700 leading-relaxed">
            Jl. Tubagus Ismail VII, Sekeloa, Kecamatan Coblong, Kota Bandung
          </p>
          <p className="text-gray-700">Jawa Barat, 40134</p>
          <p className="text-gray-700">Indonesia</p>
        </div>
      ),
    },
    {
      icon: Phone,
      content: (
        <div className="space-y-2">
          <a
            href="tel:+622178901234"
            className="block text-gray-700 font-medium hover:text-green-800 transition-colors"
          >
            (021) 7890-1234
          </a>
          <a
            href="tel:+6282121590000"
            className="block text-gray-700 font-medium hover:text-green-800 transition-colors"
          >
            +62 821-2159-0000
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      content: (
        <a
          href="mailto:info@cmihospital.com"
          className="text-gray-700 font-medium hover:text-green-800 transition-colors"
        >
          info@cmihospital.com
        </a>
      ),
    },
    {
      icon: Clock,
      content: (
        <div>
          <p className="text-gray-700">Senin - Sabtu: 08.00 - 17.00</p>
          <p className="font-semibold text-green-800 mt-1">IGD: 24 Jam</p>
          <p className="text-sm text-gray-600 mt-2">
            Konsultasi online tersedia di luar jam operasional
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-0">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white p-6 rounded-t-xl">
        <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Kantor Pusat
        </h3>
      </div>
      <div className="bg-white p-6 sm:p-8 rounded-b-xl shadow-xl border border-gray-200">
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start group">
              <item.icon
                className="text-green-800 mt-1 mr-4 flex-shrink-0 w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
              />
              <div className="flex-1">{item.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Parkir Gratis
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Akses Wheelchair
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              WiFi Gratis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Map Component
const MapSection: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-xl h-96 lg:h-auto relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Memuat peta...</p>
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0651863383387!2d107.61663887573904!3d-6.8827948673500305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bfa8371dbd07%3A0x96602a59adfec6bc!2sKlinik%20Utama%20CMI%20-%20Klinik%20Kanker%2C%20Jantung%2C%20Gagal%20Ginjal%20dan%20Diabetes!5e0!3m2!1sid!2sid!4v1747881562509!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
          title="Lokasi Klinik Utama CMI"
          onLoad={() => setMapLoaded(true)}
        />
      </div>

      <div className="absolute bottom-4 right-4">
        <a
          href="https://goo.gl/maps/your-location-link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
        >
          <MapPin className="w-4 h-4" />
          Buka di Maps
        </a>
      </div>
    </div>
  );
};

// Main Component
const LokasiKontakSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"info" | "form">("info");

  return (
    <section
      className="fade-in space-y-12 lg:space-y-16"
      aria-labelledby="lokasi-kontak-heading"
    >
      {/* Header */}
      <header className="text-center mb-8 lg:mb-12">
        <h2
          id="lokasi-kontak-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-4"
        >
          Lokasi & Kontak
        </h2>
        <div
          className="w-24 h-1 bg-green-600 mx-auto mb-4"
          aria-hidden="true"
        ></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan kami dengan mudah dan hubungi tim profesional kami untuk
          konsultasi kesehatan terbaik.
        </p>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden">
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "info"
                ? "bg-white text-green-800 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Info & Lokasi
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "form"
                ? "bg-white text-green-800 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Hubungi Kami
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8 lg:space-y-12">
        {/* Info & Map Section */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${
            activeTab === "form" ? "hidden lg:grid" : ""
          }`}
        >
          <ContactInfoCard />
          <MapSection />
        </div>

        {/* Contact Form Section */}
        <div
          className={`space-y-6 ${
            activeTab === "info" ? "hidden lg:block" : ""
          }`}
        >
          <div className="text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2 flex items-center justify-center lg:justify-start gap-2">
              <Mail className="w-6 h-6" />
              Hubungi Kami
            </h3>
            <p className="text-gray-600">
              Silakan isi form di bawah ini untuk menghubungi kami. Kami akan
              merespons pesan Anda secepatnya.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default LokasiKontakSection;
