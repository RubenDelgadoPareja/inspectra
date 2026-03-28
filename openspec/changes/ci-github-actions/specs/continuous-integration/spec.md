## ADDED Requirements

### Requirement: Pipeline de CI se ejecuta en push y PR a develop
El sistema SHALL ejecutar automáticamente el pipeline de CI en cada push a `develop` y en cada pull request cuyo destino sea `develop`.

#### Scenario: Push a develop dispara el workflow
- **WHEN** se hace push de commits a la rama `develop`
- **THEN** el workflow `ci.yml` se inicia automáticamente en GitHub Actions

#### Scenario: Pull request a develop dispara el workflow
- **WHEN** se abre, actualiza o sincroniza un pull request con base en `develop`
- **THEN** el workflow `ci.yml` se inicia automáticamente y su resultado se muestra como check en el PR

---

### Requirement: Job de lint valida el código de todos los packages
El sistema SHALL ejecutar `turbo lint` abarcando todos los apps y packages del monorepo.

#### Scenario: Lint pasa sin errores
- **WHEN** todo el código cumple las reglas de ESLint configuradas
- **THEN** el job `lint` finaliza con exit code 0 y el workflow continúa

#### Scenario: Lint falla con errores
- **WHEN** algún archivo contiene violaciones de ESLint
- **THEN** el job `lint` finaliza con exit code distinto de 0 y detiene el pipeline

---

### Requirement: Job de build compila todos los packages
El sistema SHALL ejecutar `turbo build` tras completar el job de lint.

#### Scenario: Build pasa sin errores
- **WHEN** todos los packages compilan correctamente con TypeScript
- **THEN** el job `build` finaliza con exit code 0 y el workflow continúa

#### Scenario: Build falla con errores de compilación
- **WHEN** algún package tiene errores de TypeScript o de compilación
- **THEN** el job `build` finaliza con exit code distinto de 0 y detiene el pipeline

---

### Requirement: Job de test ejecuta la suite de tests
El sistema SHALL ejecutar `turbo test` tras completar el job de build.

#### Scenario: Tests pasan
- **WHEN** todos los tests de los packages con script `test` pasan
- **THEN** el job `test` finaliza con exit code 0 y el workflow completa con éxito

#### Scenario: Tests fallan
- **WHEN** uno o más tests fallan
- **THEN** el job `test` finaliza con exit code distinto de 0 y el workflow se marca como fallido

---

### Requirement: Dependencias de pnpm se cachean entre ejecuciones
El sistema SHALL cachear el store de pnpm usando una key basada en el hash de `pnpm-lock.yaml`.

#### Scenario: Caché hit en pnpm store
- **WHEN** `pnpm-lock.yaml` no ha cambiado respecto al último run
- **THEN** las dependencias se restauran desde caché y `pnpm install` completa en segundos

#### Scenario: Caché miss en pnpm store
- **WHEN** `pnpm-lock.yaml` ha cambiado
- **THEN** las dependencias se instalan desde la red y la nueva caché se guarda para el próximo run

---

### Requirement: Caché de Turbo se persiste entre ejecuciones
El sistema SHALL cachear el directorio `.turbo/` para reutilizar resultados de tareas no modificadas.

#### Scenario: Caché hit de Turbo
- **WHEN** los inputs de una tarea de Turbo no han cambiado
- **THEN** Turbo salta la tarea y reutiliza el output cacheado, reduciendo el tiempo de CI

#### Scenario: Caché miss de Turbo
- **WHEN** los inputs de una tarea han cambiado
- **THEN** Turbo ejecuta la tarea y actualiza la caché
