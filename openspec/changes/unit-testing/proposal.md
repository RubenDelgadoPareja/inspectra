## Why

El proyecto carece de una estrategia de unit testing definida. El backend (NestJS) tiene Jest configurado pero sin cobertura real más allá del boilerplate. El frontend (Next.js) no tiene ninguna infraestructura de testing. Sin tests unitarios, refactorizaciones y nuevas features introducen riesgo de regresión no detectado hasta producción.

## What Changes

- Definición de la estrategia de unit testing para `api` (NestJS) y `web` (Next.js)
- Instalación y configuración de Jest + React Testing Library en `apps/web`
- Convenciones de estructura, naming y cobertura mínima para ambas apps
- Integración con el pipeline de CI ya existente vía `turbo test`

## Capabilities

### New Capabilities

- `unit-testing-api`: Estrategia y convenciones de unit testing para la app NestJS (`apps/api`), cubriendo servicios, controladores y casos de uso siguiendo Clean Architecture.
- `unit-testing-web`: Configuración e instalación de Jest + React Testing Library en `apps/web` (Next.js) con convenciones de testing para componentes React.

### Modified Capabilities

## Impact

- `apps/web/package.json` — nuevas devDependencies de testing
- `apps/web/jest.config.ts` — nuevo archivo de configuración
- `apps/web/jest.setup.ts` — setup de jest-dom
- `apps/api` — sin cambios en infraestructura, solo convenciones documentadas
- CI ya recoge `turbo test` automáticamente, no requiere cambios en el workflow
