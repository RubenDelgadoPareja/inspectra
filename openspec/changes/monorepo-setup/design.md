## Context

The project starts from zero. There is no existing codebase, only a spec and a README. The first engineering decision is how to structure the repository so that a Next.js frontend and a NestJS backend can coexist, share configuration, and be developed and deployed independently without friction.

The chosen methodology is Clean Architecture. Every structural decision must reflect this: code is organised by domain boundaries and layer responsibilities, not by file type.

## Goals / Non-Goals

**Goals:**
- Single repository managing both apps with isolated builds
- Shared TypeScript and ESLint configuration to ensure consistency
- Clear, opinionated folder structure for Clean Architecture in both apps
- Developer experience: one command to run the full stack locally (`pnpm dev`)
- README that lets any developer onboard in under 5 minutes

**Non-Goals:**
- CI/CD pipelines (separate change)
- Docker / containerisation (separate change)
- Database setup or migrations (separate change)
- Authentication implementation (separate change)
- Any application feature or UI component

## Decisions

### D1: pnpm workspaces + Turborepo over Nx

**Decision:** Use pnpm workspaces for package management and Turborepo for build orchestration.

**Rationale:** Nx is more powerful but has a steeper learning curve and enforces its own conventions that can conflict with Clean Architecture folder structures. Turborepo is simpler, faster to set up, and does not impose structural constraints. pnpm is faster than npm/yarn and has first-class workspace support.

**Alternatives considered:** Nx (rejected — too opinionated), Yarn workspaces (rejected — slower, less ergonomic), Lerna (rejected — deprecated pattern).

---

### D2: Clean Architecture folder structure enforced from day one

**Decision:** Both `apps/web` and `apps/api` use a strict four-layer folder structure from the start.

```
src/
├── domain/          # Entities, value objects, repository interfaces
├── application/     # Use cases, DTOs, ports
├── infrastructure/  # DB, external APIs, framework adapters
└── presentation/    # Controllers, pages, components
```

**Rationale:** Retrofitting Clean Architecture is painful. Starting with it enforces good habits and makes the codebase immediately readable to senior engineers.

---

### D3: Shared packages for config only (no shared business logic yet)

**Decision:** Create `packages/typescript-config` and `packages/eslint-config`. No shared domain or UI packages at this stage.

**Rationale:** Shared business logic between frontend and backend is premature at this stage and often leads to tight coupling. Config sharing is safe and immediately valuable.

---

### D4: shadcn/ui as the component library

**Decision:** Use shadcn/ui over alternatives like MUI or Chakra.

**Rationale:** shadcn/ui components are copied into the project (not installed as a dependency), making them fully customisable. They are built on Radix UI primitives (accessible) and work natively with Tailwind CSS. Ideal for a portfolio project that needs to look polished without vendor lock-in.

---

### D5: Environment configuration via .env.example

**Decision:** Each app ships with a `.env.example` file documenting all required environment variables. `.env` files are gitignored.

**Rationale:** Standard practice. Makes onboarding explicit and prevents secrets from being committed.

## Risks / Trade-offs

- **Turborepo caching complexity** → Mitigation: start with simple pipeline config, add caching rules incrementally
- **pnpm workspace hoisting** → Some packages may behave unexpectedly with hoisted dependencies. Use `shamefully-hoist=false` and declare all deps explicitly
- **shadcn/ui component duplication** → Components are copied per app, not shared. Acceptable at this scale; can be extracted to a shared package later

## Open Questions

- None. This is a greenfield setup with clear constraints. All decisions can be made now.
