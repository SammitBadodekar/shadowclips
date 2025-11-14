import { ComingSoon } from "@/components/coming-soon";
import { HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <ComingSoon
      icon={HelpCircle}
      title="Support Center"
      description="Get help with Shadow Clips. Browse FAQs, contact support, and access our knowledge base."
    />
  );
}
