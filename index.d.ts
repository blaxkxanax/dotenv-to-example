/**
 * Options for creating .env.example files
 */
export interface CreateExampleOptions {
    /**
     * If true, suppresses console output
     * @default false
     */
    silent?: boolean;
}

/**
 * Recursively finds all .env files in a directory
 * @param dir - Directory to search
 * @returns Array of .env file paths
 */
export function findEnvFiles(dir: string): string[];

/**
 * Creates a .env.example file from a .env file
 * @param filePath - Path to the .env file
 * @param options - Options object
 * @returns Path to the created .env.example file
 */
export function createExample(filePath: string, options?: CreateExampleOptions): string;

/**
 * Creates .env.example files from all .env files in a directory
 * @param dir - Directory to search (defaults to current working directory)
 * @param options - Options object
 * @returns Array of created .env.example file paths
 */
export function createExamplesFromDirectory(dir?: string, options?: CreateExampleOptions): string[];
