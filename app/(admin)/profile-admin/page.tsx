// D:\Project\Project Magang BAKESBANGPOL\Frontend\admin\Indomas\app\(admin)\profile-admin\page.tsx
import Section1ProfileAdmin from "@/components/admin/profile_admin_component/Section1ProfileAdmin";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Profile Admin - INDOMAS",
  description: "Halaman Profile di Admin dari Website INDOMAS",
};

const ProfileAdminPage = () => {
  return (
    <>
      <Section1ProfileAdmin />
    </>
  );
};

export default ProfileAdminPage;