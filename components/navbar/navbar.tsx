/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

// Define the UserData interface
interface UserData {
  name: string;
  email?: string;
  role?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For any additional properties
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check authentication status
  useEffect(() => {
    if (!isClient) return;

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userDataStr = localStorage.getItem("userData");

      if (token && userDataStr) {
        try {
          const parsedUserData: UserData = JSON.parse(userDataStr);
          setIsAuthenticated(true);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsAuthenticated(false);
          setUserData(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    // Check auth on mount
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "userData") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isClient]);

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
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target?.closest(".mobile-menu-container")) {
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
      const target = event.target as HTMLElement;
      if (
        isProfileDropdownOpen &&
        !target?.closest(".profile-dropdown-container")
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

  // Logout function
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");

    // Clear cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Update state
    setIsAuthenticated(false);
    setUserData(null);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);

    // Redirect to login
    router.push("/home");
  };

  // Get user initials for avatar
  const getUserInitials = (): string => {
    if (!userData?.name) return "U"; // Default to 'U' for User

    const nameParts = userData.name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    }
    return userData.name.charAt(0).toUpperCase();
  };

  // Menu items configuration (only show authenticated routes when logged in)
  const menuItems = isAuthenticated
    ? [
        { href: "/home", label: "Home" },
        { href: "/daftar-ormas", label: "Daftar Ormas" },
        { href: "/list-ormas", label: "List Ormas" },
        {
          href: "https://drive.google.com/file/d/1i7dQanDsmAlsgSicTktbBmGQHk3Krveq/view?usp=drive_link",
          label: "Panduan",
        },
        { href: "/faq", label: "FAQ" },
      ]
    : [
        { href: "/home", label: "Home" },
        { href: "/list-ormas", label: "List Ormas" },
        {
          href: "https://drive.google.com/file/d/1i7dQanDsmAlsgSicTktbBmGQHk3Krveq/view?usp=drive_link",
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
            href={isAuthenticated ? "/home" : "/"}
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
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : ""}
              >
                {item.label}
              </Link>
            ))}

            {/* Conditional rendering: Login button or Avatar Profile */}
            {isAuthenticated ? (
              /* Avatar Profile with Dropdown */
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
                    {getUserInitials()}
                  </div>
                  <IoIosArrowDown
                    className={`text-white transition-all duration-300 ${
                      isScrolled ? "w-4 h-4" : "w-5 h-5"
                    } ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                  />
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
                  {/* User Info Section */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {userData?.name || "User"}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-500">
                            Status: Aktif
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <FaRegUser className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                      <span className="font-medium">Profile Saya</span>
                    </Link>

                    <button
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                      onClick={handleLogout}
                    >
                      <MdLogout className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                      <span className="font-medium">Keluar Akun</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/auth/login"
                className={`bg-white text-green-600 hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isScrolled ? "px-4 py-2 text-sm" : "px-6 py-2.5 text-base"
                }`}
              >
                Masuk
              </Link>
            )}
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

        {/* Mobile Menu - Enhanced with better max-height and spacing */}
        {isClient && (
          <div
            className={`lg:hidden mobile-menu-container overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-green-600 rounded-b-2xl shadow-lg mt-3 pb-4 px-3 sm:px-4 space-y-2">
              {/* Menu Items */}
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
                    className={`block text-white hover:text-gray-200 hover:bg-green-700 transition-all duration-300 font-bold py-2.5 px-3 rounded-lg ${
                      isScrolled ? "text-sm" : "text-base"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      item.href.startsWith("http") ? "noopener noreferrer" : ""
                    }
                  >
                    {item.label}
                  </Link>
                </div>
              ))}

              {/* Mobile Authentication Section */}
              <div
                className={`transform transition-all duration-300 ease-in-out pt-2 ${
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
                {isAuthenticated ? (
                  /* Mobile Avatar Profile */
                  <div className="bg-white rounded-xl p-3 mx-1">
                    {/* Avatar Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-green-600 text-white rounded-full flex items-center justify-center font-bold w-10 h-10 text-base flex-shrink-0">
                        {getUserInitials()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {userData?.name || "User"}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                          <span className="text-xs text-gray-500 truncate">
                            Status: Aktif
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Links */}
                    <div className="space-y-1 pt-2 border-t border-gray-100">
                      <Link
                        href="/profile"
                        className="flex items-center p-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200 w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaRegUser className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="font-medium text-sm">
                          Profile Saya
                        </span>
                      </Link>

                      <button
                        className="w-full flex items-center p-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                        onClick={handleLogout}
                      >
                        <MdLogout className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="font-medium text-sm">Keluar Akun</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mobile Login Button */
                  <div className="mx-1">
                    <Link
                      href="/auth/login"
                      className="block bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                  </div>
                )}
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
