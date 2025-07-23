"use client";

import React, { useState } from "react";
import { Edit2, Save, X, Plus, Trash2, Upload } from "lucide-react";

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  noKeanggotaan: string;
  noHandphone: string;
  noSK: string;
}

const Section2Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Data organisasi dengan nilai default kosong
  const [orgData, setOrgData] = useState({
    namaOrganisasi: "",
    bidangKajian: "",
    nomorTelepon: "",
    emailOrganisasi: "",
    alamatKantor: "",
    tanggalBerdiri: "",
    deskripsiOrganisasi: "",
    instagram: "",
    youtube: "",
  });

  // Data pengurus dengan nilai default kosong
  const [pengurusList, setPengurusList] = useState<Pengurus[]>([
    {
      id: "1",
      nama: "",
      jabatan: "",
      noKeanggotaan: "",
      noHandphone: "",
      noSK: "",
    },
    {
      id: "2",
      nama: "",
      jabatan: "",
      noKeanggotaan: "",
      noHandphone: "",
      noSK: "",
    },
    {
      id: "3",
      nama: "",
      jabatan: "",
      noKeanggotaan: "",
      noHandphone: "",
      noSK: "",
    },
  ]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSave = () => {
    // Validasi hanya untuk field yang wajib diisi
    const requiredFields = [
      { field: orgData.namaOrganisasi, name: "Nama Organisasi" },
      { field: orgData.bidangKajian, name: "Bidang Kajian" },
      { field: orgData.nomorTelepon, name: "Nomor Telepon" },
      { field: orgData.emailOrganisasi, name: "Email Organisasi" },
      { field: orgData.alamatKantor, name: "Alamat Kantor" },
      { field: orgData.tanggalBerdiri, name: "Tanggal Berdiri" },
    ];

    const emptyFields = requiredFields.filter((item) => !item.field.trim());
    if (emptyFields.length > 0) {
      alert(
        `Field wajib berikut harus diisi: ${emptyFields
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    // Validasi pengurus (minimal 3 dengan data lengkap)
    const validPengurus = pengurusList.filter(
      (p) =>
        p.nama.trim() &&
        p.jabatan.trim() &&
        p.noKeanggotaan.trim() &&
        p.noHandphone.trim() &&
        p.noSK.trim()
    );

    if (validPengurus.length < 3) {
      alert("Minimal harus ada 3 pengurus dengan data lengkap!");
      return;
    }

    // Validasi file
    if (!logoFile) {
      alert("Logo organisasi wajib diunggah!");
      return;
    }

    if (!pdfFile) {
      alert("File pendukung PDF wajib diunggah!");
      return;
    }

    // Simulasi save
    console.log("Data tersimpan:", {
      orgData,
      pengurusList: validPengurus,
      logoFile,
      pdfFile,
    });
    setIsEditing(false);
    alert("Data berhasil disimpan!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const addPengurus = () => {
    if (pengurusList.length >= 10) {
      alert("Maksimal 10 pengurus!");
      return;
    }

    const newPengurus: Pengurus = {
      id: Date.now().toString(),
      nama: "",
      jabatan: "",
      noKeanggotaan: "",
      noHandphone: "",
      noSK: "",
    };
    setPengurusList([...pengurusList, newPengurus]);
  };

  const removePengurus = (id: string) => {
    if (pengurusList.length <= 3) {
      alert("Minimal harus ada 3 pengurus!");
      return;
    }
    setPengurusList(pengurusList.filter((p) => p.id !== id));
  };

  const updatePengurus = (id: string, field: keyof Pengurus, value: string) => {
    setPengurusList(
      pengurusList.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "pdf"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "logo") {
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar!");
        return;
      }
      setLogoFile(file);
    } else {
      if (file.type !== "application/pdf") {
        alert("File harus berupa PDF!");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file maksimal 10MB!");
        return;
      }
      setPdfFile(file);
    }
  };

  const bidangKajianOptions = [
    "Sosial",
    "Ekonomi",
    "Budaya",
    "Pendidikan",
    "Kesehatan",
    "Lingkungan",
    "Teknologi",
    "Olahraga",
    "Seni",
    "Agama",
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <style jsx>{`
        .dark-placeholder::placeholder {
          color: #4b5563 !important;
          opacity: 1 !important;
        }
        .dark-placeholder::-webkit-input-placeholder {
          color: #4b5563 !important;
          opacity: 1 !important;
        }
        .dark-placeholder::-moz-placeholder {
          color: #4b5563 !important;
          opacity: 1 !important;
        }
        .dark-placeholder:-ms-input-placeholder {
          color: #4b5563 !important;
          opacity: 1 !important;
        }
        .dark-placeholder:-moz-placeholder {
          color: #4b5563 !important;
          opacity: 1 !important;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Formulir Pengajuan, Legalitas dan Rencana Kerja Organisasi
                  Masyarakat
                </h2>
                <p className="text-gray-600">
                  Kelola dan edit informasi lengkap organisasi Anda
                </p>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      Simpan
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-green-900 transition-colors"
                    >
                      <X size={16} />
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Informasi Dasar Organisasi */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Informasi Dasar Organisasi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Organisasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={orgData.namaOrganisasi}
                    onChange={(e) =>
                      setOrgData({ ...orgData, namaOrganisasi: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder={
                      !isEditing
                        ? "Yayasan Indomas Nusantara"
                        : "Masukkan nama organisasi"
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Kajian <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={orgData.bidangKajian}
                    onChange={(e) =>
                      setOrgData({ ...orgData, bidangKajian: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                    required
                  >
                    <option value="">
                      {!isEditing ? "Sosial" : "Pilih bidang kajian"}
                    </option>
                    {bidangKajianOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={orgData.nomorTelepon}
                    onChange={(e) =>
                      setOrgData({ ...orgData, nomorTelepon: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder={
                      !isEditing ? "+628298347234" : "Masukkan nomor telepon"
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Organisasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={orgData.emailOrganisasi}
                    onChange={(e) =>
                      setOrgData({
                        ...orgData,
                        emailOrganisasi: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    placeholder={
                      !isEditing
                        ? "info@indomas.org"
                        : "Masukkan email organisasi"
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Organisasi Berdiri{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={orgData.tanggalBerdiri}
                    onChange={(e) =>
                      setOrgData({ ...orgData, tanggalBerdiri: e.target.value })
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                    required
                  />
                  {!isEditing && !orgData.tanggalBerdiri && (
                    <div className="text-sm text-gray-600 mt-1 font-medium">
                      15 Januari 2020
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Kantor Organisasi{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={orgData.alamatKantor}
                  onChange={(e) =>
                    setOrgData({ ...orgData, alamatKantor: e.target.value })
                  }
                  disabled={!isEditing}
                  placeholder={
                    !isEditing
                      ? "Jl. Merdeka No. 123, Jakarta Pusat"
                      : "Masukkan alamat kantor lengkap"
                  }
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                    !isEditing ? "dark-placeholder" : ""
                  }`}
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Informasi Tambahan (Opsional)
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Tentang Organisasi
                </label>
                <textarea
                  value={orgData.deskripsiOrganisasi}
                  onChange={(e) =>
                    setOrgData({
                      ...orgData,
                      deskripsiOrganisasi: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  placeholder={
                    !isEditing
                      ? "Yayasan yang bergerak dalam bidang sosial dan pendidikan untuk masyarakat Indonesia."
                      : "Penjelasan singkat atau detail mengenai organisasi Anda..."
                  }
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                    !isEditing ? "dark-placeholder" : ""
                  }`}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={orgData.instagram}
                    onChange={(e) =>
                      setOrgData({ ...orgData, instagram: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder={
                      !isEditing
                        ? "@indomas_nusantara"
                        : "@username atau link Instagram"
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={orgData.youtube}
                    onChange={(e) =>
                      setOrgData({ ...orgData, youtube: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder={
                      !isEditing
                        ? "https://youtube.com/@indomas"
                        : "https://youtube.com/@channel"
                    }
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                      !isEditing ? "dark-placeholder" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Struktur Pengurus */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 pb-2 border-b">
                  Struktur Pengurus Organisasi
                </h3>
                {isEditing && (
                  <button
                    onClick={addPengurus}
                    disabled={pengurusList.length >= 10}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    <Plus size={16} />
                    Tambah Pengurus
                  </button>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Minimal 3 pengurus dan maksimal 10 pengurus. Saat ini:{" "}
                {pengurusList.length} pengurus
              </p>

              <div className="space-y-4">
                {pengurusList.map((pengurus, index) => (
                  <div
                    key={pengurus.id}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-800">
                        Pengurus {index + 1}
                      </h4>
                      {isEditing && pengurusList.length > 3 && (
                        <button
                          onClick={() => removePengurus(pengurus.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nama <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pengurus.nama}
                          onChange={(e) =>
                            updatePengurus(pengurus.id, "nama", e.target.value)
                          }
                          disabled={!isEditing}
                          placeholder={
                            !isEditing
                              ? index === 0
                                ? "Budi Santoso"
                                : index === 1
                                ? "Siti Rahayu"
                                : "Ahmad Wijaya"
                              : "Masukkan nama pengurus"
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                            !isEditing ? "dark-placeholder" : ""
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jabatan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pengurus.jabatan}
                          onChange={(e) =>
                            updatePengurus(
                              pengurus.id,
                              "jabatan",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          placeholder={
                            !isEditing
                              ? index === 0
                                ? "Ketua"
                                : index === 1
                                ? "Sekretaris"
                                : "Bendahara"
                              : "Masukkan jabatan"
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                            !isEditing ? "dark-placeholder" : ""
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          No. Keanggotaan{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pengurus.noKeanggotaan}
                          onChange={(e) =>
                            updatePengurus(
                              pengurus.id,
                              "noKeanggotaan",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          placeholder={
                            !isEditing
                              ? `ORG-00${index + 1}`
                              : "Masukkan nomor keanggotaan"
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                            !isEditing ? "dark-placeholder" : ""
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          No. Handphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={pengurus.noHandphone}
                          onChange={(e) =>
                            updatePengurus(
                              pengurus.id,
                              "noHandphone",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          placeholder={
                            !isEditing
                              ? `08123456789${index}`
                              : "Masukkan nomor handphone"
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                            !isEditing ? "dark-placeholder" : ""
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          No. SK <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={pengurus.noSK}
                          onChange={(e) =>
                            updatePengurus(pengurus.id, "noSK", e.target.value)
                          }
                          disabled={!isEditing}
                          placeholder={
                            !isEditing
                              ? `SK-00${index + 1}/2024`
                              : "Masukkan nomor SK"
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 text-gray-500 ${
                            !isEditing ? "dark-placeholder" : ""
                          }`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lampiran File */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                Lampiran Gambar dan File PDF
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Organisasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Organisasi <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {logoFile ? (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          File terpilih: {logoFile.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ukuran: {(logoFile.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <Upload className="mx-auto mb-2" size={24} />
                        {!isEditing
                          ? "Logo organisasi belum diunggah"
                          : "Pilih file gambar logo"}
                      </div>
                    )}
                    {isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "logo")}
                        className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                    )}
                  </div>
                </div>

                {/* File PDF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Pendukung (PDF) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {pdfFile ? (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          File terpilih: {pdfFile.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ukuran: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <Upload className="mx-auto mb-2" size={24} />
                        {!isEditing
                          ? "File PDF belum diunggah"
                          : "Pilih file PDF (max 5MB)"}
                      </div>
                    )}
                    {isEditing && (
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, "pdf")}
                        className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      />
                    )}
                  </div>

                  {/* Persyaratan PDF */}
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-1">
                      Persyaratan File PDF:
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>
                        • Dokumen harus memiliki logo organisasi di bagian
                        header
                      </li>
                      <li>
                        • Dokumen harus sinkron dengan data organisasi di
                        formulir
                      </li>
                      <li>
                        • Dokumen harus berisi tanda tangan dan stempel
                        organisasi
                      </li>
                      <li>• Ukuran file maksimum 5 MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Status Pendaftaran:</span>
                <span className="text-green-600 font-semibold">Aktif</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Organisasi Anda telah terdaftar dan aktif. Gunakan mode edit
                untuk mengubah informasi yang diperlukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Profile;
