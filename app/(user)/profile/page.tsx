// C:\Indomas\app\(user)\profile\page.tsx
import React from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Section1Profile from "@/components/user/profile/Section1Profile";
import Section2Profile from "@/components/user/profile/Section2Profile";
import Section3Profile from "@/components/user/profile/Section3Profile";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Section1Profile />
      <Section2Profile />
      <Section3Profile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
