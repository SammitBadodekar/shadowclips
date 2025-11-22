import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import facelessShortRoutes from './routes/faceless-short.routes';

const app = new Hono();

// Middleware
app.use('*', logger());

// Health check
app.get('/', (c) => {
  return c.json({
    name: 'Faceless Shorts API',
    version: '1.0.0',
    status: 'running',
    description: 'Queue-based video processing API',
    endpoints: {
      queueVideo: 'POST /faceless-short',
      checkStatus: 'GET /faceless-short/status/:workflowId',
    },
    notes: {
      processing: 'Worker processes one video at a time',
      queue: 'Uses Temporal for reliable workflow orchestration',
    },
  });
});

// Routes
app.route('/faceless-short', facelessShortRoutes);

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      error: 'Not Found',
      message: 'The requested endpoint does not exist',
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json(
    {
      error: 'Internal Server Error',
      message: err.message,
    },
    500
  );
});

const port = Number(process.env.PORT) || 8000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`
🚀 Faceless Shorts API Server started successfully!
📡 Listening on: http://localhost:${port}
📚 Documentation: http://localhost:${port}
`);

export { app };
