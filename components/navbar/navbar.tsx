/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <Link
              href="/auth/login"
              className={`text-green-600 hover:text-green-700 bg-white hover:bg-gray-100 rounded-xl transition-all duration-300 ${
                isScrolled ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base"
              }`}
            >
              Masuk
            </Link>
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
                <Link
                  href="/auth/login"
                  className={`block text-green-600 hover:text-green-700 bg-white hover:bg-gray-100 rounded-xl transition-all duration-300 font-bold text-center transform hover:scale-105 ${
                    isScrolled ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
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
