"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  X,
  Edit,
  Upload,
  Trash2,
  CheckCircle,
  FileText,
} from "lucide-react";

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

// Tipe data untuk laporan tahunan
interface AnnualReport {
  id: string;
  fileName: string;
  fileSize: number;
  year: string;
  uploadDate: string;
  file?: File; // Optional untuk menyimpan file object
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

// Modal Popup untuk konfirmasi berhasil upload
const SuccessModal = ({
  isOpen,
  onClose,
  reportYear,
}: {
  isOpen: boolean;
  onClose: () => void;
  reportYear: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Berhasil Ditambahkan!
          </h3>
          <p className="text-gray-600 mb-4">
            Laporan tahunan {reportYear} berhasil ditambahkan ke sistem.
          </p>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

const Section1Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastUploadedYear, setLastUploadedYear] = useState("");

  // State untuk laporan tahunan
  const [annualReports, setAnnualReports] = useState<AnnualReport[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [newReportYear, setNewReportYear] = useState("");
  const [reportErrors, setReportErrors] = useState<{ [key: string]: string }>(
    {}
  );
  const [isUploadingReport, setIsUploadingReport] = useState(false);

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

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file PDF
    if (fileType === "pdf") {
      if (file.type !== "application/pdf") {
        setReportErrors((prev) => ({
          ...prev,
          file: "File harus berformat PDF",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setReportErrors((prev) => ({
          ...prev,
          file: "Ukuran file maksimum 5MB",
        }));
        return;
      }
      setPdfFile(file);
      setReportErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleReportYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReportYear(e.target.value);
    if (reportErrors.year) setReportErrors((prev) => ({ ...prev, year: "" }));
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

  const validateReportForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!pdfFile) {
      newErrors.file = "File PDF wajib diupload";
    }

    if (!newReportYear.trim()) {
      newErrors.year = "Tahun laporan wajib diisi";
    } else if (!/^\d{4}$/.test(newReportYear)) {
      newErrors.year = "Tahun harus berformat 4 digit (contoh: 2024)";
    } else if (annualReports.some((report) => report.year === newReportYear)) {
      newErrors.year = "Laporan untuk tahun ini sudah ada";
    }

    setReportErrors(newErrors);
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

  const handleUploadReport = async () => {
    if (!validateReportForm()) return;

    setIsUploadingReport(true);
    try {
      // Simulasi upload
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newReport: AnnualReport = {
        id: Date.now().toString(),
        fileName: pdfFile!.name,
        fileSize: pdfFile!.size,
        year: newReportYear,
        uploadDate: new Date().toLocaleDateString("id-ID"),
        file: pdfFile!,
      };

      setAnnualReports((prev) => [...prev, newReport]);
      setLastUploadedYear(newReportYear);
      setShowSuccessModal(true);

      // Reset form
      setPdfFile(null);
      setNewReportYear("");
      setReportErrors({});
    } catch {
      alert("Gagal mengupload laporan.");
    } finally {
      setIsUploadingReport(false);
    }
  };

  const handleDeleteReport = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      setAnnualReports((prev) => prev.filter((report) => report.id !== id));
    }
  };

  const handleViewReport = (report: AnnualReport) => {
    if (report.file) {
      const url = URL.createObjectURL(report.file);
      window.open(url, "_blank");
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
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informasi Profile */}
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
                  <div className="grid grid-cols-1 gap-y-6">
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
                    <InputField
                      label="Alamat Organisasi"
                      name="alamatOrganisasi"
                      placeholder="Masukkan alamat organisasi"
                      value={formData.alamatOrganisasi}
                      onChange={handleInputChange}
                      error={errors.alamatOrganisasi}
                      disabled={!isEditing}
                    />
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
                      <div className="grid grid-cols-1 gap-y-6">
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
                  )}

                  {/* Tombol Aksi (hanya muncul saat editing) */}
                  {isEditing && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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

              {/* Laporan Tahunan Organisasi */}
              <div
                className={`rounded-xl bg-white p-8 shadow-lg border border-gray-200 transition-all duration-1000 ${
                  animateContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {/* Header Kartu */}
                <div className="border-b border-gray-200 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Laporan Tahunan Organisasi
                    </h2>
                    <p className="text-sm text-gray-500">
                      Upload dan kelola laporan tahunan organisasi
                    </p>
                  </div>
                </div>

                {/* Form Upload Laporan */}
                <div className="mt-8">
                  <div className="grid grid-cols-1 gap-y-6">
                    <InputField
                      label="Tahun Laporan"
                      name="reportYear"
                      placeholder="2024"
                      value={newReportYear}
                      onChange={handleReportYearChange}
                      error={reportErrors.year}
                    />

                    {/* File PDF */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Laporan Tahunan (PDF){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {pdfFile ? (
                          <div className="space-y-2">
                            <FileText
                              className="mx-auto text-green-600"
                              size={32}
                            />
                            <div className="text-sm text-gray-600">
                              File terpilih: {pdfFile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Ukuran: {(pdfFile.size / 1024 / 1024).toFixed(2)}{" "}
                              MB
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500">
                            <Upload className="mx-auto mb-2" size={24} />
                            <p>Pilih file PDF (max 5MB)</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e, "pdf")}
                          className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                      </div>
                      {reportErrors.file && (
                        <p className="mt-1 text-xs text-red-500">
                          {reportErrors.file}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tombol Upload */}
                  <div className="mt-6">
                    <button
                      onClick={handleUploadReport}
                      disabled={
                        isUploadingReport || !pdfFile || !newReportYear.trim()
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {isUploadingReport ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Mengupload...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Upload Laporan
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Daftar Laporan yang sudah diupload */}
                {annualReports.length > 0 && (
                  <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50/50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                      Laporan Tersimpan
                    </h3>
                    <div className="space-y-4">
                      {annualReports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <FileText className="text-red-600" size={20} />
                              <span className="font-medium text-gray-800">
                                Laporan {report.year}
                              </span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Uploaded
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              File: {report.fileName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Ukuran:{" "}
                              {(report.fileSize / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-sm text-gray-600">
                              Diupload pada: {report.uploadDate}
                            </p>
                            <button
                              onClick={() => handleViewReport(report)}
                              className="text-sm text-blue-600 hover:text-blue-700 hover:underline mt-1 inline-block"
                            >
                              Lihat Laporan PDF
                            </button>
                          </div>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Hapus laporan"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        reportYear={lastUploadedYear}
      />
    </div>
  );
};

export default Section1Profile;
