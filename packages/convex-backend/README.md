# @shadowclips/convex-backend

Shared Convex backend for all ShadowClips apps.

## Setup

1. Install dependencies from the root:
```bash
pnpm install
```

2. Navigate to the package and run Convex dev:
```bash
cd packages/convex-backend
pnpm dev
```

3. Set environment variables in Convex:
```bash
# Generate and set Better Auth secret
pnpm dlx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)

# Set site URL
pnpm dlx convex env set SITE_URL http://localhost:3000

# Add Google OAuth credentials
pnpm dlx convex env set GOOGLE_CLIENT_ID your-google-client-id
pnpm dlx convex env set GOOGLE_CLIENT_SECRET your-google-client-secret

# Add GitHub OAuth credentials
pnpm dlx convex env set GITHUB_CLIENT_ID your-github-client-id
pnpm dlx convex env set GITHUB_CLIENT_SECRET your-github-client-secret
```

## Exports

This package exports the following for use in apps:

### Generated API
```ts
import { api } from "@shadowclips/convex-backend/api";
import { useQuery } from "convex/react";

// Use in React components
const user = useQuery(api.auth.getCurrentUser);
```

### Data Model Types
```ts
import { Doc, Id } from "@shadowclips/convex-backend/dataModel";

// Get document types
type User = Doc<"users">;
type SessionId = Id<"sessions">;
```

### Server Functions
```ts
import { query, mutation } from "@shadowclips/convex-backend/server";

// Use in new Convex functions (if you extend this package)
export const myQuery = query({
  handler: async (ctx) => {
    // ...
  }
});
```

### Auth Utilities
```ts
import { createAuth, authComponent } from "@shadowclips/convex-backend/auth";

// Server-side auth helpers
const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
```

### HTTP Router
```ts
import http from "@shadowclips/convex-backend/http";

// The HTTP router with auth routes registered
```

## Usage in Apps

### In Next.js App Router

1. **Setup Convex Provider:**
```tsx
// app/layout.tsx
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
```

2. **Use Convex Queries:**
```tsx
// components/UserProfile.tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@shadowclips/convex-backend/api";

export function UserProfile() {
  const user = useQuery(api.auth.getCurrentUser);

  if (!user) return <div>Not logged in</div>;

  return <div>Hello, {user.name}</div>;
}
```

3. **Server Actions:**
```ts
// app/actions.ts
"use server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@shadowclips/convex-backend/api";
import { getToken } from "@/lib/auth-server";

export async function updateUser(data: any) {
  const token = await getToken();
  await fetchMutation(api.users.update, data, { token });
}
```

## File Structure

```
packages/convex-backend/
├── convex/
│   ├── _generated/       # Generated types & API (auto-generated)
│   ├── auth.config.ts    # Auth provider configuration
│   ├── auth.ts           # Better Auth setup with Google/GitHub
│   ├── http.ts           # HTTP routes for auth
│   └── convex.config.ts  # Convex app configuration
├── convex.json           # Convex project configuration
├── package.json          # Package exports & scripts
└── tsconfig.json         # TypeScript configuration
```

## Adding New Functions

To add new Convex functions, create them in the `convex/` directory:

```ts
// convex/users.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const create = mutation({
  args: { name: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});
```

Then use them in your apps:
```ts
import { api } from "@shadowclips/convex-backend/api";
import { useQuery, useMutation } from "convex/react";

const users = useQuery(api.users.list);
const createUser = useMutation(api.users.create);
```
