# dotenv-to-example

Generate `.env.example` files from `.env` files by removing sensitive values. Works as both a CLI tool and importable module for JavaScript and TypeScript projects.

## Installation

### Global installation (CLI usage)

```bash
npm install -g dotenv-to-example
```

### Local installation (programmatic usage)

```bash
npm install dotenv-to-example
```

## Usage

### CLI Usage

Navigate to your project directory and run:

```bash
dotenv-to-example [options]
```

#### Options:

- `-r, --recursive` - Process all `.env` files recursively without prompting
- `-h, --help` - Show help message

#### Behavior:

- If **one** `.env` file is found, it automatically creates a `.env.example` file
- If **multiple** `.env` files are found:
  - **Without `-r` flag**: Prompts you to convert all or just the one in the current directory
  - **With `-r` flag**: Automatically converts all files without prompting

#### Examples:

```bash
# Interactive mode (prompts if multiple files found)
dotenv-to-example

# Process all .env files recursively without prompting
dotenv-to-example -r

# Show help
dotenv-to-example --help
```

**Example output:**
```bash
cd /path/to/your/project
dotenv-to-example
# Output: Created: /path/to/your/project/.env.example

# With multiple files and recursive flag
dotenv-to-example -r
# Output:
# Multiple .env files found:
#  - /path/to/project/.env
#  - /path/to/project/backend/.env
# Processing all files (recursive mode)...
# Created: /path/to/project/.env.example
# Created: /path/to/project/backend/.env.example
```

### Programmatic Usage (JavaScript)

```javascript
const { createExample, findEnvFiles, createExamplesFromDirectory } = require('dotenv-to-example');

// Create .env.example from a specific .env file
createExample('/path/to/.env');

// Create .env.example silently (no console output)
createExample('/path/to/.env', { silent: true });

// Find all .env files in a directory
const envFiles = findEnvFiles('/path/to/directory');
console.log(envFiles); // ['/path/to/directory/.env', '/path/to/directory/subfolder/.env']

// Create .env.example files from all .env files in a directory
const createdFiles = createExamplesFromDirectory('/path/to/directory');
console.log(createdFiles); // ['/path/to/directory/.env.example', ...]
```

### Programmatic Usage (TypeScript)

```typescript
import { createExample, findEnvFiles, createExamplesFromDirectory, CreateExampleOptions } from 'dotenv-to-example';

// Create .env.example from a specific .env file
createExample('/path/to/.env');

// With options
const options: CreateExampleOptions = { silent: true };
createExample('/path/to/.env', options);

// Find all .env files in a directory
const envFiles: string[] = findEnvFiles('/path/to/directory');

// Create .env.example files from all .env files in a directory
const createdFiles: string[] = createExamplesFromDirectory('/path/to/directory');
```

## How It Works

Given a `.env` file like this:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=super_secret_key_12345
PORT=3000
NODE_ENV=development
```

The tool generates a `.env.example` file:

```env
DATABASE_URL=
API_KEY=
PORT=
NODE_ENV=
```

The tool:
- Preserves comments and empty lines
- Removes all values after the `=` sign
- Keeps the variable names intact

## API

### `findEnvFiles(dir: string): string[]`

Recursively finds all `.env` files in a directory.

**Parameters:**
- `dir` - Directory to search

**Returns:** Array of `.env` file paths

### `createExample(filePath: string, options?: CreateExampleOptions): string`

Creates a `.env.example` file from a `.env` file.

**Parameters:**
- `filePath` - Path to the `.env` file
- `options` - Optional configuration object
  - `silent` - If `true`, suppresses console output (default: `false`)

**Returns:** Path to the created `.env.example` file

### `createExamplesFromDirectory(dir?: string, options?: CreateExampleOptions): string[]`

Creates `.env.example` files from all `.env` files in a directory.

**Parameters:**
- `dir` - Directory to search (defaults to current working directory)
- `options` - Optional configuration object
  - `silent` - If `true`, suppresses console output (default: `false`)

**Returns:** Array of created `.env.example` file paths

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any problems, please file an issue at the GitHub repository.
