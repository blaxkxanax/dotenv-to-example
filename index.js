const fs = require('fs');
const path = require('path');

/**
 * Recursively finds all .env files in a directory
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of .env file paths
 */
function findEnvFiles(dir) {
    let envFiles = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            envFiles = envFiles.concat(findEnvFiles(fullPath));
        } else if (item.isFile() && item.name === '.env') {
            envFiles.push(fullPath);
        }
    }

    return envFiles;
}

/**
 * Creates a .env.example file from a .env file
 * @param {string} filePath - Path to the .env file
 * @param {Object} options - Options object
 * @param {boolean} options.silent - If true, suppresses console output
 * @returns {string} Path to the created .env.example file
 */
function createExample(filePath, options = {}) {
    const { silent = false } = options;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(line => {
        if (!line.includes('=')) return line;
        const index = line.indexOf('=');
        return line.slice(0, index + 1);
    });

    const examplePath = path.join(path.dirname(filePath), '.env.example');
    fs.writeFileSync(examplePath, lines.join('\n'));

    if (!silent) {
        console.log(`Created: ${examplePath}`);
    }

    return examplePath;
}

/**
 * Creates .env.example files from all .env files in a directory
 * @param {string} dir - Directory to search (defaults to current working directory)
 * @param {Object} options - Options object
 * @param {boolean} options.silent - If true, suppresses console output
 * @returns {string[]} Array of created .env.example file paths
 */
function createExamplesFromDirectory(dir = process.cwd(), options = {}) {
    const envFiles = findEnvFiles(dir);
    return envFiles.map(file => createExample(file, options));
}

module.exports = {
    findEnvFiles,
    createExample,
    createExamplesFromDirectory
};
