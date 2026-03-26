## Why

The project has no codebase yet. Before any feature can be implemented, the monorepo structure must be initialised and all foundational tooling configured so that both the frontend (Next.js) and backend (NestJS) can be developed, built, and run consistently across environments.

## What Changes

- Initialise a pnpm workspace monorepo managed by Turborepo
- Scaffold the `apps/web` package (Next.js 15, App Router, TypeScript, Tailwind CSS, shadcn/ui)
- Scaffold the `apps/api` package (NestJS, TypeScript, Clean Architecture folder structure)
- Add shared `packages/typescript-config` and `packages/eslint-config` packages
- Configure root-level tooling: ESLint, Prettier, TypeScript path aliases
- Configure Turborepo pipelines: `dev`, `build`, `lint`, `test`
- Add `.env.example` files for both apps
- Write a comprehensive `README.md` with setup instructions, project structure, and development workflow

## Capabilities

### New Capabilities

- `monorepo-foundation`: Monorepo structure, workspace configuration, Turborepo pipelines, shared packages, and development scripts
- `frontend-scaffold`: Next.js 15 app with TypeScript, Tailwind CSS, shadcn/ui, and Clean Architecture folder structure
- `backend-scaffold`: NestJS app with TypeScript and Clean Architecture folder structure (domain, application, infrastructure, presentation layers)

### Modified Capabilities

- `web-analysis-platform`: Add stack and project structure details to the existing spec (no requirement changes, implementation context only)

## Impact

- Creates the entire repository structure from scratch
- Establishes conventions for all future development (folder structure, naming, config)
- No existing code is modified (greenfield)
- Requires Node.js 20+, pnpm 9+
