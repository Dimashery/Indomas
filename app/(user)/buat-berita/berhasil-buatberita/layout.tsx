import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berhasil Membuat Berita | Indomas",
  description: "Berita kegiatan Anda telah berhasil dibuat dan diunggah",
  keywords: ["berita", "kegiatan", "organisasi", "success", "berhasil"],
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
