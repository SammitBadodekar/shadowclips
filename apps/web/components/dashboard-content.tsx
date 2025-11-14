"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardContent() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <h1 className="text-4xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Shadow Clips Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.name}!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-lg">{session.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Session ID:{" "}
              <span className="font-mono">{session.session.id}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
