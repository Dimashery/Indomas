import React from "react";
import Section1BuatBerita from "@/components/user/buat_berita_components/Section1BuatBerita";
import { Metadata } from "next";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Buat Berita Acara - INDOMAS",
  description: "Halaman Buat Berita Acara dari Website INDOMAS",
};

const BuatBeritaPage: React.FC = () => {
  return (
    <div>
      <Section1BuatBerita />
    </div>
  );
};

export default BuatBeritaPage;
