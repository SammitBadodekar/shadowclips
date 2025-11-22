"use client";

import { useQuery } from "convex/react";
import { api } from "@shadowclips/convex-backend/api";
import { useSession } from "@/lib/auth-client";

export function UserInfo() {
  // Check Better Auth session
  const { data: session, isPending: sessionLoading } = useSession();

  // Query current user from Convex
  const userData = useQuery(api.users.listUsers);

  if (sessionLoading) {
    return <div>Loading session...</div>;
  }

  if (!session) {
    return (
      <div className="p-4 border rounded">
        <h3 className="font-semibold">Not Authenticated</h3>
        <p className="text-sm text-muted-foreground">
          Please sign in to see user data
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Better Auth Session</h3>
        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Convex User Data</h3>
        {userData === undefined ? (
          <p className="text-sm">Loading...</p>
        ) : (
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
