// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\data-organisasi\page.tsx
import Section1DataOrganisasiAdmin from "@/components/admin/data_organisasi_component/Section1DataOrganisasiAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Data Organisasi Admin - INDOMAS",
  description: "Halaman Verifikasi Data Organisasi di Admin dari Website INDOMAS",
};

const DataOrganisasiPage = () => {
  return (
    <>
      <Section1DataOrganisasiAdmin />
    </>
  );
};

export default DataOrganisasiPage;