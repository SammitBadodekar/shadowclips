import { ComingSoon } from "@/components/coming-soon";
import { SplitSquareHorizontal } from "lucide-react";

export default function SplitScreenPage() {
  return (
    <ComingSoon
      icon={SplitSquareHorizontal}
      title="Split Screen"
      description="Create dynamic split-screen videos with multiple content sources. Perfect for reactions and comparisons."
    />
  );
}
