## Context

Monorepo gestionado con pnpm workspaces y Turborepo. Contiene dos apps (`api` en NestJS, `web` en Next.js) y dos packages compartidos (`eslint-config`, `typescript-config`). Los scripts `lint`, `build` y `test` ya están definidos y orquestados vía Turbo. No existe ningún workflow de GitHub Actions.

## Goals / Non-Goals

**Goals:**
- Ejecutar lint, build y test automáticamente en cada push y PR a `main`
- Cachear el store de pnpm y la caché de Turbo para reducir tiempos de ejecución
- Usar Node.js 20 y pnpm con `--frozen-lockfile` para garantizar reproducibilidad

**Non-Goals:**
- Deploy o release automático (fuera de alcance en esta fase)
- Matrix builds por versión de Node
- Notificaciones externas (Slack, email, etc.)
- Análisis de cobertura de tests ni reportes de calidad

## Decisions

### 1. Un único workflow con jobs secuenciales vs. paralelos

**Decisión:** Jobs secuenciales `lint → build → test`.

**Rationale:** El workflow encadena `lint → build → test` con `needs`, lo que hace explícito el gateo entre etapas en CI. Turbo sigue aportando ejecución incremental y reutilización de resultados vía caché.

**Alternativa considerada:** Jobs paralelos — descartado porque `test` requiere artefactos de `build` y generaría race conditions sin caché compartida entre jobs.

### 2. Caché de pnpm store

**Decisión:** Usar `actions/cache` con el path resuelto dinámicamente por `pnpm store path` y key basada en el hash de `pnpm-lock.yaml`.

**Rationale:** Evita reinstalar todas las dependencias en cada run. `pnpm/action-setup@v4` con `run_install: false` da control explícito sobre cuándo instalar.

### 3. Caché de Turbo

**Decisión:** Usar `actions/cache` con `.turbo/` y key basada en el `runner.os` y el SHA del commit, con restore-keys para reutilizar cachés parciales.

**Rationale:** Turbo es incremental por naturaleza — si los inputs de una tarea no cambiaron, la salta. La caché persistida entre runs maximiza este beneficio.

## Risks / Trade-offs

- **Caché stale en pnpm** → Mitigación: la key incluye hash de `pnpm-lock.yaml`, se invalida automáticamente al cambiar dependencias.
- **`web` sin scripts `test` y `lint`** → Turbo los ignorará sin error; no bloquea el pipeline. Riesgo bajo a corto plazo.
- **Secrets no configurados** → Si algún test requiere variables de entorno, fallará sin mensaje claro. Mitigación: documentar en README qué secrets son necesarios cuando aplique.
