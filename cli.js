#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { findEnvFiles, createExample } = require('./index');

function promptUser(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function showHelp() {
    console.log(`
dotenv-to-example - Generate .env.example files from .env files

Usage:
  dotenv-to-example [options]

Options:
  -r, --recursive    Process all .env files recursively without prompting
  -h, --help         Show this help message

Examples:
  dotenv-to-example           # Interactive mode (prompts if multiple files found)
  dotenv-to-example -r        # Process all .env files without prompting
  dotenv-to-example --help    # Show this help
`);
}

(async () => {
    const args = process.argv.slice(2);
    const recursive = args.includes('-r') || args.includes('--recursive');
    const help = args.includes('-h') || args.includes('--help');

    if (help) {
        showHelp();
        return;
    }

    const cwd = process.cwd();
    const envFiles = findEnvFiles(cwd);

    if (envFiles.length === 0) {
        console.log('No .env files found.');
        return;
    }

    if (envFiles.length === 1) {
        createExample(envFiles[0]);
        return;
    }

    // Multiple files found
    console.log('Multiple .env files found:');
    envFiles.forEach(f => console.log(` - ${f}`));

    if (recursive) {
        console.log('\nProcessing all files (recursive mode)...');
        envFiles.forEach(createExample);
    } else {
        const answer = (await promptUser('\nConvert all files? (y/n): ')).toLowerCase();
        if (answer === 'y') {
            envFiles.forEach(createExample);
        } else {
            const currentDirEnv = path.join(cwd, '.env');
            if (fs.existsSync(currentDirEnv)) {
                createExample(currentDirEnv);
            } else {
                console.log('No .env file in current directory to convert.');
            }
        }
    }
})();
