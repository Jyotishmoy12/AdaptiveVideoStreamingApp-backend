import fs from "fs";
import ffmpeg from "ffmpeg";
import resolution from "../utils/constants/resolution.constants";

/**
 * Process a video file for HLS streaming.
 *
 * @param {string} inputPath - The path to the input video file.
 * @param {string} outputPath - The path to the output folder where the HLS stream files will be saved.
 * @param {function} callback - A callback function that will be called when the processing is complete.
 * The callback function takes two parameters: an error object (null if no error occurred) and the path to the master playlist file (null if an error occurred).
 */
export const processVideoForHLS = (
  inputPath: string,
  outputPath: string,
  callback: (error: Error | null, masterPlaylist?: string) => void
): void => {
  fs.mkdirSync(outputPath, { recursive: true });

  const masterPlaylist = `${outputPath}/master.m3u8`; // Output path for the master playlist file which ends with .m3u8

  const masterContent: string[] = [];

  resolution.forEach((resolution) => {
    // Create a playlist file for each resolution for example 1080p.m3u8
    const variantOutput = `${outputPath}/${resolution.height}p`;
    const variantPlaylist = `${variantOutput}.m3u8`;
    fs.mkdirSync(variantOutput, { recursive: true });

    const process = new ffmpeg(inputPath);

    process.then((video: any) => {
      video
        // Video scaling filter
        .addCommand("-vf", `scale=w=${resolution.width}:h=${resolution.height}`)
        // Video bitrate
        .addCommand("-b:v", `${resolution.bitRate}k`)
        // Video codec
        .addCommand("-codec:v", "libx264")
        // Audio codec
        .addCommand("-codec:a", "aac")
        // HLS segment duration
        .addCommand("-hls_time", "10")
        // HLS playlist type
        .addCommand("-hls_playlist_type", "vod")
        // HLS segment filename pattern
        .addCommand("-hls_segment_filename", `${variantOutput}/segment%03d.ts`)
        // Output format
        .addCommand("-f", "hls")
        .on("end", () => {
            
        });
    });
  });
};
