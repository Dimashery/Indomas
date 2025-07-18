"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Section1Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
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

      {/* Login Form Container with slide-up animation */}
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
            className={`text-3xl font-bold text-gray-800 text-center mb-8 tracking-wide transform transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            LOGIN
          </h1>

          {/* Login Form with staggered field animations */}
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
                Email
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
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Forgot Password Link */}
            <div
              className={`text-right transform transition-all duration-600 delay-800 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <a
                href="/auth/password/EmailVerificationForm"
                className="text-sm text-gray-600 hover:text-green-600 transition-all duration-200 hover:underline hover:scale-105 inline-block"
              >
                Lupa Password ?
              </a>
            </div>

            {/* Login Button */}
            <div
              className={`transform transition-all duration-600 delay-900 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg hover:shadow-xl active:scale-95"
              >
                Masuk
              </button>
            </div>

            {/* Register Link */}
            <div
              className={`text-center transform transition-all duration-600 delay-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-gray-600 text-sm">
                Belum memiliki akun?{" "}
                <Link
                  href="/auth/signup"
                  className="text-green-500 hover:text-green-600 font-semibold transition-all duration-200 hover:underline hover:scale-105 inline-block"
                >
                  Daftar Akun
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div
              className={`text-center transform transition-all duration-600 delay-1100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-gray-600 text-sm">
                <Link
                  href="/home"
                  className="text-green-500 hover:text-green-600 font-semibold transition-all duration-200 hover:underline hover:scale-105 inline-block"
                >
                  Kembali ke Home
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text with fade-in animation */}
        <div
          className={`text-center mt-6 text-white text-sm drop-shadow-lg transform transition-all duration-800 delay-1200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="hover:scale-105 transition-transform duration-200 inline-block">
            Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL)
          </p>
          <p className="hover:scale-105 transition-transform duration-200 inline-block">
            Untuk Keperluan Pendataan Organisasi Masyarakat
          </p>
        </div>
      </div>
    </div>
  );
}
