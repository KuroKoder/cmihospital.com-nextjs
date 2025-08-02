// components/NewsletterSection.tsx
import React, { useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription logic here
      console.log("Newsletter subscription:", email);
      setIsSubmitted(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-indigo-50 rounded-xl shadow-md p-6 md:p-8">
      <div className="md:flex items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-12">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <BookmarkIcon className="h-5 w-5 mr-2 text-green-600" />
            Dapatkan Artikel Terbaru
          </h3>
          <p className="text-gray-600">
            Langganan newsletter kami untuk mendapatkan informasi kesehatan
            terbaru dari tim dokter Klinik Utama CMI langsung ke email Anda.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-96">
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Terima kasih! Anda berhasil berlangganan newsletter kami.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Alamat email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-r-md font-medium hover:bg-green-700 transition"
              >
                Langganan
              </button>
            </form>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Kami menghormati privasi Anda. Anda dapat berhenti berlangganan
            kapan saja.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
