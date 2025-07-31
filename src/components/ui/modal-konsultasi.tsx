"use client";

import { User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Interface untuk data form
export interface FormDataJadwal {
  namaPasien: string;
  alamat: string;
  umur: string;
  noTelepon: string;
  jenisKelamin: string;
  jenisKeluhan: string;
  detailKeluhan: string;
  lamaKeluhan: string;
  tanggalKonsultasi: string;
  waktuKonsultasi: string;
}

// Interface untuk option select
export interface SelectOption {
  value: string;
  label: string;
}

// Props interface untuk modal
export interface ModalsKonsultasiProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FormDataJadwal) => Promise<void>;
  initialData?: Partial<FormDataJadwal>;
  title?: string;
  submitButtonText?: string;
  jenisKeluhanOptions?: SelectOption[];
  isLoading?: boolean;
  validationRules?: {
    minAge?: number;
    maxAge?: number;
    requiredFields?: (keyof FormDataJadwal)[];
  };
}

const defaultJenisKeluhanOptions: SelectOption[] = [
  { value: "kanker", label: "Kanker" },
  { value: "diabetes", label: "Diabetes" },
  { value: "ginjal", label: "Ginjal" },
  { value: "jantung", label: "Jantung" },
  { value: "umum", label: "Umum" },
];

const defaultFormData: FormDataJadwal = {
  namaPasien: "",
  alamat: "",
  umur: "",
  noTelepon: "",
  jenisKelamin: "",
  jenisKeluhan: "",
  detailKeluhan: "",
  lamaKeluhan: "",
  tanggalKonsultasi: "",
  waktuKonsultasi: "",
};

const ModalsKonsultasi: React.FC<ModalsKonsultasiProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  title = "Buat Jadwal Konsultasi",
  submitButtonText = "Buat Jadwal Konsultasi",
  jenisKeluhanOptions = defaultJenisKeluhanOptions,
  isLoading = false,
  validationRules = {
    minAge: 1,
    maxAge: 100,
    requiredFields: [
      "namaPasien",
      "alamat",
      "umur",
      "noTelepon",
      "jenisKelamin",
      "jenisKeluhan",
      "detailKeluhan",
      "lamaKeluhan",
      "tanggalKonsultasi",
      "waktuKonsultasi",
    ],
  },
}) => {
  const [formDataJadwal, setFormDataJadwal] = useState<FormDataJadwal>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataJadwal, string>>
  >({});

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormDataJadwal({
        ...defaultFormData,
        ...initialData,
      });
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      const fieldName = name as keyof FormDataJadwal;

      setFormDataJadwal((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Clear error when user starts typing
      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: undefined,
        }));
      }
    },
    [errors]
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormDataJadwal, string>> = {};

    // Check required fields
    validationRules.requiredFields?.forEach((field) => {
      if (!formDataJadwal[field]?.trim()) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} wajib diisi`;
      }
    });

    // Validate age
    const age = parseInt(formDataJadwal.umur);
    if (
      formDataJadwal.umur &&
      (isNaN(age) ||
        age < (validationRules.minAge || 1) ||
        age > (validationRules.maxAge || 100))
    ) {
      newErrors.umur = `Umur harus antara ${validationRules.minAge || 1} - ${
        validationRules.maxAge || 100
      } tahun`;
    }

    // Validate phone number (basic validation)
    if (
      formDataJadwal.noTelepon &&
      !/^[0-9+\-\s()]{8,15}$/.test(formDataJadwal.noTelepon)
    ) {
      newErrors.noTelepon = "Nomor telepon tidak valid";
    }

    // Validate date (should be future date)
    if (formDataJadwal.tanggalKonsultasi) {
      const selectedDate = new Date(formDataJadwal.tanggalKonsultasi);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.tanggalKonsultasi =
          "Tanggal konsultasi tidak boleh di masa lalu";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitJadwal = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formDataJadwal);
      }

      alert("Jadwal berhasil dibuat!");
      setFormDataJadwal(defaultFormData);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Gagal mengirim data: ", error);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const renderField = (
    name: keyof FormDataJadwal,
    label: string,
    type: "text" | "textarea" | "select" | "number" | "tel" | "date" | "time",
    options?: SelectOption[],
    placeholder?: string,
    rows?: number
  ) => {
    const isRequired = validationRules.requiredFields?.includes(name);
    const error = errors[name];

    const baseClasses = `w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
      error ? "border-red-500" : "border-gray-300"
    }`;

    return (
      <div className={type === "textarea" ? "md:col-span-2" : ""}>
        <label className="flex text-sm font-medium text-gray-700 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>

        {type === "textarea" ? (
          <textarea
            name={name}
            id={name}
            value={formDataJadwal[name]}
            onChange={handleInputChange}
            rows={rows || 3}
            className={baseClasses}
            placeholder={placeholder}
            disabled={isLoading}
          />
        ) : type === "select" ? (
          <select
            name={name}
            id={name}
            value={formDataJadwal[name]}
            onChange={handleInputChange}
            className={baseClasses}
            disabled={isLoading}
          >
            <option value="" className="text-black">
              {placeholder || `Pilih ${label}`}
            </option>
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={formDataJadwal[name]}
            onChange={handleInputChange}
            className={baseClasses}
            placeholder={placeholder}
            min={
              type === "number" ? validationRules.minAge?.toString() : undefined
            }
            max={
              type === "number" ? validationRules.maxAge?.toString() : undefined
            }
            disabled={isLoading}
          />
        )}

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 bg-black/30 flex items-start justify-center p-2 sm:p-10 z-50 overflow-y-scroll">
      <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full p-2 my-10 sm:p-4 overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-15 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-green-200 hover:bg-gray-200 transition-colors group"
          type="button"
          disabled={isLoading}
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        <form onSubmit={handleSubmitJadwal}>
          {/* Modal Body */}
          <div className="space-y-2 sm:flex gap-2 p-0">
            {/* Data Pasien Section */}
            <div className="bg-gray-100 p-4 rounded-lg w-full sm:w-1/2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-6 h-6" />
                Data Pasien
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField(
                  "namaPasien",
                  "Nama Pasien",
                  "text",
                  undefined,
                  "Masukkan Nama Lengkap"
                )}
                {renderField(
                  "alamat",
                  "Alamat",
                  "textarea",
                  undefined,
                  "Masukkan Alamat Lengkap"
                )}
                {renderField(
                  "noTelepon",
                  "No Telepon",
                  "tel",
                  undefined,
                  "Masukkan No Telepon"
                )}
                {renderField(
                  "umur",
                  "Umur",
                  "number",
                  undefined,
                  "Masukkan Umur Anda"
                )}
                {renderField("jenisKelamin", "Jenis Kelamin", "select", [
                  { value: "laki-laki", label: "Laki-laki" },
                  { value: "perempuan", label: "Perempuan" },
                ])}
              </div>
            </div>

            {/* Keluhan Section */}
            <div className="bg-green-100 p-4 rounded-lg w-full sm:w-1/2">
              <h3 className="flex text-lg font-semibold text-gray-800 mb-4">
                Informasi Keluhan
              </h3>

              <div className="space-y-4">
                {renderField(
                  "jenisKeluhan",
                  "Jenis Keluhan",
                  "select",
                  jenisKeluhanOptions
                )}
                {renderField(
                  "detailKeluhan",
                  "Detail Keluhan",
                  "textarea",
                  undefined,
                  "Masukkan Detail Keluhan Anda...",
                  4
                )}
                {renderField(
                  "lamaKeluhan",
                  "Lama Keluhan",
                  "text",
                  undefined,
                  "Contoh: 2 minggu, 1 bulan, 3 hari"
                )}
                {renderField("tanggalKonsultasi", "Tanggal Konsultasi", "date")}
                {renderField("waktuKonsultasi", "Waktu Konsultasi", "time")}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 p-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="sm:w-sm px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 hover:cursor-pointer transition-colors font-medium"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="sm:w-sm px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:cursor-pointer text-white font-semibold rounded-lg transition-all transform hover:scale-105 text-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalsKonsultasi;
