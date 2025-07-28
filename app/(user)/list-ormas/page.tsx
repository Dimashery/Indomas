import Section1List from "@/components/user/list_ormas_components/Section1List";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "List Organisasi Masyarakat - INDOMAS",
  description: "Halaman Detail Organisasi dari Website INDOMAS",
};

export default function OrmasPage() {
  return <Section1List />;
}
