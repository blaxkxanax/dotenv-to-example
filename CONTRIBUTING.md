# Contributing to dotenv-to-example

Thanks for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/blaxkxanax/dotenv-to-example.git
   cd dotenv-to-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Test the CLI locally:
   ```bash
   npm link
   dotenv-to-example
   ```

## Project Structure

```
dotenv-to-example/
├── index.js          # Main library with exportable functions
├── cli.js            # CLI interface
├── index.d.ts        # TypeScript type definitions
├── package.json      # Package configuration
└── .github/
    └── workflows/
        ├── ci.yml       # Continuous integration
        └── publish.yml  # Auto-publish to npm
```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   # Test as CLI
   npm link
   dotenv-to-example

   # Test as library
   node -e "const {createExample} = require('./index.js'); console.log('OK')"
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

## CI/CD Pipeline

This project uses GitHub Actions:

- **CI Workflow**: Runs on all pushes and pull requests
  - Tests on Node.js 14, 16, 18, 20
  - Validates syntax
  - Verifies package can be built

- **Publish Workflow**: Runs when a GitHub release is created
  - Automatically publishes to npm

## Releasing New Versions

Only maintainers can publish. The process:

1. Update version:
   ```bash
   npm version patch|minor|major
   ```

2. Push with tags:
   ```bash
   git push && git push --tags
   ```

3. Create GitHub release - this triggers automatic npm publish

## Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add JSDoc comments for public functions
- Keep functions focused and single-purpose

## Reporting Issues

- Use GitHub Issues
- Provide clear description
- Include reproduction steps
- Mention Node.js version

## Questions?

Open an issue or discussion on GitHub!
