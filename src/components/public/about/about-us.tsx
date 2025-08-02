"use client";
import React, { useState } from "react";
import HeroSection from "./AboutHero";
import NavigationTabs from "./NavigationTabs";
import SejarahSection from "./HistoryTabs";
import VisiMisiSection from "./VisiMisiSection";
import LokasiKontakSection from "./LokasiKontakSection";

export default function AboutUs() {
  type TabType = "sejarah" | "visi-misi" | "lokasi";
  const [activeTab, setActiveTab] = useState<TabType>("sejarah");

  return (
    <div className="bg-white min-h-screen mt-34">
      <HeroSection />

      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Section with improved spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {activeTab === "sejarah" && <SejarahSection />}
        {activeTab === "visi-misi" && <VisiMisiSection />}
        {activeTab === "lokasi" && <LokasiKontakSection />}
      </div>
    </div>
  );
}
