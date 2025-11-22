/**
 * Temporal Configuration
 * Centralized configuration for Temporal connection and worker settings
 */

export interface TemporalConfig {
  serverAddress: string;
  namespace: string;
  taskQueue: string;
}

export interface WorkerConfig extends TemporalConfig {
  maxConcurrentWorkflowTaskExecutions: number;
  maxConcurrentActivityTaskExecutions: number;
  maxCachedWorkflows: number;
}

/**
 * Get Temporal connection configuration
 */
export function getTemporalConfig(): TemporalConfig {
  return {
    serverAddress: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'faceless-shorts',
  };
}

/**
 * Get Worker configuration
 * Configured to process one workflow at a time for sequential processing
 */
export function getWorkerConfig(): WorkerConfig {
  return {
    ...getTemporalConfig(),
    maxConcurrentWorkflowTaskExecutions: 1, // Process one workflow at a time
    maxConcurrentActivityTaskExecutions: 1, // Process one activity at a time
    maxCachedWorkflows: 0, // Required when maxConcurrentWorkflowTaskExecutions is 1
  };
}
