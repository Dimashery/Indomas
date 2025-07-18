"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Section1Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [alamatOrganisasi, setAlamatOrganisasi] = useState("");
  const [noHandphone, setNoHandphone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success" | "warning">(
    "error"
  );

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  // Password validation function
  const validatePassword = (password: string) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
    setPasswordValidation(validation);
    return validation.length && validation.uppercase && validation.number;
  };

  // Show alert function
  const showAlertMessage = (
    message: string,
    type: "error" | "success" | "warning" = "error"
  ) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000); // Auto hide after 5 seconds
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);

    // Clear password error when user types
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password strength
    if (!validatePassword(password)) {
      setPasswordError("Password harus memenuhi kriteria di atas");
      showAlertMessage("Password tidak memenuhi kriteria keamanan!", "error");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Password tidak cocok");
      showAlertMessage(
        "Password dan konfirmasi password tidak cocok!",
        "error"
      );
      return;
    }

    // Reset error
    setPasswordError("");

    // Set loading state
    setIsSubmitting(true);

    try {
      // Handle signup logic here
      console.log("Signup attempt:", {
        email,
        password,
        namaOrganisasi,
        alamatOrganisasi,
        noHandphone,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      showAlertMessage("Akun berhasil dibuat! Mengalihkan...", "success");

      // Redirect to success page after a brief delay
      setTimeout(() => {
        router.push("/auth/signup/berhasil-signup");
      }, 1500);
    } catch (error) {
      console.error("Signup failed:", error);
      setPasswordError(
        "Terjadi kesalahan saat membuat akun. Silakan coba lagi."
      );
      showAlertMessage(
        "Terjadi kesalahan saat membuat akun. Silakan coba lagi.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Custom Alert */}
      {showAlert && (
        <div
          className={`fixed top-4 right-4 z-50 max-w-sm w-full mx-auto transform transition-all duration-300 ease-out ${
            showAlert ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div
            className={`p-4 rounded-lg shadow-lg border-l-4 ${
              alertType === "success"
                ? "bg-green-50 border-green-400 text-green-700"
                : alertType === "warning"
                ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {alertType === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : alertType === "warning" ? (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{alertMessage}</p>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background with fade-in animation */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url('/bg_form.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1e3a8a", // Fallback color
        }}
      ></div>

      {/* Signup Form Container with slide-up animation */}
      <div className="relative z-30 w-full max-w-md mx-4">
        <div
          className={`bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20 transform transition-all duration-800 ease-out ${
            isLoaded
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Logo Section with staggered animation */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className={`w-16 h-16 relative transform transition-all duration-700 delay-300 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-4 -rotate-12"
              }`}
            >
              <Image
                src="/logos/KESBANG.png"
                alt="KESBANG Logo"
                fill
                className="object-contain"
                onError={() => console.log("KESBANG logo failed to load")}
              />
            </div>
            <div
              className={`w-16 h-16 relative transform transition-all duration-700 delay-400 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-4 rotate-12"
              }`}
            >
              <Image
                src="/logos/kotabatu.png"
                alt="Kota Batu Logo"
                fill
                className="object-contain"
                onError={() => console.log("Kota Batu logo failed to load")}
              />
            </div>
          </div>

          {/* Title with fade-in animation */}
          <h1
            className={`text-3xl font-bold text-gray-800 text-center mb-2 tracking-wide transform transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Buat Akun
          </h1>

          {/* Signup Form with staggered field animations */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div
              className={`transform transition-all duration-600 delay-600 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Organisasi
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                required
              />
            </div>

            {/* Password Field */}
            <div
              className={`transform transition-all duration-600 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Masukkan Password Anda"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 pr-12 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Kriteria Password:
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {passwordValidation.length ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordValidation.length
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Minimal 8 karakter
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.uppercase ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordValidation.uppercase
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Mengandung huruf besar
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordValidation.number ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordValidation.number
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Mengandung angka
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div
              className={`transform transition-all duration-600 delay-800 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi Password Anda"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 pr-12 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password Error Message with animation */}
              {passwordError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {passwordError}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Nama Organisasi Field */}
            <div
              className={`transform transition-all duration-600 delay-900 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="namaOrganisasi"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Organisasi
              </label>
              <input
                type="text"
                id="namaOrganisasi"
                value={namaOrganisasi}
                onChange={(e) => setNamaOrganisasi(e.target.value)}
                placeholder="Masukkan Nama Organisasi Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                required
              />
            </div>

            {/* Alamat Organisasi Field */}
            <div
              className={`transform transition-all duration-600 delay-1000 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="alamatOrganisasi"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Alamat Organisasi
              </label>
              <input
                type="text"
                id="alamatOrganisasi"
                value={alamatOrganisasi}
                onChange={(e) => setAlamatOrganisasi(e.target.value)}
                placeholder="Masukkan Alamat Organisasi Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                required
              />
            </div>

            {/* No Handphone Field */}
            <div
              className={`transform transition-all duration-600 delay-1100 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="noHandphone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                No Handphone
              </label>
              <input
                type="tel"
                id="noHandphone"
                value={noHandphone}
                onChange={(e) => setNoHandphone(e.target.value)}
                placeholder="Masukkan No Handphone Anda"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105"
                required
              />
            </div>

            {/* Signup Button */}
            <div
              className={`transform transition-all duration-600 delay-1200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg hover:shadow-xl active:scale-95 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Membuat Akun...
                  </div>
                ) : (
                  "Buat Akun"
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div
            className={`text-center mt-6 transform transition-all duration-600 delay-1300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-gray-600 text-sm">
              Sudah memiliki akun?{" "}
              <Link
                href="/auth/login"
                className="text-green-500 hover:text-green-600 font-semibold transition-all duration-200 hover:underline hover:scale-105 inline-block"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text with fade-in animation */}
        <div
          className={`text-center mt-6 text-white text-sm drop-shadow-lg transform transition-all duration-800 delay-1400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="hover:scale-105 transition-transform duration-200 inline-block">
            Website Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL)
          </p>
          <p className="hover:scale-105 transition-transform duration-200 inline-block">
            Untuk Keperluan Pendataan Organisasi Masyarakat
          </p>
        </div>
      </div>
    </div>
  );
}
