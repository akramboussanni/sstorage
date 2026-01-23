import { spawn } from 'child_process';
import { unlink, rename, stat } from 'fs/promises';
import { join } from 'path';
import { prisma } from './db';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

/**
 * Compression quality levels with corresponding CRF values.
 * Lower CRF = higher quality but larger file size.
 */
export type CompressionQuality = 'none' | 'high' | 'balanced' | 'small';

const CRF_VALUES: Record<Exclude<CompressionQuality, 'none'>, number> = {
    high: 18,      // Near-lossless, ~20-30% compression
    balanced: 23,  // Good quality, ~40-60% compression
    small: 28,     // Noticeable compression, ~60-80% compression
};

/**
 * Transcodes a video file to be Discord-mobile compatible.
 * Uses H.264 baseline profile with faststart for optimal compatibility.
 */
export async function transcodeVideo(
    mediaId: string,
    filename: string,
    quality: CompressionQuality = 'balanced'
): Promise<void> {
    const inputPath = join(UPLOAD_DIR, filename);
    const outputFilename = `${mediaId}_transcoded.mp4`;
    const outputPath = join(UPLOAD_DIR, outputFilename);

    try {
        // Update status to processing
        await prisma.media.update({
            where: { id: mediaId },
            data: { transcodeStatus: 'processing' },
        });

        // Run ffmpeg with Discord-compatible settings
        await runFfmpeg(inputPath, outputPath, quality);

        // Get new file size
        const stats = await stat(outputPath);

        // Delete original file
        await unlink(inputPath);

        // Rename transcoded file to original filename (but always .mp4)
        const finalFilename = `${mediaId}.mp4`;
        const finalPath = join(UPLOAD_DIR, finalFilename);
        await rename(outputPath, finalPath);

        // Update database with success
        await prisma.media.update({
            where: { id: mediaId },
            data: {
                transcodeStatus: 'completed',
                filename: finalFilename,
                mimeType: 'video/mp4',
                size: stats.size,
            },
        });

        console.log(`[Transcode] Successfully transcoded ${mediaId} with quality=${quality}`);
    } catch (error) {
        console.error(`[Transcode] Failed for ${mediaId}:`, error);

        // Clean up temp file if it exists
        try {
            await unlink(outputPath);
        } catch { }

        // Update database with error
        await prisma.media.update({
            where: { id: mediaId },
            data: {
                transcodeStatus: 'failed',
                transcodeError: error instanceof Error ? error.message : 'Unknown error',
            },
        });
    }
}

/**
 * Runs ffmpeg with Discord-mobile compatible settings.
 * - baseline profile + yuv420p → mobile compatible
 * - faststart → video loads before full download
 * - -g 48 → frequent keyframes (seeking + previews work)
 * - CRF → quality/compression balance
 */
function runFfmpeg(
    inputPath: string,
    outputPath: string,
    quality: CompressionQuality
): Promise<void> {
    return new Promise((resolve, reject) => {
        const crf = quality === 'none' ? 0 : CRF_VALUES[quality];

        const args = [
            '-i', inputPath,
            '-c:v', 'libx264',
            '-profile:v', 'baseline',
            '-level', '3.1',
            '-pix_fmt', 'yuv420p',
            '-crf', crf.toString(),
            '-preset', quality === 'none' ? 'ultrafast' : 'medium', // Faster for lossless
            '-movflags', '+faststart',
            '-g', '48',
            '-keyint_min', '48',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-y', // Overwrite output file
            outputPath,
        ];

        console.log(`[Transcode] Running: ffmpeg ${args.join(' ')}`);

        const ffmpeg = spawn('ffmpeg', args);

        let stderr = '';

        ffmpeg.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ffmpeg.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-500)}`));
            }
        });

        ffmpeg.on('error', (err) => {
            reject(new Error(`Failed to start ffmpeg: ${err.message}. Is ffmpeg installed?`));
        });
    });
}

/**
 * Starts transcoding in the background (non-blocking).
 * Returns immediately while transcoding continues.
 */
export function startTranscodeInBackground(
    mediaId: string,
    filename: string,
    quality: CompressionQuality = 'balanced'
): void {
    // Use setImmediate to ensure this runs after the current event loop
    setImmediate(() => {
        transcodeVideo(mediaId, filename, quality).catch((err) => {
            console.error(`[Transcode] Background transcode failed for ${mediaId}:`, err);
        });
    });
}
