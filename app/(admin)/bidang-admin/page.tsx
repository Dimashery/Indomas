// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\divisi\page.tsx
import Section1BidangAdmin from "@/components/admin/bidang_component/Section1BidangAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Bidang Admin - INDOMAS",
  description: "Halaman Mengubah Bidang Kesbangpol di Admin dari Website INDOMAS",
};

const DivisiPage = () => {
  return (
    <>
      <Section1BidangAdmin />
    </>
  );
};

export default DivisiPage;