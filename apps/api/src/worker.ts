import 'dotenv/config';
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { getWorkerConfig } from './config/temporal.config';

/**
 * Temporal Worker
 * Processes workflows from the task queue
 * Configured to process one workflow at a time for sequential processing
 */
async function run() {
  const config = getWorkerConfig();

  console.log('🔧 Connecting to Temporal server...');
  console.log(`   Server: ${config.serverAddress}`);
  console.log(`   Namespace: ${config.namespace}`);
  console.log(`   Task Queue: ${config.taskQueue}`);

  // Step 1: Establish a connection with Temporal server
  const connection = await NativeConnection.connect({
    address: config.serverAddress,
  });

  try {
    console.log('✅ Connected to Temporal server');

    // Step 2: Register Workflows and Activities with the Worker
    const worker = await Worker.create({
      connection,
      namespace: config.namespace,
      taskQueue: config.taskQueue,
      // Workflows are registered using a path as they run in a separate JS context
      workflowsPath: require.resolve('./workflows'),
      activities,
      // Process one workflow at a time
      maxConcurrentWorkflowTaskExecutions:
        config.maxConcurrentWorkflowTaskExecutions,
      maxConcurrentActivityTaskExecutions:
        config.maxConcurrentActivityTaskExecutions,
      maxCachedWorkflows: config.maxCachedWorkflows,
    });

    console.log('✅ Worker created successfully');
    console.log(`⚙️  Processing mode: One workflow at a time`);
    console.log(`🎬 Registered workflows: facelessShortWorkflow`);
    console.log(`🎯 Registered activities: processVideoWithFfmpeg`);
    console.log('');
    console.log('👷 Worker is ready and waiting for tasks...');
    console.log('');

    // Step 3: Start accepting tasks from the queue
    await worker.run();
  } finally {
    // Close the connection once the worker has stopped
    await connection.close();
    console.log('Worker connection closed');
  }
}

run().catch((err) => {
  console.error('❌ Worker failed to start:', err);
  process.exit(1);
});
