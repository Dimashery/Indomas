"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
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
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

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

  // Handle new password change
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password);

    // Clear error when user types
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password strength
    if (!validatePassword(newPassword)) {
      setPasswordError("Password harus memenuhi kriteria di atas");
      showAlertMessage("Password tidak memenuhi kriteria keamanan!", "error");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Password tidak cocok");
      showAlertMessage(
        "Password dan konfirmasi password tidak cocok!",
        "error"
      );
      return;
    }

    // Reset error
    setPasswordError("");
    setIsLoading(true);

    try {
      // Handle password reset logic here
      console.log("Password reset request:", { newPassword });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      showAlertMessage("Password berhasil direset! Mengalihkan...", "success");

      // Redirect to ResetSuccessForm after successful reset
      setTimeout(() => {
        router.push("/auth/password/ResetSuccessForm");
      }, 1500);
    } catch (error) {
      console.error("Password reset failed:", error);
      showAlertMessage(
        "Terjadi kesalahan saat mereset password. Silakan coba lagi.",
        "error"
      );
    } finally {
      setIsLoading(false);
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

      {/* Reset Password Form Container */}
      <div className="relative z-30 w-full max-w-md mx-4">
        <div
          className={`bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20 transform transition-all duration-800 ease-out ${
            isLoaded
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Logo Section with staggered animation */}
          <div className="flex items-center justify-center gap-4 mb-8">
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
            className={`text-3xl font-bold text-gray-800 text-center mb-4 tracking-wide transform transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Reset Password
          </h1>

          {/* Subtitle with fade-in animation */}
          <p
            className={`text-center text-gray-600 mb-8 text-sm leading-relaxed transform transition-all duration-700 delay-600 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Silahkan membuat password baru
            <br />
            yang aman dan mudah diingat
          </p>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div
              className={`transform transition-all duration-600 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Masukkan Password Baru Anda"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105 pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
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
                Verifikasi Password Baru
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan Ulang Password Baru Anda"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105 pr-12"
                  required
                  disabled={isLoading}
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

              {/* Password Error Message */}
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

            {/* Submit Button */}
            <div
              className={`transform transition-all duration-600 delay-900 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Text with fade-in animation */}
        <div
          className={`text-center mt-6 text-white text-sm drop-shadow-lg transform transition-all duration-800 delay-1000 ${
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
