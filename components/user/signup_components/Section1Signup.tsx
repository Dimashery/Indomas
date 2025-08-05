"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {
  signupUser,
  mapFormDataToApiData,
  getErrorMessage,
  saveAuthData,
  ApiError,
} from "../signup_components/fetch";

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

  // Field-specific error states
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    namaOrganisasi: "",
    alamatOrganisasi: "",
    noHandphone: "",
  });

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  // Clear field error when user types
  const clearFieldError = (fieldName: keyof typeof fieldErrors) => {
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

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
    clearFieldError("password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous errors
    setFieldErrors({
      email: "",
      password: "",
      confirmPassword: "",
      namaOrganisasi: "",
      alamatOrganisasi: "",
      noHandphone: "",
    });
    setPasswordError("");

    // Validate password strength
    if (!validatePassword(password)) {
      setFieldErrors((prev) => ({
        ...prev,
        password: "Password harus memenuhi kriteria di atas",
      }));
      showAlertMessage("Password tidak memenuhi kriteria keamanan!", "error");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "Password tidak cocok",
      }));
      showAlertMessage(
        "Password dan konfirmasi password tidak cocok!",
        "error"
      );
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      // Prepare data for API
      const formData = {
        namaOrganisasi,
        email,
        password,
        confirmPassword,
        alamatOrganisasi,
        noHandphone,
      };

      // Map form data to API format
      const apiData = mapFormDataToApiData(formData);

      // Call signup API
      const response = await signupUser(apiData);

      // Save auth data to localStorage (optional)
      saveAuthData(response.data);

      // Show success message
      showAlertMessage("Akun berhasil dibuat! Mengalihkan...", "success");

      // Redirect to success page after a brief delay
      setTimeout(() => {
        try {
          router.push("/auth/signup/berhasil-signup");
        } catch (navError) {
          console.error("Navigation error:", navError);
          // Fallback navigation using window.location
          window.location.href = "/auth/signup/berhasil-signup";
        }
      }, 2000); // Increased delay to 2 seconds
    } catch (error) {
      console.error("Signup failed:", error);

      if (error instanceof ApiError) {
        const errorMessage = getErrorMessage(error);

        // Handle specific validation errors untuk field spesifik
        if (error.status === 422 && error.errors) {
          // Map validation errors to specific fields
          if (error.errors.email_pengguna) {
            setFieldErrors((prev) => ({
              ...prev,
              email: error.errors!.email_pengguna[0],
            }));
          }
          if (error.errors.password_pengguna) {
            setFieldErrors((prev) => ({
              ...prev,
              password: error.errors!.password_pengguna[0],
            }));
          }
          if (error.errors.nama_pengguna) {
            setFieldErrors((prev) => ({
              ...prev,
              namaOrganisasi: error.errors!.nama_pengguna[0],
            }));
          }
          if (error.errors.alamat_pengguna) {
            setFieldErrors((prev) => ({
              ...prev,
              alamatOrganisasi: error.errors!.alamat_pengguna[0],
            }));
          }
          if (error.errors.no_telpon_pengguna) {
            setFieldErrors((prev) => ({
              ...prev,
              noHandphone: error.errors!.no_telpon_pengguna[0],
            }));
          }

          // Show general alert for validation errors
          showAlertMessage("Silakan perbaiki error pada form", "error");
        } else {
          // General error
          setPasswordError(errorMessage);
          showAlertMessage(errorMessage, "error");
        }
      } else {
        const generalError = "Terjadi kesalahan yang tidak terduga";
        setPasswordError(generalError);
        showAlertMessage(generalError, "error");
      }
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                placeholder="Masukkan Email Anda"
                className={`w-full px-4 py-3 rounded-lg border ${
                  fieldErrors.email ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                required
                disabled={isSubmitting}
              />
              {/* Email Error Message */}
              {fieldErrors.email && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.email}
                    </p>
                  </div>
                </div>
              )}
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    fieldErrors.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 ${
                    password ? "pr-12" : "pr-4"
                  } bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                  required
                  disabled={isSubmitting}
                />
                {/* Only show eye icon when there's text in password field */}
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              {/* Password Error Message */}
              {fieldErrors.password && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.password}
                    </p>
                  </div>
                </div>
              )}

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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearFieldError("confirmPassword");
                  }}
                  placeholder="Konfirmasi Password Anda"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    fieldErrors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 ${
                    confirmPassword ? "pr-12" : "pr-4"
                  } bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                  required
                  disabled={isSubmitting}
                />
                {/* Only show eye icon when there's text in confirm password field */}
                {confirmPassword && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              {/* Confirm Password Error Message */}
              {fieldErrors.confirmPassword && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.confirmPassword}
                    </p>
                  </div>
                </div>
              )}

              {/* General Password Error Message (fallback) */}
              {passwordError &&
                !fieldErrors.password &&
                !fieldErrors.confirmPassword && (
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
                onChange={(e) => {
                  setNamaOrganisasi(e.target.value);
                  clearFieldError("namaOrganisasi");
                }}
                placeholder="Masukkan Nama Organisasi Anda"
                className={`w-full px-4 py-3 rounded-lg border ${
                  fieldErrors.namaOrganisasi
                    ? "border-red-300"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                required
                disabled={isSubmitting}
              />
              {/* Nama Organisasi Error Message */}
              {fieldErrors.namaOrganisasi && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.namaOrganisasi}
                    </p>
                  </div>
                </div>
              )}
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
                onChange={(e) => {
                  setAlamatOrganisasi(e.target.value);
                  clearFieldError("alamatOrganisasi");
                }}
                placeholder="Masukkan Alamat Organisasi Anda"
                className={`w-full px-4 py-3 rounded-lg border ${
                  fieldErrors.alamatOrganisasi
                    ? "border-red-300"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                required
                disabled={isSubmitting}
              />
              {/* Alamat Organisasi Error Message */}
              {fieldErrors.alamatOrganisasi && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.alamatOrganisasi}
                    </p>
                  </div>
                </div>
              )}
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
                onChange={(e) => {
                  setNoHandphone(e.target.value);
                  clearFieldError("noHandphone");
                }}
                placeholder="Masukkan No Handphone Anda"
                className={`w-full px-4 py-3 rounded-lg border ${
                  fieldErrors.noHandphone ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 hover:bg-opacity-100 focus:transform focus:scale-105`}
                required
                disabled={isSubmitting}
              />
              {/* No Handphone Error Message */}
              {fieldErrors.noHandphone && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    <p className="text-red-600 text-sm font-medium">
                      {fieldErrors.noHandphone}
                    </p>
                  </div>
                </div>
              )}
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
