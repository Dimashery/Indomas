import React from 'react';
import Section1Login from '@/components/user/login_component/Section1Login';
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Login - INDOMAS",
  description: "Halaman Login dari Website INDOMAS",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Section1Login />
    </div>
  );
}