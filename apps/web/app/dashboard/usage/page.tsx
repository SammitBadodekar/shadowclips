import { ComingSoon } from "@/components/coming-soon";
import { BarChart3 } from "lucide-react";

export default function UsagePage() {
  return (
    <ComingSoon
      icon={BarChart3}
      title="Usage Statistics"
      description="Track your video creation metrics, credits usage, and performance analytics in one place."
    />
  );
}
