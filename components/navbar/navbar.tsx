/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as Element)?.closest(".mobile-menu-container")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, isClient]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileDropdownOpen &&
        !(event.target as Element)?.closest(".profile-dropdown-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileDropdownOpen, isClient]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isClient) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isClient]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Menu items configuration
  const menuItems = [
    { href: "/home", label: "Home" },
    { href: "/daftar-ormas", label: "Daftar Ormas" },
    { href: "/list-ormas", label: "List Ormas" },
    {
      href: "https://drive.google.com/file/d/1-n59kMlBbeI2m15hbRn3hX35Rpm1kXLa/view?usp=drive_link",
      label: "Panduan",
    },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      {/* Single Navbar with Scaling Effect */}
      <nav
        className={`
          bg-green-600 fixed left-1/2 transform -translate-x-1/2 z-50 rounded-2xl shadow-lg
          transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "top-3 p-3 w-[95%] max-w-4xl" // Smaller when scrolled
              : "top-6 p-4 w-[95%] max-w-6xl" // Larger when at top
          }
        `}
      >
        <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6">
          {/* Logo Section - Now clickable */}
          <Link
            href="/home"
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
            <img
              src="/logos/kotabatu.png"
              alt="Kota Batu Logo"
              className={`transition-all duration-500 ${
                isScrolled ? "h-6 sm:h-7 lg:h-8" : "h-7 sm:h-8 lg:h-10"
              }`}
            />
            <div className="text-white font-bold">
              <span
                className={`transition-all duration-500 ${
                  isScrolled
                    ? "text-xs sm:text-sm lg:text-base"
                    : "text-sm sm:text-base lg:text-lg"
                }`}
              >
                <span className="hidden sm:inline">BAKESBANGPOL</span>
                <span className="sm:hidden">BAKESBANGPOL</span>
              </span>
              <span
                className={`block transition-all duration-500 ${
                  isScrolled
                    ? "text-xs sm:text-sm lg:text-base"
                    : "text-sm sm:text-base lg:text-lg"
                }`}
              >
                Kota Batu
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div
            className={`hidden lg:flex items-center font-bold transition-all duration-500 ${
              isScrolled ? "space-x-4 text-sm" : "space-x-6 text-base"
            }`}
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Avatar Profile with Dropdown */}
            <div className="relative profile-dropdown-container">
              <button
                onClick={toggleProfileDropdown}
                className={`flex items-center space-x-2 hover:bg-green-700 rounded-xl transition-all duration-300 ${
                  isScrolled ? "p-1.5" : "p-2"
                }`}
              >
                <div
                  className={`bg-white rounded-full flex items-center justify-center font-bold text-green-600 transition-all duration-300 ${
                    isScrolled ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"
                  }`}
                >
                  JD
                </div>
                <svg
                  className={`text-white transition-all duration-300 ${
                    isScrolled ? "w-4 h-4" : "w-5 h-5"
                  } ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 ease-out ${
                  isProfileDropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
                style={{
                  transformOrigin: "top right",
                }}
              >
                {/* Status Section */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Status: Aktif
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium">Profile Saya</span>
                  </Link>

                  <button
                    className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      // Logout logic akan ditambahkan nanti
                    }}
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Keluar Akun</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {isClient && (
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden flex flex-col justify-center items-center bg-transparent border-none cursor-pointer mobile-menu-container transition-all duration-300 ${
                isScrolled ? "w-6 h-6" : "w-7 h-7"
              }`}
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block bg-white transition-all duration-300 ease-in-out ${
                  isScrolled ? "w-4 h-0.5" : "w-5 h-0.5"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
              ></span>
              <span
                className={`block bg-white transition-all duration-300 ease-in-out mt-1 ${
                  isScrolled ? "w-4 h-0.5" : "w-5 h-0.5"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block bg-white transition-all duration-300 ease-in-out mt-1 ${
                  isScrolled ? "w-4 h-0.5" : "w-5 h-0.5"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
              ></span>
            </button>
          )}
        </div>

        {/* Mobile Menu - Enhanced with smooth animations */}
        {isClient && (
          <div
            className={`lg:hidden mobile-menu-container overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-green-600 rounded-b-2xl shadow-lg mt-3 py-4 px-4 sm:px-6 space-y-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    className={`block text-white hover:text-gray-200 hover:bg-green-700 transition-all duration-300 font-bold py-2 px-3 rounded-lg ${
                      isScrolled ? "text-sm" : "text-base"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              {/* Mobile Avatar Profile */}
              <div
                className={`transform transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${menuItems.length * 50}ms`
                    : "0ms",
                }}
              >
                <div className="bg-white rounded-xl p-4 space-y-3">
                  {/* Avatar Header */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`bg-green-600 text-white rounded-full flex items-center justify-center font-bold ${
                        isScrolled ? "w-10 h-10 text-base" : "w-12 h-12 text-lg"
                      }`}
                    >
                      JD
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Status: Aktif
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <Link
                      href="/profile"
                      className="flex items-center p-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">Profile Saya</span>
                    </Link>

                    <button
                      className="w-full flex items-center p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        // Logout logic akan ditambahkan nanti
                      }}
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Keluar Akun</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop for mobile menu - Enhanced with smooth fade */}
      {isClient && (
        <div
          className={`fixed inset-0 backdrop-blur-xs z-40 lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            maxHeight: "100vh",
            overflow: "hidden",
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
