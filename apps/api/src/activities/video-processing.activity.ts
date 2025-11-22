import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

/**
 * Activity: Process video with FFmpeg
 *
 * @param inputPath - Optional path to the input video file
 * @returns Result message with FFmpeg execution details
 */
export async function processVideoWithFfmpeg(
  inputPath?: string
): Promise<string> {
  try {
    // Sample ffmpeg command - get ffmpeg version and info
    const { stdout, stderr } = await execAsync('ffmpeg -version');

    console.log('FFmpeg version check:', stdout);

    // You can also use fluent-ffmpeg for more complex operations
    // Example for future video processing:
    // if (inputPath) {
    //   return new Promise((resolve, reject) => {
    //     ffmpeg(inputPath)
    //       .output(outputPath)
    //       .on('end', () => resolve('Processing complete'))
    //       .on('error', (err) => reject(err))
    //       .run();
    //   });
    // }

    return `FFmpeg executed successfully!\n${stdout.split('\n')[0]}`;
  } catch (error) {
    console.error('FFmpeg error:', error);
    throw new Error(`Failed to execute ffmpeg: ${error}`);
  }
}
