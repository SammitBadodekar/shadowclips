import { ComingSoon } from "@/components/coming-soon";
import { MessageSquare } from "lucide-react";

export default function FakeTextsPage() {
  return (
    <ComingSoon
      icon={MessageSquare}
      title="Fake Texts"
      description="Generate realistic text message conversations for your videos. Customize colors, timestamps, and message styles."
    />
  );
}
