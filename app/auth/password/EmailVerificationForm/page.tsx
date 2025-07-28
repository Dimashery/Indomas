import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Email Verifikasi - INDOMAS",
  description: "Halaman Memasukkan Email Untuk Mendapatkan Kode OTP dari Website INDOMAS",
};

export default function EmailVerificationPage() {
  return <EmailVerificationForm />;
}
