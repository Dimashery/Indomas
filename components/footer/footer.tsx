"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { useForm, ValidationError } from "@formspree/react";

// Contact Form Component
const ContactForm = () => {
  // Menggunakan form ID yang baru dari contoh
  const [state, handleSubmit] = useForm("mpwljgzg");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);

  // Handle success state with animation
  useEffect(() => {
    if (state.succeeded && !showSuccess) {
      setShowSuccess(true);
      setIsSubmitting(false);

      // Auto hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
        // Reset form when hiding success message
        if (formRef) {
          formRef.reset();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, showSuccess, formRef]);

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleSubmit(e);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
    }
  };

  // Success message with animation
  if (showSuccess) {
    return (
      <div className="transform transition-all duration-500 ease-in-out">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <svg
                className="w-6 h-6 text-green-600 animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <div>
              <p className="font-semibold text-green-800">Pesan Terkirim!</p>
              <p className="text-sm text-green-700">
                Terima kasih telah menghubungi kami
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 bg-green-200 rounded-full h-1 overflow-hidden">
            <div className="bg-green-600 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={setFormRef} onSubmit={handleFormSubmit} className="space-y-4">
      <div className="relative">
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Masukkan email Anda"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm transition-all"
          required
          disabled={state.submitting || isSubmitting}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-300 text-sm mt-1 block"
        />
      </div>

      <div className="relative">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tulis pesan Anda di sini"
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-sm resize-none transition-all"
          disabled={state.submitting || isSubmitting}
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-300 text-sm mt-1 block"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting || isSubmitting}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/30 hover:border-white/50 relative overflow-hidden group"
      >
        <div className="flex items-center justify-center space-x-2">
          {state.submitting || isSubmitting ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Mengirim...</span>
            </>
          ) : (
            <>
              <span>Kirim Pesan</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </div>

        {/* Loading overlay */}
        {(state.submitting || isSubmitting) && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl animate-pulse"></div>
        )}
      </button>

      {/* Error message */}
      {state.errors && Object.keys(state.errors).length > 0 && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">Terjadi kesalahan saat mengirim pesan</p>
          </div>
        </div>
      )}
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer Section with Gradient Background */}
      <div className="bg-gradient-to-br from-green-900 via-slate-800 to-slate-800 text-white">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-6 py-16">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Image
                    src="/logos/KESBANG.png"
                    alt="KESBANG Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    BAKESBANGPOL
                  </h3>
                  <p className="text-green-300 text-sm">
                    Badan Kesatuan Bangsa dan Politik
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed max-w-md">
                Membangun kesatuan bangsa dan memperkuat demokrasi melalui
                pemberdayaan organisasi masyarakat yang berkualitas dan
                berintegritas.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  {
                    icon: FaFacebookF,
                    href: "https://www.facebook.com/Bakesbangpolmalang/about/",
                    color: "hover:bg-blue-600",
                  },
                  { icon: FaXTwitter, href: "#", color: "hover:bg-slate-600" },
                  {
                    icon: FaSquareInstagram,
                    href: "https://www.instagram.com/bakesbangpolkotabatu/",
                    color: "hover:bg-pink-600",
                  },
                  { icon: IoLogoYoutube, href: "#", color: "hover:bg-red-600" },
                ].map(({ icon: Icon, href, color }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 ${color} hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/20 group`}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Menu Utama</h4>
              <nav className="space-y-3">
                {[
                  { name: "Home", href: "/home" },
                  { name: "List Ormas", href: "/list-ormas" },
                  {
                    name: "Panduan",
                    href: "https://drive.google.com/file/d/1-n59kMlBbeI2m15hbRn3hX35Rpm1kXLa/view?usp=drive_link",
                  },
                  { name: "FAQ", href: "/faq" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center text-slate-300 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Hubungi Kami</h4>
              <ContactForm />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-12"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Image
                    src="/logos/kotabatu.png"
                    alt="Kota Batu Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-sm text-slate-300">
                  Kota Batu Jawa Timur
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-slate-300 text-sm">
                © 2025{" "}
                <span className="font-semibold text-white">BAKESBANGPOL</span>
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Semua hak dilindungi undang-undang
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>
    </footer>
  );
};

export default Footer;
