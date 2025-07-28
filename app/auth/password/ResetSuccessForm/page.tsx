import ResetSuccessForm from "@/components/auth/ResetSuccessForm";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Berhasil Mengubah Password! - INDOMAS",
  description: "Selamat! Anda Berhasil Mengubah Password Anda",
};

export default function ResetSuccessPage() {
  return <ResetSuccessForm />;
}
