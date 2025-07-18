"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    // Check if all OTP fields are filled
    if (otpCode.length !== 6) {
      alert("Mohon masukkan kode OTP 6 digit");
      return;
    }

    setIsVerifying(true);

    try {
      // Handle OTP verification logic here
      console.log("OTP verification request:", { otp: otpCode });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After successful verification, redirect to Reset Password page
      router.push("/auth/password/ResetPasswordForm");
    } catch (error) {
      console.error("OTP verification failed:", error);
      // Handle error (you can add toast notification here)
      alert("Kode OTP tidak valid. Silakan coba lagi.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      // Handle resend OTP logic here
      console.log("Resending OTP...");
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);

      // Focus on first input after resend
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Background */}
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

      {/* OTP Verification Form Container */}
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
            Verifikasi OTP
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed">
            Masukkan kode verifikasi 6 digit
            <br />
            yang telah dikirim ke email Anda
          </p>

          {/* OTP Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Kode Verifikasi
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 bg-white bg-opacity-90"
                    required
                    disabled={isVerifying}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Tidak menerima kode?</p>
              {countdown > 0 ? (
                <p className="text-sm text-gray-500">
                  Kirim ulang dalam {countdown} detik
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending || isVerifying}
                  className="text-sm text-green-500 hover:text-green-600 font-semibold transition-colors duration-200 hover:underline disabled:opacity-50"
                >
                  {isResending ? "Mengirim..." : "Kirim Ulang Kode"}
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none shadow-lg flex items-center justify-center"
            >
              {isVerifying ? (
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
                  Memverifikasi...
                </>
              ) : (
                "Verifikasi"
              )}
            </button>

            {/* Back to Email Verification */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                <Link
                  href="/auth/password/EmailVerificationForm"
                  className="text-green-500 hover:text-green-600 font-semibold transition-colors duration-200 hover:underline"
                >
                  Kembali ke Verifikasi Email
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
