// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\faq-admin\page.tsx
import Section1FAQAdmin from "@/components/admin/faq_admin_component/Section1FAQAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "FAQ Admin - INDOMAS",
  description: "Halaman FAQ di Admin dari Website INDOMAS",
};

const FAQAdminPage = () => {
  return (
    <>
      <Section1FAQAdmin />
    </>
  );
};

export default FAQAdminPage;