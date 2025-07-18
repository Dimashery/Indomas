import React from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

interface BeritaLayoutProps {
  children: React.ReactNode;
}

const BeritaLayout: React.FC<BeritaLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default BeritaLayout;
