// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\berita\page.tsx
import Section1BeritaAdmin from "@/components/admin/berita_component/Section1BeritaAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Berita Admin - INDOMAS",
  description: "Halaman Seleksi Berita di Admin dari Website INDOMAS",
};

const BeritaPage = () => {
  return (
    <>
      <Section1BeritaAdmin />
    </>
  );
};

export default BeritaPage;