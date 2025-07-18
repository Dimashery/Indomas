"use client";

import React, { useState, useEffect } from "react";
import { Save, X, Edit } from "lucide-react";

// Tipe data untuk profile, bisa diekspansi sesuai kebutuhan
interface UserData {
  email: string;
  namaOrganisasi: string;
  alamatOrganisasi: string;
  noHandphone: string;
}

// Tipe data untuk form password
interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Komponen Input Field yang telah disederhanakan dan diperbaiki gayanya
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full rounded-md border bg-gray-50 px-3 py-2 text-gray-800 shadow-sm transition-colors duration-200 ease-in-out
        ${
          disabled
            ? "cursor-not-allowed bg-gray-100"
            : "focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        }
        ${error ? "border-red-500" : "border-gray-300"}
        placeholder:text-gray-400`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const Section1Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi content saat component mount
    const contentTimer = setTimeout(() => {
      setAnimateContent(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Data awal, idealnya ini diambil dari API
  const [formData, setFormData] = useState<UserData>({
    email: "user@example.com",
    namaOrganisasi: "Organisasi Contoh",
    alamatOrganisasi: "Jl. Contoh No. 123, Kota Batu",
    noHandphone: "08123456789",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({}); // Hapus error saat beralih mode
    // Reset password fields saat membatalkan edit
    if (isEditing) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validasi data profile
    if (!formData.email) newErrors.email = "Email organisasi wajib diisi";
    if (!formData.namaOrganisasi)
      newErrors.namaOrganisasi = "Nama organisasi wajib diisi";
    if (!formData.alamatOrganisasi)
      newErrors.alamatOrganisasi = "Alamat organisasi wajib diisi";
    if (!formData.noHandphone)
      newErrors.noHandphone = "Nomor handphone wajib diisi";

    // Validasi password jika ada input password
    if (
      passwordData.currentPassword ||
      passwordData.newPassword ||
      passwordData.confirmPassword
    ) {
      if (!passwordData.currentPassword) {
        newErrors.currentPassword = "Password lama wajib diisi";
      }
      if (!passwordData.newPassword) {
        newErrors.newPassword = "Password baru wajib diisi";
      } else if (passwordData.newPassword.length < 8) {
        newErrors.newPassword = "Password baru minimal 8 karakter";
      }
      if (!passwordData.confirmPassword) {
        newErrors.confirmPassword = "Konfirmasi password wajib diisi";
      } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulasi panggilan API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Profile berhasil diperbarui!");
      setIsEditing(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      alert("Gagal memperbarui profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Section 1: Header dengan Background Image */}
      <div className="relative w-full">
        {/* Background Image */}
        <div
          className="w-screen bg-cover bg-center bg-no-repeat relative left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: "url('/bg_form.png')",
            height: "400px", // Tinggi section header
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minWidth: "101vw",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
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
            <h1 className="text-4xl font-bold text-white mb-4">Edit Profile</h1>
            <p className="text-white/80 text-lg">
              Perbarui Profile dan Informasi Organisasi Anda di sini
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Profile Content dengan Background Putih yang Fit */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-xl bg-white p-8 shadow-lg border border-gray-200 transition-all duration-1000 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Header Kartu */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Informasi Profile
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kelola informasi organisasi Anda
                  </p>
                </div>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  {isEditing ? (
                    <>
                      <X size={16} /> Batal
                    </>
                  ) : (
                    <>
                      <Edit size={16} /> Edit Profile
                    </>
                  )}
                </button>
              </div>

              {/* Form Content */}
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                  <InputField
                    label="Email Organisasi"
                    name="email"
                    type="email"
                    placeholder="Masukkan email organisasi"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    disabled={!isEditing}
                  />
                  <InputField
                    label="Nama Organisasi"
                    name="namaOrganisasi"
                    placeholder="Masukkan nama organisasi"
                    value={formData.namaOrganisasi}
                    onChange={handleInputChange}
                    error={errors.namaOrganisasi}
                    disabled={!isEditing}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Alamat Organisasi"
                      name="alamatOrganisasi"
                      placeholder="Masukkan alamat organisasi"
                      value={formData.alamatOrganisasi}
                      onChange={handleInputChange}
                      error={errors.alamatOrganisasi}
                      disabled={!isEditing}
                    />
                  </div>
                  <InputField
                    label="No Handphone"
                    name="noHandphone"
                    placeholder="Masukkan nomor handphone"
                    value={formData.noHandphone}
                    onChange={handleInputChange}
                    error={errors.noHandphone}
                    disabled={!isEditing}
                  />
                </div>

                {/* Bagian Ubah Password (hanya muncul saat editing) */}
                {isEditing && (
                  <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50/50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                      Ubah Password (Opsional)
                    </h3>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                      <InputField
                        label="Password Lama"
                        name="currentPassword"
                        type="password"
                        placeholder="Masukkan password lama"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        error={errors.currentPassword}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Password Baru"
                        name="newPassword"
                        type="password"
                        placeholder="Minimal 8 karakter"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        error={errors.newPassword}
                        disabled={!isEditing}
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Konfirmasi Password Baru"
                          name="confirmPassword"
                          type="password"
                          placeholder="Ulangi password baru"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          error={errors.confirmPassword}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tombol Aksi (hanya muncul saat editing) */}
                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Update Profile
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Section */}
            {/* <div
              className={`text-center mt-8 pb-8 transition-all duration-1000 ${
                animateContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "300ms",
              }}
            >
              <p className="text-gray-600 mb-2">
                Butuh bantuan? Kontak melalui email kami
              </p>
              <a
                href="mailto:kesbangpol.kotabatu@gmail.com"
                className="text-green-600 hover:text-green-700 transition-all duration-200 font-medium hover:underline transform hover:scale-105"
              >
                kesbangpol.kotabatu@gmail.com
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Profile;
