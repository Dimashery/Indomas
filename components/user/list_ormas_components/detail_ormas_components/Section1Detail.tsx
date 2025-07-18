// C:\Indomas\components\user\list_ormas_components\detail_ormas_components\Section1Detail.tsx
"use client";

import React, { useState, useEffect } from "react";

interface OrmasData {
  id: string;
  name: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  description: string;
  logo?: string;
  status: "active" | "inactive";
}

interface Section1DetailProps {
  ormasData: OrmasData;
}

const Section1Detail: React.FC<Section1DetailProps> = ({ ormasData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProfile, setAnimateProfile] = useState(false);

  useEffect(() => {
    // Header animation
    const headerTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Profile animation
    const profileTimer = setTimeout(() => {
      setAnimateProfile(true);
    }, 600);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(profileTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section dengan Background */}
      <div className="relative w-full">
        {/* Background dengan overlay */}
        <div
          className="w-screen bg-cover bg-center bg-no-repeat relative left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: "url('/bg_form.png')",
            height: "400px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minWidth: "101vw",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Header Content */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              List Organisasi di Kota Batu
            </h1>
            <p className="text-white/90 text-lg">
              List Organisasi Yang sudah Terdaftar di Kota Batu
            </p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${
                animateProfile
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Logo/Avatar */}
                  <div className="w-32 h-32 bg-red-400 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    {ormasData.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ormasData.logo}
                        alt={`Logo ${ormasData.name}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white text-4xl font-bold">
                        {ormasData.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Organization Name */}
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {ormasData.name}
                  </h1>

                  {/* Category */}
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-white font-medium">
                      {ormasData.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      ormasData.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ormasData.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Informasi Kontak
                    </h2>

                    {/* Email */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-gray-800 font-medium">
                          {ormasData.email}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telepon</p>
                        <p className="text-gray-800 font-medium">
                          {ormasData.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Alamat</p>
                        <p className="text-gray-800 font-medium">
                          {ormasData.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Registration Info */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Informasi Registrasi
                    </h2>

                    {/* Registration Date */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Tanggal Registrasi
                        </p>
                        <p className="text-gray-800 font-medium">
                          {ormasData.registrationDate}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Deskripsi Organisasi
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {ormasData.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Detail;
