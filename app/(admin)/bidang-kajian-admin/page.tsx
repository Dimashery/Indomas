// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\bidang-kajian\page.tsx
import Section1BidangKajianAdmin from "@/components/admin/bidang_kajian_component/Section1BidangKajianAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Bidang Kajian - INDOMAS",
  description: "Halaman Membuat Bidang Kajian di Admin dari Website INDOMAS",
};

const BidangKajianPage = () => {
  return (
    <>
      <Section1BidangKajianAdmin />
    </>
  );
};

export default BidangKajianPage;