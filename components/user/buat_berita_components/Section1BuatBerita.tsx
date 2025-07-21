"use client";

import React, { useState, useEffect } from "react";

interface FormData {
  namaAcara: string;
  lokasiAcara: string;
  tanggalAcara: string;
  deskripsiAcara: string;
  fotoAcara: File | null;
}

const Section1BuatBerita: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    namaAcara: "",
    lokasiAcara: "",
    tanggalAcara: "",
    deskripsiAcara: "",
    fotoAcara: null,
  });
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    // Animasi header saat component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Animasi form saat component mount
    const formTimer = setTimeout(() => {
      setAnimateForm(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(formTimer);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      fotoAcara: file,
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !formData.namaAcara ||
      !formData.lokasiAcara ||
      !formData.tanggalAcara ||
      !formData.deskripsiAcara ||
      !formData.fotoAcara
    ) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    // Handle form submission here
    console.log("Form submitted:", formData);

    // Redirect to success page
    window.location.href = "/buat-berita/berhasil-buatberita";
  };

  return (
    <div className="min-h-screen">
      {/* Section 1: Header dengan Background Image */}
      <div className="relative w-full">
        {/* Background Image */}
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
            <h1 className="text-4xl font-bold text-white mb-4">
              Buat Berita Kegiatan
            </h1>
            <p className="text-white/80 text-lg">
              Buat kegiatan acara dari Organisasi Anda
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Form Content dengan Background Putih Penuh */}
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Syarat dan Ketentuan */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        SYARAT DAN KETENTUAN
                      </h3>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>
                          • Berita Anda akan direview oleh tim admin dalam 1-2
                          hari kerja
                        </li>
                        <li>
                          • Anda akan mendapat notifikasi email setelah berita
                          dipublikasikan
                        </li>
                        <li>
                          • Berita yang sudah dipublikasikan dapat dilihat di
                          halaman utama
                        </li>
                        <li>
                          • Konten tidak boleh mengandung kata-kata kasar, SARA,
                          atau konten seksual
                        </li>
                        <li>
                          • Gambar yang diunggah harus sesuai dengan konten
                          berita dan tidak mengandung unsur SARA atau konten
                          seksual
                        </li>
                        <li>
                          • Berita harus berisi informasi yang akurat dan dapat
                          dipertanggungjawabkan
                        </li>
                        <li>
                          • Tidak diperbolehkan mengunggah konten yang melanggar
                          hukum atau norma sosial
                        </li>
                        <li>
                          • Admin berhak menolak atau menghapus berita yang
                          tidak sesuai dengan ketentuan
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nama Acara */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <label
                  htmlFor="namaAcara"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Acara
                </label>
                <input
                  type="text"
                  id="namaAcara"
                  name="namaAcara"
                  value={formData.namaAcara}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nama Acara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              {/* Lokasi Acara */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <label
                  htmlFor="lokasiAcara"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Lokasi Acara
                </label>
                <input
                  type="text"
                  id="lokasiAcara"
                  name="lokasiAcara"
                  value={formData.lokasiAcara}
                  onChange={handleInputChange}
                  placeholder="Masukkan Lokasi Acara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              {/* Tanggal Acara */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <label
                  htmlFor="tanggalAcara"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  id="tanggalAcara"
                  name="tanggalAcara"
                  value={formData.tanggalAcara}
                  onChange={handleInputChange}
                  placeholder="Masukkan Tanggal Acara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              {/* Deskripsi Acara */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "750ms" }}
              >
                <label
                  htmlFor="deskripsiAcara"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Deskripsi Acara
                </label>
                <textarea
                  id="deskripsiAcara"
                  name="deskripsiAcara"
                  value={formData.deskripsiAcara}
                  onChange={handleInputChange}
                  placeholder="Masukkan Deskripsi Acara"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              {/* Foto Acara */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Acara
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fotoAcara"
                    name="fotoAcara"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {formData.fotoAcara
                        ? formData.fotoAcara.name
                        : "Drop Image Here, Paste Or"}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
                      onClick={() =>
                        document.getElementById("fotoAcara")?.click()
                      }
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Select
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div
                className={`transition-all duration-700 ${
                  animateForm
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "1050ms" }}
              >
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1BuatBerita;
