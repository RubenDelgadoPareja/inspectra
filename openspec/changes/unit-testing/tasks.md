## 1. Configuración de testing en apps/web

- [ ] 1.1 Instalar dependencias de testing en `apps/web`: `jest@^30`, `@types/jest`, `ts-jest`, `jest-environment-jsdom`, `@testing-library/react@^16`, `@testing-library/jest-dom`, `@testing-library/user-event`
- [ ] 1.2 Crear `apps/web/jest.config.ts` con transform de `next/jest`, `moduleNameMapper` para `@/*` y entorno `jsdom`
- [ ] 1.3 Crear `apps/web/jest.setup.ts` con `import '@testing-library/jest-dom'`
- [ ] 1.4 Añadir script `"test": "jest"` y `"test:cov": "jest --coverage"` a `apps/web/package.json`

## 2. Umbrales de cobertura en apps/api

- [ ] 2.1 Añadir `coverageThreshold` en la config de Jest de `apps/api/package.json`: 80% lines y functions para `src/domain/**` y `src/application/**`

## 3. Verificación

- [ ] 3.1 Ejecutar `pnpm test` en `apps/web` y confirmar que Jest arranca sin errores de configuración
- [ ] 3.2 Escribir un test de ejemplo para `apps/web/src/components/ui/button.tsx` que verifique renderizado básico
- [ ] 3.3 Ejecutar `pnpm test` desde la raíz y confirmar que Turbo lanza los tests de ambas apps
