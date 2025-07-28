// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\tentang-kami\page.tsx
import Section1TentangKamiAdmin from "@/components/admin/tentang_kami_component/Section1TentangKamiAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Tentang Kami Admin - INDOMAS",
  description: "Halaman Tentang Kami Bakesbangpol di Admin dari Website INDOMAS",
};

const TentangKamiPage = () => {
  return (
    <>
      <Section1TentangKamiAdmin />
    </>
  );
};

export default TentangKamiPage;