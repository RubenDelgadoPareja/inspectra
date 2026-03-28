## 1. Configuración del workflow

- [x] 1.1 Crear directorio `.github/workflows/` si no existe
- [x] 1.2 Crear `.github/workflows/ci.yml` con triggers `push` y `pull_request` a `main`
- [x] 1.3 Configurar el step de setup: Node.js 20, pnpm via `pnpm/action-setup@v4`

## 2. Caché de dependencias

- [x] 2.1 Añadir step de caché para el store de pnpm (path obtenido con `pnpm store path`) con key basada en hash de `pnpm-lock.yaml`
- [x] 2.2 Añadir step `pnpm install --frozen-lockfile` tras restaurar caché

## 3. Caché de Turbo

- [x] 3.1 Añadir step de caché para `.turbo/` con key basada en `runner.os` y SHA del commit, con restore-keys para hits parciales

## 4. Jobs del pipeline

- [x] 4.1 Añadir job `lint` que ejecuta `pnpm lint` (turbo lint)
- [x] 4.2 Añadir job `build` que ejecuta `pnpm build` (turbo build), con `needs: lint`
- [x] 4.3 Añadir job `test` que ejecuta `pnpm test` (turbo test), con `needs: build`

## 5. Verificación

- [ ] 5.1 Hacer push de la rama `feat/ci-github-actions` y confirmar que el workflow se dispara en GitHub Actions
- [ ] 5.2 Verificar que los tres jobs (`lint`, `build`, `test`) completan con éxito
- [ ] 5.3 Verificar que en un segundo run con el mismo código, la caché de pnpm y Turbo se restauran correctamente
