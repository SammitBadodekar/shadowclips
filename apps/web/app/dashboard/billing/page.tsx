import { ComingSoon } from "@/components/coming-soon";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <ComingSoon
      icon={CreditCard}
      title="Billing & Payments"
      description="Manage your subscription, payment methods, and view your billing history."
    />
  );
}
