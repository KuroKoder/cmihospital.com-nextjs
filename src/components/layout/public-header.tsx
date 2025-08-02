//header.jsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Logo from "../../../public/images/logo/logo.svg";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import type { MenuProps } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  UserGroupIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  XMarkIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import type {
  ArrowPathIcon as ArrowPathIconType,
  Bars3Icon as Bars3IconType,
  UserGroupIcon as UserGroupIconType,
  BookOpenIcon as BookOpenIconType,
  ClipboardDocumentListIcon as ClipboardDocumentListIconType,
  BuildingOffice2Icon as BuildingOffice2IconType,
  XMarkIcon as XMarkIconType,
  HeartIcon as HeartIconType,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconType,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import type {
  ChevronDownIcon as ChevronDownIconType,
  PhoneIcon as PhoneIconType,
  CalendarIcon as CalendarIconType,
  EnvelopeIcon as EnvelopeIconType,
  MapPinIcon as MapPinIconType,
  ClockIcon as ClockIconType,
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface LayananKesehatanItem {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const layananKesehatan: LayananKesehatanItem[] = [
  {
    name: "IGD dan Rawat Inap",
    description:
      "Layanan gawat darurat dan rawat inap tersedia setiap hari selama 24 jam.",
    href: "/layanan/igd-rawat-inap",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Poli Umum & Konsultasi Komplementer",
    description: "Tersedia setiap Senin sampai Sabtu pukul 08.00 – 17.00 WIB.",
    href: "/layanan/poli-komplementer",
    icon: HeartIcon,
  },
  {
    name: "Pemeriksaan dan Konsultasi Dokter",
    description:
      "Dilakukan oleh dokter umum, spesialis, dan konsultan komplementer.",
    href: "/layanan/konsultasi-dokter",
    icon: UserGroupIcon,
  },
  {
    name: "Instalasi Farmasi Klinik",
    description:
      "Menyediakan obat-obatan lengkap dengan kualitas yang terjamin.",
    href: "/layanan/farmasi",
    icon: BookOpenIcon,
  },
  {
    name: "Laboratorium Avicenna",
    description:
      "Fasilitas laboratorium canggih untuk pemeriksaan penunjang medis.",
    href: "/layanan/laboratorium",
    icon: ArrowPathIcon,
  },
  {
    name: "Follow Up Pasien",
    description:
      "Tim edukasi memantau dan mengevaluasi perkembangan pasien secara berkelanjutan.",
    href: "/layanan/follow-up",
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Fasilitas", href: "/fasilitas" },
  { name: "Dokter", href: "/dokter" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Artikel Kesehatan", href: "/artikel-kesehatan" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top info bar */}
      <div className="bg-green-700 text-white py-2">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>(021) 7890-1234</span>
              </div>
              <div className="hidden md:flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span>info@cmihospital.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>Senin-Sabtu: 08.00-20.00</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>Bandung, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`relative container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16 py-8 ${
          isScrolled ? "py-3" : "py-4"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Klinik Utama CMI"
                className="h-8 w-auto"
                width={100}
                height={40}
                priority
              />
              <span className="ml-3 text-lg font-bold text-emerald-900">
                Klinik Utama CMI
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-green-800 hover:text-green-600 hover:bg-green-50"
            >
              <Bars3Icon className="h-6 w-6" />
              <span className="sr-only">Buka menu utama</span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 lg:ml-12">
            <PopoverGroup className="flex gap-x-8">
              {/* Layanan Kesehatan dropdown */}
              <Popover className="relative">
                {({ open }: { open: boolean }) => (
                  <>
                    <PopoverButton
                      className={`group inline-flex items-center gap-x-1 text-sm font-medium text-gray-800 outline-none ${
                        open ? "text-green-700" : "hover:text-green-700"
                      }`}
                    >
                      Layanan Kesehatan
                      <ChevronDownIcon
                        className={`h-5 w-5 text-green-600 transition ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </PopoverButton>

                    <PopoverPanel className="absolute left-0 top-full z-10 w-80 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none">
                      <div className="p-1">
                        {layananKesehatan.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center gap-x-3 rounded-lg p-3 text-sm hover:bg-green-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.name}
                              </div>
                              <p className="text-xs text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-b-xl -mt-2.5">
                        <div className="flex gap-x-5">
                          <a
                            href="/jadwal"
                            className="flex items-center text-sm font-medium text-green-700 hover:text-green-800"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Jadwalkan Kunjungan
                          </a>
                          <a
                            href="/kontak"
                            className="flex items-center text-sm font-medium text-green-700 hover:text-green-800"
                          >
                            <PhoneIcon className="mr-2 h-4 w-4" />
                            Hubungi Kami
                          </a>
                        </div>
                      </div>
                    </PopoverPanel>
                  </>
                )}
              </Popover>

              {/* Standard navigation links */}
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-800 hover:text-green-700"
                >
                  {item.name}
                </a>
              ))}
            </PopoverGroup>

            {/* CTA Button */}
            <div>
              <a
                href="/daftar-online"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Daftar Online
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Divider */}
      <div className="border-b border-gray-200"></div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center">
                <Image
                  src={Logo}
                  alt="Klinik Utama CMI"
                  className="h-8 w-auto"
                  width={100}
                  height={40}
                  priority
                />
                <span className="ml-2 text-base font-bold text-green-900">
                  Klinik Utama CMI
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
                <span className="sr-only">Tutup menu</span>
              </button>
            </div>

            {/* Contact info */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-black">(022) 253 1000</span>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-black">info@cmihospital.com</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-black">Senin-Sabtu: 08.00-20.00</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-black">Bandung, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Mobile navigation links */}
            <div className="space-y-6">
              {/* Layanan Kesehatan */}
              <Menu>
                {({ open }: { open: boolean }) => (
                  <div>
                    <div className="border-b border-gray-200 pb-3">
                      <MenuButton className="flex w-full items-center justify-between text-base font-medium text-gray-900">
                        Layanan Kesehatan
                        <ChevronDownIcon
                          className={`h-5 w-5 text-gray-500 transition ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </MenuButton>
                      {open && (
                        <MenuItems className="mt-3 space-y-2">
                          {layananKesehatan.map((item) => (
                            <MenuItem key={item.name}>
                              <a
                                href={item.href}
                                className="flex items-center py-2 pl-4 text-base text-gray-700 hover:text-green-700"
                              >
                                <item.icon className="mr-3 h-5 w-5 text-green-600" />
                                {item.name}
                              </a>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      )}
                    </div>
                  </div>
                )}
              </Menu>

              {/* Other navigation links */}
              <div className="space-y-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center border-b border-gray-200 py-3 text-base font-medium text-gray-900 hover:text-green-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-4 space-y-3">
                <a
                  href="/jadwal"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-gray-50"
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Jadwalkan Kunjungan
                </a>
                <a
                  href="/kontak"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-gray-50"
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Hubungi Kami
                </a>
                <a
                  href="/daftar-online"
                  className="flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Daftar Online
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
