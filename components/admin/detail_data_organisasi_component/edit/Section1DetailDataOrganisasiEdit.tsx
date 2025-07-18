"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Youtube,
  Instagram,
  Calendar,
  Building2,
  ImageIcon,
} from "lucide-react";

interface OrganisasiData {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  telepon: string;
  email: string;
  website: string;
  instagram: string;
  deskripsi: string;
  tanggal: string;
  avatar?: string; // Optional avatar URL
}

interface Section1DetailDataOrganisasiEditProps {
  id: string;
}

const Section1DetailDataOrganisasiEdit = ({
  id,
}: Section1DetailDataOrganisasiEditProps) => {
  const [organisasiData, setOrganisasiData] = useState<OrganisasiData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Contoh data JSON
  const mockData: OrganisasiData = {
    id: "1",
    nama: "Kebersamaan Sosial",
    jenis: "Sosial",
    alamat: "Jl. KH. Kauman, Yogyakarta",
    telepon: "081234567890",
    email: "kebersamaan.sosial@gmail.com",
    website: "kebersamaan.sosial.id",
    instagram: "kebersamaan_sosial",
    deskripsi:
      "Organisasi Kebersamaan Sosial merupakan organisasi yang didirikan dengan tujuan untuk membangun solidaritas dan kepedulian sosial di masyarakat. Kami berkomitmen untuk menciptakan program-program yang bermanfaat bagi kesejahteraan bersama.",
    tanggal: "02-07-2025",
    avatar: "/kotabatu.png", // Kosongkan untuk menampilkan placeholder, atau isi dengan URL gambar
  };

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      setOrganisasiData(mockData);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-600 font-medium">Memuat data...</div>
        </div>
      </div>
    );
  }

  if (!organisasiData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="text-center">
          <div className="text-slate-400 text-6xl mb-4">🔍</div>
          <div className="text-slate-600 font-medium">Data tidak ditemukan</div>
        </div>
      </div>
    );
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: organisasiData.alamat,
      color: "text-red-500",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: organisasiData.telepon,
      color: "text-green-500",
    },
    {
      icon: Mail,
      label: "Email",
      value: organisasiData.email,
      color: "text-blue-500",
    },
    {
      icon: Youtube,
      label: "Youtube",
      value: organisasiData.website,
      color: "text-red-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${organisasiData.instagram}`,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Edit Detail Organisasi
              </h1>
              <p className="text-slate-500 mt-1">
                Mengedit Informasi dari Organisasi
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-green-600 to-gray-700 p-6 sm:p-8">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white border-opacity-30 shadow-lg overflow-hidden">
                {organisasiData.avatar ? (
                  <img
                    src={organisasiData.avatar}
                    alt={`Avatar ${organisasiData.nama}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback jika gambar gagal dimuat
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                ) : null}
                <div
                  className={`flex flex-col items-center ${
                    organisasiData.avatar ? "hidden" : ""
                  }`}
                >
                  <ImageIcon
                    className="text-white text-opacity-80 mb-1"
                    size={20}
                  />
                  <span className="text-sm text-white text-opacity-80 font-medium">
                    {organisasiData.nama.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {organisasiData.nama}
                </h2>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="py-1 rounded-full text-lg font-semibold text-white">
                    {organisasiData.jenis}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2 text-white text-opacity-90">
                <Calendar size={18} />
                <span className="text-sm font-medium">
                  {organisasiData.tanggal}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                Deskripsi
              </h3>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {organisasiData.deskripsi}
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                Informasi Kontak
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-white shadow-sm ${item.color}`}
                      >
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-500 mb-1">
                          {item.label}
                        </div>
                        <div className="text-slate-800 font-medium break-words">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="text-sm text-slate-500">
                Data terakhir diperbarui: {organisasiData.tanggal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1DetailDataOrganisasiEdit;
