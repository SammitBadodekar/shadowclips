import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { processVideoWithFfmpeg } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1s',
    maximumInterval: '30s',
  },
});

export interface FacelessShortInput {
  inputPath?: string;
  outputPath?: string;
}

/**
 * Workflow for processing faceless short videos
 * This workflow orchestrates the video processing pipeline
 */
export async function facelessShortWorkflow(
  input: FacelessShortInput
): Promise<string> {
  // Step 1: Process video with ffmpeg
  const result = await processVideoWithFfmpeg(input.inputPath);

  return result;
}
