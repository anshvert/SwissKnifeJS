import { Path } from "../path";
import { join } from "path";
import { EnglishCharactersAndNumbers } from "./constants";
import { MockFileGenerateOptions } from "./types";
import fs from "fs"
import * as crypto from 'crypto';

/**
 * A class that provides helper function to generate test/mock files on a specified directory.
 */
class MockFileGenerator {
    filePrefix: string = "Mock"

    /**
     * Generate mock files with specified parameters
     * @param {Object} options - Configuration for file generation
     * @param dirManipulatorInstance - Directory Instance
     * @param {number} options.count - Number of files to generate
     * @param {string[]} options.extensions - File extensions to generate
     * @param {number} options.minSizeKB - Minimum file size in kilobytes
     * @param {number} options.maxSizeKB - Maximum file size in kilobytes
     * @param {string} options.filePrefix - Optional File Prefix to Add
     */
    generateFiles(options: MockFileGenerateOptions, dirManipulatorInstance: DirectoryManipulator): void {
        const outputPath: string = dirManipulatorInstance.getPath()
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        for (let i = 0; i < options.count; i ++) {
            const ext = options.extensions[Math.floor(Math.random() * options.extensions.length)];
            const fileName: string = (options.filePrefix || this.filePrefix) + Date.now() + `.${ext}`;
            const filePath: string = join(outputPath, fileName)
            const sizeKB: number = Math.floor(Math.random() * (options.maxSizeKB - options.minSizeKB + 1) + options.minSizeKB);

            const content: Buffer = MockFileGenerator.generateFileContent(ext, sizeKB)
            fs.writeFileSync(filePath, content)
            console.log(`Generated: ${fileName} (${sizeKB} KB)`);
        }
    }

    /**
     * Generate file content based on extension
     * @param {string} ext - File extension
     * @param {number} sizeKB - Desired file size in kilobytes
     * @returns {Buffer} Generated file content
     */
    static generateFileContent(ext: string, sizeKB: number): Buffer {
        const sizeBytes: number = sizeKB * 1024;
        switch (ext) {
            case 'txt':
                return MockFileGenerator.generateRandomText(sizeBytes)

            case 'wav':
                return MockFileGenerator.generateWavFile(sizeBytes)

            case 'mp3':
                return MockFileGenerator.generateMp3File(sizeBytes)

            default:
                return crypto.randomBytes(sizeBytes)
        }
    }

    /**
     * Generate random text content
     * @param {number} sizeBytes - Desired file size in bytes
     * @returns {Buffer} Text content buffer
     */
    static generateRandomText(sizeBytes: number): Buffer {
        const randomText: string = EnglishCharactersAndNumbers
        let text: string = ""

        while (Buffer.byteLength(text) < sizeBytes) {
            text += randomText.charAt(Math.floor(Math.random() * randomText.length))
        }
        return Buffer.from(text.slice(0, sizeBytes))
    }

    /**
     * Generate a basic WAV file with noise
     * @param {number} sizeBytes - Desired file size in bytes
     * @returns {Buffer} WAV file buffer
     */
    static generateWavFile(sizeBytes: number): Buffer {
        const header: Buffer = Buffer.alloc(44);
        header.write('RIFF', 0);
        header.writeUInt32LE(sizeBytes - 8, 4);
        header.write('WAVE', 8);
        header.write('fmt ', 12);
        header.writeUInt32LE(16, 16);  // Chunk size
        header.writeUInt16LE(1, 20);   // Audio format (PCM)
        header.writeUInt16LE(1, 22);   // Number of channels
        header.writeUInt32LE(44100, 24);  // Sample rate
        header.writeUInt32LE(44100 * 2, 28);  // Byte rate
        header.writeUInt16LE(2, 32);   // Block align
        header.writeUInt16LE(16, 34);  // Bits per sample
        header.write('data', 36);
        header.writeUInt32LE(sizeBytes - 44, 40);

        const noiseBuffer: Buffer = crypto.randomBytes(sizeBytes - 44);
        return Buffer.concat([header, noiseBuffer]);
    }

    /**
     * Generate a basic MP3 file with random bytes
     * @param {number} sizeBytes - Desired file size in bytes
     * @returns {Buffer} MP3 file buffer
     */
    static generateMp3File(sizeBytes: number): Buffer {
        const header: Buffer = Buffer.from([
            0xFF, 0xF3, 0x14, 0xC4,  // MP3 frame header
            0x00, 0x00, 0x00, 0x00   // Some additional metadata
        ]);

        const contentBuffer: Buffer = crypto.randomBytes(sizeBytes - header.length);
        return Buffer.concat([header, contentBuffer]);
    }
}

/**
 * A class that provides utilities for working with directories.
 */
export class DirectoryManipulator extends Path {
    constructor(path: string) {
        super(path);
    }

    /**
     * Retrieves the full path managed by this instance.
     * @returns The full path as a string.
     */
    public getPath(): string {
        return this.fullPath
    }

    /**
     * Generates mock files within the directory managed by this instance.
     * @param options - Refer MockFileGenerateOptions for managing configuration to generate files.
     */
    public generateMockFiles(options: MockFileGenerateOptions): void {
        const mockGen = new MockFileGenerator()
        mockGen.generateFiles(options, this)
    }
}


