## Why

El proyecto no tiene ningún pipeline de CI/CD. Sin validación automática, los errores de lint, build o tests pueden llegar a `main` sin detección temprana. Establecer CI desde el inicio garantiza calidad consistente en cada contribución.

## What Changes

- Nuevo workflow de GitHub Actions `.github/workflows/ci.yml` que se dispara en push y PRs a `main`
- Pipeline con tres etapas: lint → build → test
- Caché de pnpm store y Turbo para acelerar ejecuciones

## Capabilities

### New Capabilities

- `continuous-integration`: Pipeline de CI con GitHub Actions que ejecuta lint, build y test automáticamente en cada push y PR al monorepo, con caché de dependencias y de Turbo.

### Modified Capabilities

## Impact

- Nuevo archivo `.github/workflows/ci.yml`
- Sin cambios en código de aplicación ni en `package.json`
- Requiere que los scripts `lint`, `build` y `test` estén operativos en el monorepo (ya lo están vía Turbo)
