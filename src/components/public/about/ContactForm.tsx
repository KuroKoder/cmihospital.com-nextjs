import React, { useState } from "react";
import axios from "axios";

type FormData = {
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
};

type FormError = Partial<Record<keyof FormData, string>>;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormError>({});
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, name, value } = e.target;
    const fieldName = (name || id) as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (error[fieldName]) {
      setError((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }

    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage("");
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
    setSuccessMessage("");
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
        setSuccessMessage(
          "Pesan berhasil dikirim! Terima kasih telah menghubungi kami."
        );
        resetForm();
      } else {
        throw new Error("Terjadi kesalahan saat mengirim pesan.");
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat mengirim pesan:", err);

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setError({
            pesan:
              "Koneksi timeout. Silakan periksa koneksi internet anda dan coba lagi.",
          });
        } else if (err.response) {
          const status = err.response.status;
          if (status >= 400 && status < 500) {
            setError({
              pesan: "Data yang dikirim tidak valid, silakan coba lagi.",
            });
          } else if (status >= 500) {
            setError({
              pesan: "Terjadi kesalahan di server, silakan coba lagi.",
            });
          }
        } else if (err.request) {
          setError({
            pesan:
              "Tidak dapat terhubung ke server. Silakan periksa koneksi internet anda.",
          });
        } else {
          setError({
            pesan: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
          });
        }
      } else {
        setError({
          pesan: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200">
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Nama */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 font-medium text-sm"
              htmlFor="nama"
            >
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                error.nama
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="Masukkan nama lengkap Anda"
            />
            {error.nama && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span>
                {error.nama}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 font-medium text-sm"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                error.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="contoh@email.com"
            />
            {error.email && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span>
                {error.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Telepon */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 font-medium text-sm"
              htmlFor="telepon"
            >
              Nomor Telepon *
            </label>
            <input
              type="tel"
              name="telepon"
              id="telepon"
              value={formData.telepon}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                error.telepon
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="08123456789"
            />
            {error.telepon && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span>
                {error.telepon}
              </p>
            )}
          </div>

          {/* Subjek */}
          <div className="space-y-2">
            <label
              className="block text-gray-700 font-medium text-sm"
              htmlFor="subjek"
            >
              Subjek *
            </label>
            <input
              type="text"
              name="subjek"
              id="subjek"
              value={formData.subjek}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                error.subjek
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
              placeholder="Subjek pesan Anda"
            />
            {error.subjek && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span>
                {error.subjek}
              </p>
            )}
          </div>
        </div>

        {/* Pesan */}
        <div className="space-y-2">
          <label
            className="block text-gray-700 font-medium text-sm"
            htmlFor="pesan"
          >
            Pesan *
          </label>
          <textarea
            name="pesan"
            id="pesan"
            rows={5}
            value={formData.pesan}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical transition-colors ${
              error.pesan
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
            placeholder="Tulis pesan Anda di sini... (minimal 10 karakter)"
          />
          <div className="flex justify-between items-center">
            {error.pesan ? (
              <p className="text-red-500 text-sm flex items-center">
                <span className="mr-1">⚠</span>
                {error.pesan}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                {formData.pesan.length}/500 karakter
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengirim...
              </span>
            ) : (
              "Kirim Pesan"
            )}
          </button>
        </div>

        <p className="text-gray-500 text-xs">
          * Wajib diisi. Kami akan merespons pesan Anda dalam 1-2 hari kerja.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
