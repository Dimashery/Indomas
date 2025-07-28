import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "Password Baru - INDOMAS",
  description: "Halaman Mengganti Password Baru dari Website INDOMAS",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
