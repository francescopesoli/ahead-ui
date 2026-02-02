# Contributing to Ahead UI

Thank you for your interest in contributing to Ahead UI! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ahead-ui.git
   cd ahead-ui
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development environment:
   ```bash
   pnpm dev
   ```

## Project Structure

```
ahead-ui/
├── packages/
│   ├── core/           # Core utilities and theme
│   ├── components/     # UI components
│   └── docs/           # Documentation (Storybook)
├── apps/               # Example applications
└── ...
```

## Development Workflow

### Creating a New Component

1. Create a new directory in `packages/components/src/[component-name]/`
2. Create the component file: `index.tsx`
3. Follow the existing patterns:
   - Use `'use client'` directive at the top
   - Use CVA (class-variance-authority) for styling variants
   - Use React Aria hooks for accessibility when appropriate
   - Export types and variants
4. Add the export to `packages/components/src/index.ts`
5. Add the entry point to `packages/components/tsup.config.ts`
6. Add the export path to `packages/components/package.json`

### Component Guidelines

- **Accessibility**: All components must be keyboard accessible and work with screen readers
- **Styling**: Use CSS variables for theming (e.g., `var(--primary)`, `var(--border)`)
- **TypeScript**: Provide comprehensive type definitions
- **Documentation**: Include JSDoc comments with examples

### Running Tests

```bash
pnpm test
```

### Running Storybook

```bash
pnpm storybook
```

### Building

```bash
pnpm build
```

### Type Checking

```bash
pnpm typecheck
```

## Commit Guidelines

We follow conventional commits. Format your commit messages as:

```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(button): add loading state variant
fix(select): correct keyboard navigation
docs(readme): update installation instructions
```

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit them following the commit guidelines

3. Ensure all checks pass:
   ```bash
   pnpm build
   pnpm typecheck
   pnpm test
   ```

4. Push your branch and open a Pull Request

5. Fill out the PR template with:
   - Description of changes
   - Related issues
   - Testing instructions
   - Screenshots (if applicable)

6. Wait for review and address any feedback

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Node version)
- Screenshots or code examples if applicable

## Feature Requests

Feature requests are welcome! Please:

1. Check if the feature has already been requested
2. Provide a clear use case
3. Describe the expected behavior
4. Consider if this could be a breaking change

## Questions?

If you have questions, feel free to:

- Open a GitHub Discussion
- Check existing issues and discussions
- Review the documentation

## License

By contributing to Ahead UI, you agree that your contributions will be licensed under the MIT License.
