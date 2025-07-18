import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berhasil Daftar - Sistem Informasi Ormas",
  description: "Pendaftaran organisasi masyarakat berhasil disubmit",
  keywords: ["ormas", "pendaftaran", "berhasil", "organisasi masyarakat"],
};

interface LayoutProps {
  children: React.ReactNode;
}

const BerhasilDaftarLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default BerhasilDaftarLayout;
