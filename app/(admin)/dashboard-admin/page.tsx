// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\dashboard\page.tsx
import Section1DashboardAdmin from "@/components/admin/dashboard_component/Section1DashboardAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Dashboard Admin - INDOMAS",
  description: "Selamat Datang di CMS Admin Indomas",
};

const DashboardPage = () => {
  return (
    <>
      <Section1DashboardAdmin />
    </>
  );
};

export default DashboardPage;