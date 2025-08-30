import React from "react";

type TabType = "sejarah" | "visi-misi" | "lokasi";

interface NavigationTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "sejarah", label: "Sejarah" },
    { id: "visi-misi", label: "Visi & Misi" },
    { id: "lokasi", label: "Lokasi & Kontak" },
  ];

  return (
    <div className="bg-green-800 sticky top-0 z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-3 sm:py-4 px-4 sm:px-6 lg:px-8 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? "text-green-800 bg-white border-green-600"
                  : "text-white hover:bg-green-700 border-transparent hover:border-green-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
