# @shadowclips/database

Database package for ShadowClips using Drizzle ORM and PostgreSQL.

## Setup

1. Make sure you have PostgreSQL installed and running
2. Copy `.env.example` to `.env` and update the `DATABASE_URL`
3. Generate the database schema:

```bash
pnpm db:generate
```

4. Run migrations:

```bash
pnpm db:migrate
```

## Scripts

- `db:generate` - Generate Drizzle migrations from schema
- `db:migrate` - Run migrations
- `db:push` - Push schema changes to database (dev only)
- `db:studio` - Open Drizzle Studio to view/edit data

## Schema

This package includes the Better Auth required tables:
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

## Usage

```typescript
import { db } from "@shadowclips/database";
import { user } from "@shadowclips/database/schema";

// Use the db instance in your app
const users = await db.select().from(user);
```
