// C:\Indomas\app\(user)\profile\layout.tsx
import React from "react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return <div className=" bg-gray-50">{children}</div>;
};

export default ProfileLayout;
