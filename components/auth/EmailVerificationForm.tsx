"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmailVerificationForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle email verification logic here
      console.log("Email verification request:", { email });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to OTP verification page
      router.push("/auth/password/OTPVerificationForm");
    } catch (error) {
      console.error("Email verification failed:", error);
      // Handle error (you can add toast notification here)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* OPTION 1: Pure CSS Background (Recommended) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
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

      {/* OPTION 2: If you prefer gradient only, uncomment this and comment above */}
      {/* 
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      */}

      {/* OPTION 3: If you want to use Next.js Image with better error handling */}
      {/* 
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900"></div>
        <Image
          src="/bg_form.png"
          alt="Background"
          fill
          className="object-cover z-10"
          priority
          onError={() => console.log('Background image failed to load, using gradient fallback')}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 z-20"></div>
      </div>
      */}

      {/* Email Verification Form Container */}
      <div className="relative z-30 w-full max-w-md mx-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 relative">
              <Image
                src="/logos/KESBANG.png"
                alt="KESBANG Logo"
                fill
                className="object-contain"
                onError={() => console.log("KESBANG logo failed to load")}
              />
            </div>
            <div className="w-16 h-16 relative">
              <Image
                src="/logos/kotabatu.png"
                alt="Kota Batu Logo"
                fill
                className="object-contain"
                onError={() => console.log("Kota Batu logo failed to load")}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4 tracking-wide">
            Verifikasi Email
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed">
            Tulis Email Anda untuk menerima
            <br />
            Kode Verifikasi
          </p>

          {/* Email Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                "Kirim Kode Verifikasi"
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                <Link
                  href="/auth/login"
                  className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-200 hover:underline"
                >
                  Kembali ke Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-6 text-white text-sm drop-shadow-lg">
          <p>Website dari Badan Kesatuan Bangsa dan Politik (BAKESBANGPOL)</p>
          <p>Untuk Keperluan Pendataan Organisasi Masyarakat</p>
        </div>
      </div>
    </div>
  );
}
