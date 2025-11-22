import { Hono } from 'hono';
import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { facelessShortWorkflow } from '../../workflows';
import { getTemporalConfig } from '../../config/temporal.config';

const router = new Hono();

/**
 * POST /faceless-short
 * Queue a new faceless short video processing workflow
 */
router.post('/', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const { inputPath, outputPath } = body;

    // Connect to Temporal
    const config = getTemporalConfig();
    const connection = await Connection.connect({
      address: config.serverAddress,
    });

    const client = new Client({
      connection,
      namespace: config.namespace,
    });

    // Generate workflow ID
    const workflowId = 'faceless-short-' + nanoid();

    // Start the workflow (queue it) without waiting for result
    const handle = await client.workflow.start(facelessShortWorkflow, {
      taskQueue: config.taskQueue,
      args: [{ inputPath, outputPath }] as any,
      workflowId: workflowId,
    });

    console.log(`Queued workflow ${handle.workflowId}`);

    // Return immediately with workflow ID
    return c.json(
      {
        success: true,
        workflowId: handle.workflowId,
        message: 'Workflow queued successfully. Use /faceless-short/status/:workflowId to check status.',
      },
      202,
    ); // 202 Accepted
  } catch (error) {
    console.error('Error queueing faceless short:', error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

/**
 * GET /faceless-short/status/:workflowId
 * Check the status of a workflow
 */
router.get('/status/:workflowId', async (c) => {
  try {
    const workflowId = c.req.param('workflowId');

    // Connect to Temporal
    const config = getTemporalConfig();
    const connection = await Connection.connect({
      address: config.serverAddress,
    });

    const client = new Client({
      connection,
      namespace: config.namespace,
    });

    // Get workflow handle
    const handle = client.workflow.getHandle(workflowId);

    // Check if workflow is running
    const description = await handle.describe();

    if (description.status.name === 'RUNNING') {
      return c.json({
        workflowId,
        status: 'running',
        message: 'Workflow is currently being processed',
      });
    } else if (description.status.name === 'COMPLETED') {
      // Get the result
      const result = await handle.result();
      return c.json({
        workflowId,
        status: 'completed',
        result: result,
      });
    } else if (description.status.name === 'FAILED') {
      return c.json(
        {
          workflowId,
          status: 'failed',
          message: 'Workflow failed',
        },
        500,
      );
    } else {
      return c.json({
        workflowId,
        status: description.status.name.toLowerCase(),
      });
    }
  } catch (error) {
    console.error('Error checking workflow status:', error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      500,
    );
  }
});

export default router;
