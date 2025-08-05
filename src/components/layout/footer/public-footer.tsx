// File: components/footer/Footer.tsx
"use client";
import { useState } from "react";
import FooterMain from "./FooterMain";
import FooterBottom from "./FooterBottom";
import FloatingAppointmentButton from "./FloatingAppointmentButton";
import ModalsKonsultasi from "@/components/ui/modal-konsultasi";
import { organizationSchema } from "./schema";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <footer className="bg-gradient-to-b from-green-600 to-green-900 text-white">
        <FooterMain />
        <FooterBottom />
        <FloatingAppointmentButton onClick={() => setIsModalOpen(true)} />
        {isModalOpen && (
          <ModalsKonsultasi isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </footer>
    </>
  );
};

export default Footer;
