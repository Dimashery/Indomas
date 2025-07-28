// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\detail-data-organisasi\edit\[id]\page.tsx
import Section1DetailDataOrganisasiEdit from "@/components/admin/detail_data_organisasi_component/edit/Section1DetailDataOrganisasiEdit";
import Section2DetailDataOrganisasiEdit from "@/components/admin/detail_data_organisasi_component/edit/Section2DetailDataOrganisasiEdit";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Edit Data Organisasi Admin - INDOMAS",
  description: "Halaman Edit Data Organisasi di Admin dari Website INDOMAS",
};

interface EditPageProps {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: EditPageProps) => {
  return (

    <div>
      <Section1DetailDataOrganisasiEdit id={params.id} />
      <Section2DetailDataOrganisasiEdit id={params.id} />
    </div>

  );
};

export default EditPage;