// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\detail-data-organisasi\edit\[id]\page.tsx

import Section1DetailDataOrganisasi from "@/components/admin/detail_data_organisasi_component/detail/Section1DetailDataOrganisasi";
import Section2DetailDataOrganisasi from "@/components/admin/detail_data_organisasi_component/detail/Section2DetailDataOrganisasi";


interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage = ({ params }: DetailPageProps) => {
  return (

    <div>
      <Section1DetailDataOrganisasi id={params.id} />
      <Section2DetailDataOrganisasi id={params.id} />
    </div>

  );
};

export default DetailPage;