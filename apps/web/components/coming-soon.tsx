import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ComingSoon({ icon: Icon, title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
          {/* Animated SVG Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-full p-8 shadow-lg">
              <Icon className="w-16 h-16 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              {description}
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Decorative SVG Elements */}
          <svg
            className="absolute top-4 right-4 w-16 h-16 text-muted-foreground/10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-spin"
              style={{ animationDuration: "20s" }}
            />
          </svg>
          <svg
            className="absolute bottom-4 left-4 w-12 h-12 text-muted-foreground/10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />
          </svg>
        </CardContent>
      </Card>
    </div>
  );
}
