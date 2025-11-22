# Faceless Shorts API

A production-grade API for processing faceless short videos using Temporal workflows and FFmpeg.

## 🏗️ Architecture

This project uses a queue-based architecture with Temporal for reliable workflow orchestration:

- **API Server**: Hono-based REST API that queues video processing jobs
- **Worker**: Temporal worker that processes jobs one at a time
- **Workflows**: Orchestrate multi-step video processing pipelines
- **Activities**: Individual tasks like FFmpeg processing

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── api/                    # API layer
│   │   ├── routes/            # Route handlers
│   │   │   └── faceless-short.routes.ts
│   │   └── server.ts          # Main server setup
│   ├── workflows/             # Temporal workflows
│   │   ├── faceless-short.workflow.ts
│   │   └── index.ts
│   ├── activities/            # Temporal activities
│   │   ├── video-processing.activity.ts
│   │   └── index.ts
│   ├── config/                # Configuration
│   │   └── temporal.config.ts
│   └── worker.ts              # Temporal worker
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Temporal server (running at configured address)
- FFmpeg installed on the system

### Installation

```bash
pnpm install
```

### Running the Application

1. **Start the Worker** (processes videos one at a time):
```bash
pnpm worker
# or with auto-reload:
pnpm worker.watch
```

2. **Start the API Server**:
```bash
pnpm server
# or with auto-reload:
pnpm server.watch
```

3. **Start both** (development mode):
```bash
pnpm dev
```

## 📡 API Endpoints

### Queue a Video Processing Job

```bash
POST /faceless-short
Content-Type: application/json

{
  "inputPath": "/path/to/video.mp4",
  "outputPath": "/path/to/output.mp4"
}
```

**Response** (202 Accepted):
```json
{
  "success": true,
  "workflowId": "faceless-short-abc123",
  "message": "Workflow queued successfully..."
}
```

### Check Job Status

```bash
GET /faceless-short/status/:workflowId
```

**Response** (Running):
```json
{
  "workflowId": "faceless-short-abc123",
  "status": "running",
  "message": "Workflow is currently being processed"
}
```

**Response** (Completed):
```json
{
  "workflowId": "faceless-short-abc123",
  "status": "completed",
  "result": "FFmpeg executed successfully!..."
}
```

## ⚙️ Configuration

Configuration is centralized in `src/config/temporal.config.ts`.

### Environment Variables

```bash
# Temporal Configuration
TEMPORAL_ADDRESS=31.97.202.31:7233
TEMPORAL_NAMESPACE=default
TEMPORAL_TASK_QUEUE=faceless-shorts

# Server Configuration
PORT=8000
```

## 🎯 Adding New Workflows

1. Create a new workflow file in `src/workflows/`:
```typescript
// src/workflows/my-new-workflow.workflow.ts
export async function myNewWorkflow(input: MyInput): Promise<MyOutput> {
  // workflow logic
}
```

2. Export it from `src/workflows/index.ts`:
```typescript
export * from './my-new-workflow.workflow';
```

3. Create corresponding route in `src/api/routes/`:
```typescript
// src/api/routes/my-new.routes.ts
import { myNewWorkflow } from '../../workflows';
// ... route implementation
```

4. Register the route in `src/api/server.ts`:
```typescript
import myNewRoutes from './routes/my-new.routes';
app.route('/my-new', myNewRoutes);
```

## 🎬 Adding New Activities

1. Create activity in `src/activities/`:
```typescript
// src/activities/my-activity.activity.ts
export async function myActivity(input: string): Promise<string> {
  // activity logic
}
```

2. Export from `src/activities/index.ts`:
```typescript
export * from './my-activity.activity';
```

3. Use in workflows:
```typescript
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { myActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
});
```

## 🔧 Worker Configuration

The worker is configured to process **one workflow at a time** for sequential processing:

- `maxConcurrentWorkflowTaskExecutions: 1`
- `maxConcurrentActivityTaskExecutions: 1`
- `maxCachedWorkflows: 0`

This ensures videos are processed in order without overwhelming system resources.

## 📝 Scripts

- `pnpm build` - Build TypeScript
- `pnpm worker` - Start worker
- `pnpm worker.watch` - Start worker with auto-reload
- `pnpm server` - Start API server
- `pnpm server.watch` - Start API server with auto-reload
- `pnpm dev` - Start both worker and server in watch mode
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Lint code with ESLint
