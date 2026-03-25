## ADDED Requirements

### Requirement: NestJS app is scaffolded with Clean Architecture structure
The system SHALL have an `apps/api` package with NestJS, TypeScript, and a Clean Architecture folder structure across four layers.

#### Scenario: Developer starts the backend
- **WHEN** a developer runs `pnpm dev` inside `apps/api`
- **THEN** NestJS starts on port 3001 and the health check endpoint responds with 200

#### Scenario: Clean Architecture folders exist
- **WHEN** a developer inspects `apps/api/src/`
- **THEN** they find `domain/`, `application/`, `infrastructure/`, and `presentation/` directories

### Requirement: Health check endpoint exists
The system SHALL expose a `GET /health` endpoint that returns the API status.

#### Scenario: Health check responds
- **WHEN** a client sends `GET /health`
- **THEN** the API responds with `{ status: "ok" }` and HTTP 200

### Requirement: Environment variables are documented
The system SHALL have an `apps/api/.env.example` file listing all required backend environment variables.

#### Scenario: Developer sets up environment
- **WHEN** a developer copies `.env.example` to `.env`
- **THEN** the API starts without missing environment variable errors
