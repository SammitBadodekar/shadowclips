# Deployment Guide

## Deploying to Vercel

### Prerequisites

1. **Convex Deployment**: Deploy your Convex backend first
2. **Environment Variables**: Set up all required env vars in Vercel

### Step 1: Deploy Convex Backend

```bash
cd packages/convex-backend

# Deploy to production
pnpm dlx convex deploy --cmd 'echo Deployed'

# Note the production deployment URL
# It will look like: https://your-project.convex.cloud
```

### Step 2: Set Environment Variables in Convex (Production)

```bash
cd packages/convex-backend

# Set production environment variables
pnpm dlx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32) --prod
pnpm dlx convex env set SITE_URL https://your-domain.vercel.app --prod
pnpm dlx convex env set GOOGLE_CLIENT_ID your-google-client-id --prod
pnpm dlx convex env set GOOGLE_CLIENT_SECRET your-google-client-secret --prod
pnpm dlx convex env set GITHUB_CLIENT_ID your-github-client-id --prod
pnpm dlx convex env set GITHUB_CLIENT_SECRET your-github-client-secret --prod
```

### Step 3: Configure Vercel Project

1. Import your repository to Vercel
2. Set the **Root Directory** to `apps/web`
3. **Framework Preset**: Next.js
4. **Build Command**: Leave default or use `pnpm build`
5. **Install Command**: `pnpm install`

### Step 4: Set Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

```bash
# Convex (from your production deployment)
CONVEX_DEPLOYMENT=prod:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site

# Site URL
SITE_URL=https://your-domain.vercel.app
```

**Important**: Do NOT set OAuth secrets in Vercel - they're already in Convex.

### Step 5: Deploy

Push to your main branch or trigger a manual deployment.

## Troubleshooting

### Build fails with "Module not found: @shadowclips/convex-backend"

**Solution**: Make sure Vercel is building from the repository root with access to the monorepo:

1. Check that `pnpm-workspace.yaml` is at the root
2. Ensure `node_modules` for the backend package exists
3. Verify the build command includes the workspace

### Build fails with "convex/_generated not found"

**Solution**: The generated files must be committed to git:

```bash
# Ensure .gitignore doesn't exclude them
cd packages/convex-backend
cat .gitignore  # Should NOT have convex/_generated/

# Commit if missing
git add convex/_generated/
git commit -m "Add Convex generated files for deployment"
```

### OAuth redirect URLs

Update your OAuth app settings:

**Google Cloud Console**:
- Authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`

**GitHub OAuth App**:
- Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`

## Monorepo Structure

```
shadowclips/
├── apps/
│   └── web/                    ← Vercel deploys this
├── packages/
│   └── convex-backend/         ← Must be available during build
├── pnpm-workspace.yaml         ← Required for workspace resolution
└── vercel.json                 ← Monorepo build config
```

## Local Development vs Production

| Environment | Convex | Database |
|-------------|--------|----------|
| **Local** | Dev deployment | Dev data |
| **Production** | Prod deployment | Prod data |

They are completely separate - test users won't appear in production.
