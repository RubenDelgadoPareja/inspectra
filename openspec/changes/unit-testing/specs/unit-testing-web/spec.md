## ADDED Requirements

### Requirement: apps/web tiene Jest y React Testing Library configurados
El sistema SHALL tener instaladas y configuradas las siguientes dependencias en `apps/web`: `jest`, `@types/jest`, `ts-jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.

#### Scenario: Ejecución de tests en web
- **WHEN** se ejecuta `pnpm test` en `apps/web`
- **THEN** Jest descubre y ejecuta los archivos `*.spec.tsx` y `*.spec.ts` sin errores de configuración

---

### Requirement: La configuración de Jest en web resuelve imports de Next.js y el alias @/*
El sistema SHALL configurar Jest en `apps/web` con el transform de Next.js (`next/jest`) y el `moduleNameMapper` para resolver el alias `@/*` a `src/*`.

#### Scenario: Import con alias @ resuelto en test
- **WHEN** un componente bajo test importa `@/lib/utils`
- **THEN** Jest resuelve correctamente el import a `src/lib/utils` sin error de módulo no encontrado

#### Scenario: Import de Next.js resuelto en test
- **WHEN** un componente bajo test importa `next/image` o `next/link`
- **THEN** Jest no lanza errores de transformación y el componente se renderiza correctamente

---

### Requirement: Los componentes React se testean verificando su comportamiento desde la perspectiva del usuario
El sistema SHALL testear los componentes React usando `@testing-library/react` con `render`, queries semánticas (`getByRole`, `getByText`, `getByLabelText`) e interacciones con `userEvent`.

#### Scenario: Componente renderizado y verificado
- **WHEN** se escribe un test para un componente Button
- **THEN** el test usa `render(<Button>Click me</Button>)` y verifica la presencia del elemento con `screen.getByRole('button', { name: /click me/i })`

#### Scenario: Interacción de usuario simulada
- **WHEN** se escribe un test para un componente con lógica de click
- **THEN** el test usa `await userEvent.click(element)` y verifica el estado o efecto resultante

---

### Requirement: El script test de apps/web está integrado con turbo
El sistema SHALL definir el script `"test": "jest"` en `apps/web/package.json` para que `turbo test` lo recoja automáticamente en el pipeline de CI.

#### Scenario: turbo test incluye web
- **WHEN** se ejecuta `pnpm test` desde la raíz del monorepo via Turbo
- **THEN** Turbo ejecuta el script `test` de `apps/web` junto al de `apps/api`
