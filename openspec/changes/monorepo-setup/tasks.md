## 1. Monorepo Root Setup

- [x] 1.1 Initialise git repo (if not done) and create root `package.json` with `name: "inspectra"` and `private: true`
- [x] 1.2 Install pnpm and create `pnpm-workspace.yaml` declaring `apps/*` and `packages/*`
- [x] 1.3 Install Turborepo as dev dependency and create `turbo.json` with `dev`, `build`, `lint`, and `test` pipelines
- [x] 1.4 Create root `.gitignore` covering `node_modules`, `.env`, `.turbo`, `dist`, `.next`, `build`
- [x] 1.5 Create root `.prettierrc` and `.prettierignore`
- [x] 1.6 Create root `tsconfig.json` with base paths

## 2. Shared Packages

- [x] 2.1 Create `packages/typescript-config/` with `base.json`, `nextjs.json`, and `nestjs.json` tsconfig presets
- [x] 2.2 Create `packages/typescript-config/package.json`
- [x] 2.3 Create `packages/eslint-config/` with `base.js`, `next.js`, and `nest.js` ESLint presets
- [x] 2.4 Create `packages/eslint-config/package.json`

## 3. Frontend Scaffold (apps/web)

- [x] 3.1 Scaffold Next.js 15 app with App Router and TypeScript inside `apps/web`
- [x] 3.2 Configure `apps/web/tsconfig.json` extending `@inspectra/typescript-config/nextjs`
- [x] 3.3 Configure `apps/web/.eslintrc.js` extending `@inspectra/eslint-config/next`
- [x] 3.4 Install and configure Tailwind CSS v4
- [x] 3.5 Initialise shadcn/ui and add Button component as baseline
- [x] 3.6 Create Clean Architecture folder structure: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/presentation/`
- [x] 3.7 Move Next.js `app/` router inside `src/presentation/app/`
- [x] 3.8 Create `apps/web/.env.example` with `NEXT_PUBLIC_API_URL` and any other required vars
- [x] 3.9 Verify `pnpm dev` starts Next.js on port 3000

## 4. Backend Scaffold (apps/api)

- [x] 4.1 Scaffold NestJS app with TypeScript inside `apps/api` using NestJS CLI
- [x] 4.2 Configure `apps/api/tsconfig.json` extending `@inspectra/typescript-config/nestjs`
- [x] 4.3 Configure `apps/api/.eslintrc.js` extending `@inspectra/eslint-config/nest`
- [x] 4.4 Create Clean Architecture folder structure: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/presentation/`
- [x] 4.5 Move NestJS bootstrap into `src/presentation/` and reorganise default module
- [x] 4.6 Add `GET /health` endpoint returning `{ status: "ok" }`
- [x] 4.7 Create `apps/api/.env.example` with `PORT`, `NODE_ENV`, and placeholder DB/Redis vars
- [x] 4.8 Verify `pnpm dev` starts NestJS on port 3001 and `/health` returns 200

## 5. README

- [x] 5.1 Rewrite root `README.md` with: project overview, prerequisites (Node 20+, pnpm 9+), setup steps, workspace structure diagram, available scripts, and tech stack table
- [x] 5.2 Add `apps/web/README.md` with frontend-specific setup and folder structure explanation
- [x] 5.3 Add `apps/api/README.md` with backend-specific setup and Clean Architecture layer descriptions

## 6. Validation

- [x] 6.1 Run `pnpm install` from root — zero errors
- [x] 6.2 Run `pnpm dev` from root — both apps start in parallel
- [x] 6.3 Run `pnpm build` from root — both apps build successfully
- [x] 6.4 Run `pnpm lint` from root — no lint errors
- [x] 6.5 Verify `GET http://localhost:3001/health` returns `{ status: "ok" }`
- [x] 6.6 Verify `http://localhost:3000` loads the Next.js home page
