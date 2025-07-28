import React from "react";
import Section2SuccessBerita from "@/components/user/buat_berita_components/Section2SuccessBerita";
import { Metadata } from "next";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Berita Acara Berhasil Di Buat - INDOMAS",
  description: "Selamat! Anda Berhasil Membuat Berita Acara",
};

const BerhasilBuatBeritaPage: React.FC = () => {
  return (
    <div className="w-full">
      <Section2SuccessBerita />
    </div>
  );
};

export default BerhasilBuatBeritaPage;
