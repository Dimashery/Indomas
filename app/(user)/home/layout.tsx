// D:\Project\Project Magang BAKESBANGPOL\Frontend\indomas\app\(user)\home\layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="text-white min-h-screen w-full relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
