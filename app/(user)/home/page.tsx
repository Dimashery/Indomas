// D:\Project\Project Magang BAKESBANGPOL\Frontend\indomas\app\(user)\home\page.tsx
import Section1Home from "@/components/user/home_component/Section1Home";
import Section2Home from "@/components/user/home_component/Section2Home";
import Section3Home from "@/components/user/home_component/Section3Home";
import Section4Home from "@/components/user/home_component/Section4Home";
import { Metadata } from "next";

// Page-specific metadata (will merge with layout metadata)
export const metadata: Metadata = {
  title: "Home - INDOMAS",
  description: "Halaman Utama User dari Website INDOMAS",
};

const DashboardPage = () => {
  return (
    <>
      <Section1Home />
      <Section2Home />
      <Section3Home />
      <Section4Home />
    </>
  );
};

export default DashboardPage;