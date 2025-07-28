import React from 'react';
import Section1Signup from '@/components/user/signup_components/Section1Signup';
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Buat Akun - INDOMAS",
  description: "Halaman Buat Akun Organisasi dari Website INDOMAS",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <Section1Signup />
    </div>
  );
}