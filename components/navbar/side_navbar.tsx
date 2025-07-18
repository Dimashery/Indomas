
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// Impor ikon baru untuk tombol hamburger dan close
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  // State baru untuk mengontrol visibilitas menu di mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek untuk menutup menu saat berpindah halaman (opsional tapi bagus untuk UX)
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };
    // Di Next.js, Anda bisa mendengarkan event router
    // Ini adalah contoh sederhana, mungkin perlu disesuaikan dengan versi Next.js Anda
    window.addEventListener('hashchange', handleRouteChange, false);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange, false);
    };
  }, []);


  return (
    <>
      {/* Tombol Hamburger untuk Mobile */}
      <button
        className="lg:hidden fixed top-5 left-5 z-40 text-white bg-green-700 p-2 rounded-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay untuk menutup menu saat diklik di luar area navbar (hanya di mobile) */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-xs z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Side Navbar */}
      <nav
        className={`w-[320px] h-screen fixed z-40 bg-gradient-to-br from-green-900 via-slate-800 to-slate-800 p-10 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Bagian Atas */}
        <div>
          {/* Tombol Close untuk Mobile */}
          <button
            className="lg:hidden absolute top-5 right-5 z-50 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <AiOutlineClose size={24} />
          </button>

          {/* Logo dan Judul */}
          <div className="flex items-center space-x-2 mb-6">
            <Image
              src="/kotabatu.png"
              alt="Kota Batu Logo"
              width={60}
              height={80}
              className="h-20 mt-5 mb-2"
            />
            <div className="text-white font-bold ml-2">
              <span>Badan Kesatuan</span>
              <span className="block">Bangsa & Politik</span>
              <span className="block">Kota Batu</span>
            </div>
          </div>

          {/* Menu Navigasi */}
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-200 block py-2">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/data-organisasi" className="text-white hover:text-gray-200 block py-2">
                Data Organisasi
              </Link>
            </li>
            <li className="relative">
              <div
                className="text-white hover:text-gray-200 block py-2 cursor-pointer flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoMdArrowDropright
                  className={`mr-2 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                  size={20}
                />
                All CMS
              </div>
              <div
                className={`mt-2 w-full rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link href="/berita" className="text-white hover:text-gray-200 block py-2 px-4">
                  Berita
                </Link>
                <Link href="/bidang" className="text-white hover:text-gray-200 block py-2 px-4">
                  Bidang
                </Link>
                <Link href="/tentang-kami" className="text-white hover:text-gray-200 block py-2 px-4">
                  Tentang Kami
                </Link>
              </div>
            </li>
            <li>
              <Link href="/bidang-kajian" className="text-white hover:text-gray-200 block py-2">
                Bidang Kajian
              </Link>
            </li>
            <li>
              <Link href="/faq-admin" className="text-white hover:text-gray-200 block py-2">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Bagian Bawah - Admin */}
        <div className="relative">
          {/* Admin Menu Dropdown */}
          <div
            className={`absolute bottom-full left-0 w-full bg-slate-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
              isAdminMenuOpen ? "max-h-300 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"
            }`}
          >
            <Link href="/profile-admin" className="text-white hover:bg-slate-600 block py-3 px-4 transition-colors">
              Profile
            </Link>
            <Link href="/auth/login" className="text-white hover:bg-slate-600 block py-3 px-4 transition-colors">
              Keluar
            </Link>
          </div>

          {/* Admin Info */}
          <div className="flex justify-between items-center cursor-pointer hover:bg-slate-700 hover:bg-opacity-30 p-3 rounded-lg transition-colors duration-200s space-x-4">
            <div
              className="flex items-center mt-1"
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
            >
              <Image
                src="/KESBANG.png"
                alt="Admin Logo"
                width={40}
                height={40}
                className="h-10 mr-2"
              />
              <div className="text-white">
                <span className="text-base font-semibold">Admin</span>
                <span className="block text-sm">KESBANGPOL</span>
              </div>
            </div>

            <IoIosArrowForward className={`mr-2 transition-transform duration-300 ease-in-out ${
                    isAdminMenuOpen ? "-rotate-90" : "rotate-0"
                  }`}
                  size={20}
                  onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                  />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;
