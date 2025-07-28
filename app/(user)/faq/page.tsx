// C:\Indomas\app\(user)\faq\page.tsx
import FAQ from "@/components/user/faq_component/faq";
import { Metadata } from "next";

// Page-specific metadata (should be at the top level)
export const metadata: Metadata = {
  title: "FAQ - INDOMAS",
  description: "Halaman FAQ dari Website INDOMAS",
};

const FAQPage = () => {
  return (
    <FAQ />
  );
};

export default FAQPage;