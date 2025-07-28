import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Verifikasi OTP - INDOMAS",
  description: "Halaman Verifikasi OTP Untuk Mengubah Password dari Website INDOMAS",
};

export default function OTPVerificationPage() {
  return <OTPVerificationForm />;
}
