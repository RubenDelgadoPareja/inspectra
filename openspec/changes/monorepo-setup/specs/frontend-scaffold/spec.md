## ADDED Requirements

### Requirement: Next.js app is scaffolded with Clean Architecture structure
The system SHALL have an `apps/web` package with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and a Clean Architecture folder structure.

#### Scenario: Developer starts the frontend
- **WHEN** a developer runs `pnpm dev` inside `apps/web`
- **THEN** Next.js starts on port 3000 and serves the home page

#### Scenario: Clean Architecture folders exist
- **WHEN** a developer inspects `apps/web/src/`
- **THEN** they find `domain/`, `application/`, `infrastructure/`, and `presentation/` directories

### Requirement: Tailwind CSS and shadcn/ui are configured
The system SHALL have Tailwind CSS and shadcn/ui initialised and ready to use in `apps/web`.

#### Scenario: shadcn/ui component is available
- **WHEN** a developer uses a shadcn/ui component (e.g., Button)
- **THEN** it renders correctly with Tailwind styles applied

### Requirement: Environment variables are documented
The system SHALL have an `apps/web/.env.example` file listing all required frontend environment variables.

#### Scenario: Developer sets up environment
- **WHEN** a developer copies `.env.example` to `.env.local`
- **THEN** the app starts without missing environment variable errors
