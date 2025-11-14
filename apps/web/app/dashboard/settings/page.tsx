import { ComingSoon } from "@/components/coming-soon";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <ComingSoon
      icon={Settings}
      title="Settings"
      description="Customize your Shadow Clips experience. Manage account preferences, notifications, and privacy settings."
    />
  );
}
