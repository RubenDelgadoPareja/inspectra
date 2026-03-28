## Context

El monorepo usa Clean Architecture en ambas apps. El backend (`apps/api`) tiene Jest 30 + ts-jest + `@nestjs/testing` ya configurados inline en `package.json`, con una única spec de ejemplo en `presentation/`. El frontend (`apps/web`) no tiene ninguna infraestructura de testing. `turbo test` ya está en el pipeline de CI con `dependsOn: ["^build"]`.

## Goals / Non-Goals

**Goals:**
- Establecer convenciones de unit testing para `api` (estructura, naming, mocking, cobertura mínima)
- Instalar y configurar Jest + React Testing Library en `web`
- Que `pnpm test` en cada app ejecute los unit tests y `turbo test` los orqueste correctamente
- Cobertura mínima del 80% de líneas en código de negocio (servicios, use cases, utils)

**Non-Goals:**
- Tests de integración o E2E (fuera de alcance en esta fase)
- Testing de infraestructura (base de datos, HTTP externo)
- Visual regression testing
- Cobertura del 100% — se priorizan servicios y lógica de dominio

## Decisions

### 1. Frontend: Jest vs Vitest

**Decisión:** Jest 30 con `jest-environment-jsdom` y Next.js transform.

**Rationale:** El backend ya usa Jest 30 — mantener una única herramienta en todo el monorepo reduce la carga cognitiva y permite compartir configuración vía `@inspectra/typescript-config`. Vitest tiene mejor DX pero añadiría heterogeneidad innecesaria en esta fase.

**Alternativa considerada:** Vitest — mejor performance y soporte nativo de ESM, pero requeriría configuración diferente al backend.

### 2. React Testing Library vs Enzyme

**Decisión:** `@testing-library/react` + `@testing-library/jest-dom`.

**Rationale:** Estándar de facto para React 19. Enzyme no soporta React 18+ oficialmente. RTL fomenta tests centrados en comportamiento del usuario, no en implementación.

### 3. Estructura de archivos de test

**Decisión:** Colocar los archivos `*.spec.ts(x)` junto al archivo que testean (colocación).

**Rationale:** Sigue el patrón ya establecido en `apps/api/src/presentation/app.controller.spec.ts`. Facilita encontrar el test de cada módulo y hace evidente qué código no tiene cobertura.

### 4. Cobertura mínima

**Decisión:** 80% de líneas/funciones en capas `domain/` y `application/`. Sin umbral en `infrastructure/` ni `presentation/` de forma inicial.

**Rationale:** El dominio y los casos de uso contienen la lógica de negocio crítica. La infraestructura depende de efectos externos difíciles de mockear en unit tests.

## Risks / Trade-offs

- **Next.js 16 con App Router puede tener incompatibilidades con jsdom** → Mitigación: usar `next/jest` transform oficial para resolver imports de Next.js correctamente.
- **React 19 + RTL**: `@testing-library/react` v15+ soporta React 19; fijar versión mínima. → Mitigación: instalar `@testing-library/react@^16`.
- **Turbo cachea `coverage/**`** — si los tests no generan coverage en web inicialmente, no rompe el pipeline.
