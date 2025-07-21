"use client";

import React, { useState } from "react";

interface Pengurus {
  nama: string;
  jabatan: string;
  keanggotaan: string;
  handphone: string;
  noSK: string;
}

interface FormData {
  namaOrganisasi: string;
  bidangKajian: string;
  nomorTelepon: string;
  emailOrganisasi: string;
  alamatKantor: string;
  tanggalBerdiri: string;
  deskripsiOrganisasi: string;
  instagram: string;
  youtube: string;
  pengurus: Pengurus[];
  logoOrganisasi: File | null;
  filePendukung: File | null;
}

const Section1Daftar: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    namaOrganisasi: "",
    bidangKajian: "",
    nomorTelepon: "",
    emailOrganisasi: "",
    alamatKantor: "",
    tanggalBerdiri: "",
    deskripsiOrganisasi: "",
    instagram: "",
    youtube: "",
    pengurus: [
      {
        nama: "",
        jabatan: "",
        keanggotaan: "",
        handphone: "",
        noSK: "",
      },
      {
        nama: "",
        jabatan: "",
        keanggotaan: "",
        handphone: "",
        noSK: "",
      },
    ],
    logoOrganisasi: null,
    filePendukung: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePengurusChange = (
    index: number,
    field: keyof Pengurus,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      pengurus: prev.pengurus.map((pengurus, i) =>
        i === index ? { ...pengurus, [field]: value } : pengurus
      ),
    }));

    // Clear error when user starts typing
    const errorKey = `pengurus_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoOrganisasi" | "filePendukung"
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    // Clear error when user selects file
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Required fields validation
    if (!formData.namaOrganisasi.trim()) {
      newErrors.namaOrganisasi = "Nama Organisasi harus diisi";
    }

    if (!formData.bidangKajian) {
      newErrors.bidangKajian = "Bidang Kajian harus dipilih";
    }

    if (!formData.nomorTelepon.trim()) {
      newErrors.nomorTelepon = "Nomor Telepon harus diisi";
    }

    if (!formData.emailOrganisasi.trim()) {
      newErrors.emailOrganisasi = "Email Organisasi harus diisi";
    }

    if (!formData.alamatKantor.trim()) {
      newErrors.alamatKantor = "Alamat Kantor harus diisi";
    }

    if (!formData.tanggalBerdiri) {
      newErrors.tanggalBerdiri = "Tanggal Berdiri harus diisi";
    }

    if (!formData.logoOrganisasi) {
      newErrors.logoOrganisasi = "Logo Organisasi harus diupload";
    }

    if (!formData.filePendukung) {
      newErrors.filePendukung = "File Pendukung harus diupload";
    }

    // Validate pengurus (at least 3 required)
    let filledPengurusCount = 0;
    formData.pengurus.forEach((pengurus, index) => {
      const hasAnyField =
        pengurus.nama.trim() ||
        pengurus.jabatan.trim() ||
        pengurus.keanggotaan.trim() ||
        pengurus.handphone.trim() ||
        pengurus.noSK.trim();

      if (hasAnyField) {
        filledPengurusCount++;
        // If any field is filled, all fields are required
        if (!pengurus.nama.trim()) {
          newErrors[`pengurus_${index}_nama`] = "Nama harus diisi";
        }
        if (!pengurus.jabatan.trim()) {
          newErrors[`pengurus_${index}_jabatan`] = "Jabatan harus diisi";
        }
        if (!pengurus.keanggotaan.trim()) {
          newErrors[`pengurus_${index}_keanggotaan`] =
            "No. Keanggotaan harus diisi";
        }
        if (!pengurus.handphone.trim()) {
          newErrors[`pengurus_${index}_handphone`] =
            "No. Handphone harus diisi";
        }
        if (!pengurus.noSK.trim()) {
          newErrors[`pengurus_${index}_noSK`] = "No. SK harus diisi";
        }
      }
    });

    if (filledPengurusCount < 3) {
      newErrors.pengurus = "Minimal 3 pengurus harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Redirect to success page
      window.location.href = "/daftar-ormas/berhasil-daftar";
    }
  };

  const addPengurus = () => {
    if (formData.pengurus.length < 10) {
      setFormData((prev) => ({
        ...prev,
        pengurus: [
          ...prev.pengurus,
          {
            nama: "",
            jabatan: "",
            keanggotaan: "",
            handphone: "",
            noSK: "",
          },
        ],
      }));
    }
  };

  const removePengurus = () => {
    if (formData.pengurus.length > 2) {
      setFormData((prev) => ({
        ...prev,
        pengurus: prev.pengurus.slice(0, -1),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative">
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

        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Formulir Pengajuan, Legalitas dan Rencana Kerja
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Organisasi Masyarakat
            </h2>
            <p className="text-white/80 text-lg">
              Daftar Organisasi Anda untuk melakukan pengajuan legalitas
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Organization Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Organisasi *
                  </label>
                  <input
                    type="text"
                    name="namaOrganisasi"
                    value={formData.namaOrganisasi}
                    onChange={handleInputChange}
                    placeholder="Masukkan Nama Organisasi Anda"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                      errors.namaOrganisasi
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.namaOrganisasi && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.namaOrganisasi}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Kajian *
                  </label>
                  <select
                    name="bidangKajian"
                    value={formData.bidangKajian}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                      errors.bidangKajian ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Pilih</option>
                    <option value="sosial">Sosial</option>
                    <option value="ekonomi">Ekonomi</option>
                    <option value="budaya">Budaya</option>
                    <option value="pendidikan">Pendidikan</option>
                    <option value="kesehatan">Kesehatan</option>
                  </select>
                  {errors.bidangKajian && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bidangKajian}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    name="nomorTelepon"
                    value={formData.nomorTelepon}
                    onChange={handleInputChange}
                    placeholder="Masukkan Nomor Telepon"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                      errors.nomorTelepon ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nomorTelepon && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nomorTelepon}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Organisasi *
                  </label>
                  <input
                    type="email"
                    name="emailOrganisasi"
                    value={formData.emailOrganisasi}
                    onChange={handleInputChange}
                    placeholder="Masukkan Email Organisasi"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                      errors.emailOrganisasi
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.emailOrganisasi && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.emailOrganisasi}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Kantor Organisasi *
                </label>
                <input
                  type="text"
                  name="alamatKantor"
                  value={formData.alamatKantor}
                  onChange={handleInputChange}
                  placeholder="Masukkan Alamat Kantor Organisasi"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                    errors.alamatKantor ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.alamatKantor && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.alamatKantor}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Organisasi Berdiri *
                </label>
                <input
                  type="date"
                  name="tanggalBerdiri"
                  value={formData.tanggalBerdiri}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                    errors.tanggalBerdiri ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tanggalBerdiri && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tanggalBerdiri}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Tentang Organisasi (Opsional)
                </label>
                <textarea
                  name="deskripsiOrganisasi"
                  value={formData.deskripsiOrganisasi}
                  onChange={handleInputChange}
                  placeholder="Masukkan Deskripsi Organisasi"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>

              {/* Social Media Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Sosial Media (Opsional)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="Masukkan Instagram Organisasi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Youtube
                    </label>
                    <input
                      type="text"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleInputChange}
                      placeholder="Masukkan Youtube Organisasi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Struktur Pengurus Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Struktur Pengurus *
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  *Mengisian Pengurus dalam Sekurang-kurangnya 3 (Maksimal 10)
                </p>

                {errors.pengurus && (
                  <p className="text-red-500 text-sm mb-4">{errors.pengurus}</p>
                )}

                {/* Dynamic Pengurus List */}
                {formData.pengurus.map((pengurus, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Pengurus {index + 1}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <input
                          type="text"
                          value={pengurus.nama}
                          onChange={(e) =>
                            handlePengurusChange(index, "nama", e.target.value)
                          }
                          placeholder="Masukkan Nama"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                            errors[`pengurus_${index}_nama`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`pengurus_${index}_nama`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`pengurus_${index}_nama`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={pengurus.jabatan}
                          onChange={(e) =>
                            handlePengurusChange(
                              index,
                              "jabatan",
                              e.target.value
                            )
                          }
                          placeholder="Masukkan Jabatan"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                            errors[`pengurus_${index}_jabatan`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`pengurus_${index}_jabatan`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`pengurus_${index}_jabatan`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <input
                          type="text"
                          value={pengurus.keanggotaan}
                          onChange={(e) =>
                            handlePengurusChange(
                              index,
                              "keanggotaan",
                              e.target.value
                            )
                          }
                          placeholder="Masukkan No. Keanggotaan"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                            errors[`pengurus_${index}_keanggotaan`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`pengurus_${index}_keanggotaan`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`pengurus_${index}_keanggotaan`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          value={pengurus.handphone}
                          onChange={(e) =>
                            handlePengurusChange(
                              index,
                              "handphone",
                              e.target.value
                            )
                          }
                          placeholder="Masukkan No. Handphone"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                            errors[`pengurus_${index}_handphone`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`pengurus_${index}_handphone`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`pengurus_${index}_handphone`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={pengurus.noSK}
                          onChange={(e) =>
                            handlePengurusChange(index, "noSK", e.target.value)
                          }
                          placeholder="Masukkan No. SK"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white ${
                            errors[`pengurus_${index}_noSK`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`pengurus_${index}_noSK`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`pengurus_${index}_noSK`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3">
                  {formData.pengurus.length < 10 && (
                    <button
                      type="button"
                      onClick={addPengurus}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 mb-6"
                    >
                      Tambah Pengurus
                    </button>
                  )}

                  {formData.pengurus.length > 2 && (
                    <button
                      type="button"
                      onClick={removePengurus}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 mb-6"
                    >
                      Hapus Pengurus
                    </button>
                  )}
                </div>
              </div>

              {/* Logo Organization Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Logo Organisasi *
                </h3>
                <p className="text-sm text-gray-600 mb-4">Add Image</p>

                <label
                  htmlFor="logoFile"
                  className={`flex flex-col items-center rounded border p-4 text-gray-900 shadow-sm sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    errors.logoOrganisasi ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                    />
                  </svg>
                  <span className="mt-4 font-medium">
                    Drop Image Here, Paste Or
                  </span>
                  <span className="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                    Select
                  </span>
                  <input
                    type="file"
                    id="logoFile"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logoOrganisasi")}
                    className="sr-only"
                  />
                </label>
                {formData.logoOrganisasi && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {formData.logoOrganisasi.name}
                  </p>
                )}
                {errors.logoOrganisasi && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.logoOrganisasi}
                  </p>
                )}
              </div>

              {/* File Pendukung */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  File Pendukung *
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Dokumen Pendukung mengenai ormas, harus terdapat beberapa
                  persyaratan berikut :
                </p>

                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <div>1. Dokumen harus memiliki logo organisasi Header</div>
                  <div>
                    2. Dokumen harus disinkron dengan Nama Organisasi, Struktur
                    Organisasi, dan Alamat Organisasi
                  </div>
                  <div>
                    3. Dokumen harus berisi tanda tangan dan stempel Organisasi
                    dan Kepala
                  </div>
                  <div>4. Anda dapat mengakses tempalate File Pendukung</div>
                  <div>
                    5. Lalu unggah berkas dalam bentuk PDF dengan syarat
                    ketentuan dibawah ini
                  </div>
                </div>

                <div className="text-gray-950">
                  <p className="font-semibold">Template File Pendukung *</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Berikut untuk Template pendukungnya : {"Template.docx"}
                  </p>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Upload Max 2 MB format PDF
                </p>

                <fieldset
                  className={`border rounded-lg p-4 ${
                    errors.filePendukung ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <legend className="px-2 text-sm font-medium text-gray-700">
                    Pick a file
                  </legend>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "filePendukung")}
                    className="w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <label className="block text-xs text-gray-500 mt-2">
                    Max size 2MB
                  </label>
                </fieldset>
                {formData.filePendukung && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {formData.filePendukung.name}
                  </p>
                )}
                {errors.filePendukung && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.filePendukung}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Daftar;
