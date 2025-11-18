#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { findEnvFiles, createExample } = require('./index');

function promptUser(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

(async () => {
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

    console.log('Multiple .env files found:');
    envFiles.forEach(f => console.log(` - ${f}`));

    const answer = (await promptUser('Convert all files? (y/n): ')).toLowerCase();
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
})();
