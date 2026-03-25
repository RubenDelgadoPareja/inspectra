## ADDED Requirements

### Requirement: Monorepo workspace is initialised
The system SHALL have a pnpm workspace monorepo managed by Turborepo containing `apps/web`, `apps/api`, and `packages/` as workspace members.

#### Scenario: Developer installs dependencies
- **WHEN** a developer runs `pnpm install` at the repo root
- **THEN** all workspace dependencies are installed and linked correctly

#### Scenario: Developer runs the full stack
- **WHEN** a developer runs `pnpm dev` at the repo root
- **THEN** Turborepo starts both `apps/web` and `apps/api` in parallel in watch mode

#### Scenario: Developer builds all packages
- **WHEN** a developer runs `pnpm build` at the repo root
- **THEN** Turborepo builds all packages in dependency order

### Requirement: Shared TypeScript configuration exists
The system SHALL provide a `packages/typescript-config` package with base, Next.js, and NestJS tsconfig presets.

#### Scenario: App extends shared tsconfig
- **WHEN** `apps/web` or `apps/api` extends a shared tsconfig preset
- **THEN** TypeScript resolves all types correctly without duplication

### Requirement: Shared ESLint configuration exists
The system SHALL provide a `packages/eslint-config` package with base, Next.js, and NestJS ESLint presets.

#### Scenario: Linting runs across all workspaces
- **WHEN** a developer runs `pnpm lint` at the repo root
- **THEN** ESLint runs on all apps using the shared configuration
