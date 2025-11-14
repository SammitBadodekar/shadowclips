import { ComingSoon } from "@/components/coming-soon";
import { Plus } from "lucide-react";

export default function CreatePage() {
  return (
    <ComingSoon
      icon={Plus}
      title="Create New Project"
      description="Start a new video project from scratch. Choose from our templates or create something unique."
    />
  );
}
