import { ComingSoon } from "@/components/coming-soon";
import { Video } from "lucide-react";

export default function FacelessVideoPage() {
  return (
    <ComingSoon
      icon={Video}
      title="Faceless Video"
      description="Create professional faceless videos with AI-generated voiceovers and stunning visuals for longer-form content."
    />
  );
}
