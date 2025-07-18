// C:\Indomas\app\(user)\detail-list-ormas\layout.tsx
import React from "react";

interface DetailListOrmasLayoutProps {
  children: React.ReactNode;
}

const DetailListOrmasLayout: React.FC<DetailListOrmasLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DetailListOrmasLayout;
