// File: components/footer/NewsletterForm.tsx
'use client';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika pengiriman email di sini
    alert(`Email terdaftar: ${email}`);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Masukkan email Anda"
        className="w-full px-4 py-2 rounded bg-green-800 text-white placeholder:text-white-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button type="submit" className="p-2 rounded bg-green-500 hover:bg-green-400 transition-colors">
        <FaPaperPlane />
      </button>
    </form>
  );
};
export default NewsletterForm;