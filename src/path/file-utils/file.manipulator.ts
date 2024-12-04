import { Path } from "../path";
import { resolve } from "path"
import fs from "fs";
import ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg'
import ffmpegPath from "ffmpeg-static";
import path from "node:path";
import { promisify } from "node:util";

type convertAudioOptions = {
    audioChannels?: number,
    audioFrequency?: number,
    audioCodec?: string,
    format: string,
}

ffmpeg.setFfmpegPath(<string>ffmpegPath)

class FileManipulator extends Path {
    private options: convertAudioOptions;

    constructor(path: string, defaultOptions: convertAudioOptions = {}) {
        super(resolve(path));
        this.options = { format: 'mp3', ...defaultOptions }; // Default options
    }

    private async convertFile(inputPath: string, options: convertAudioOptions, outputPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let command = ffmpeg(inputPath)
                .on('progress', (progress) => {
                    console.log(`Progress: ${progress.percent?.toFixed(2)}%`);
                })
                .on('error', (err) => {
                    console.error(`Error converting file: ${err.message}`);
                    reject(err);
                })
                .on('end', resolve);

            if (options.audioChannels) command = command.audioChannels(options.audioChannels);
            if (options.audioFrequency) command = command.audioFrequency(options.audioFrequency);
            if (options.audioCodec) command = command.audioCodec(options.audioCodec);

            command.format(options.format).save(outputPath);
        });
    }

    public async convert(inputPath: string = this.getPath(), outputPath: string, options: convertAudioOptions = {}) {
        const mergedOptions = { ...this.options, ...options };
        await this.convertFile(inputPath, mergedOptions, outputPath);
    }

    public async convertDirectory(inputDir: string, outputDir: string, options: convertAudioOptions = {}) {
        const files = await fs.promises.readdir(inputDir);
        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + `.${options.format}`);
            await this.convert(inputPath, outputPath, options);
        }
    }
}


const fileInstance = new FileManipulator("./temp/temp.wav")

fileInstance.convert(fileInstance.getPath(),"./temp/temp.wav",{
    format: "mp3",
    audioChannels: 2,
    audioCodec: 'libmp3lame'
})

