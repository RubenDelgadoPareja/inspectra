## ADDED Requirements

### Requirement: Los tests unitarios se colocan junto al archivo que testean
El sistema SHALL organizar los archivos de test con extensión `*.spec.ts` o `*.spec.tsx` en el mismo directorio que el archivo de producción que testean.

#### Scenario: Archivo de test correctamente ubicado
- **WHEN** un desarrollador crea un test para `src/application/use-cases/create-user.use-case.ts`
- **THEN** el archivo de test se crea como `src/application/use-cases/create-user.use-case.spec.ts` en el mismo directorio

---

### Requirement: Los servicios de dominio y casos de uso tienen cobertura mínima del 80%
El sistema SHALL mantener una cobertura de líneas y funciones igual o superior al 80% en los directorios `src/domain/` y `src/application/` del proyecto `api`.

#### Scenario: Cobertura suficiente
- **WHEN** se ejecuta `pnpm test:cov` en `apps/api`
- **THEN** el reporte de cobertura muestra ≥80% de líneas en `domain/` y `application/`

#### Scenario: Cobertura insuficiente
- **WHEN** la cobertura de `domain/` o `application/` cae por debajo del 80%
- **THEN** Jest finaliza con exit code distinto de 0 y detalla los archivos sin cobertura suficiente

---

### Requirement: Los servicios NestJS se testean aislando sus dependencias con mocks
El sistema SHALL testear los servicios de NestJS creando el módulo de test con `Test.createTestingModule()` e inyectando dependencias como mocks.

#### Scenario: Servicio testeado con mock de repositorio
- **WHEN** se escribe un test para un servicio que depende de un repositorio
- **THEN** el test crea un mock del repositorio usando `jest.fn()` o `jest.spyOn()` y lo provee via `{ provide: TOKEN, useValue: mockRepo }`

---

### Requirement: Los controladores NestJS se testean verificando la respuesta HTTP
El sistema SHALL testear los controladores verificando que llaman al servicio correcto y devuelven la respuesta esperada, sin testear lógica de negocio en el controlador.

#### Scenario: Controlador delega en servicio
- **WHEN** se ejecuta el método del controlador en el test
- **THEN** el test verifica que el servicio correspondiente fue llamado con los argumentos correctos y que el resultado devuelto es el esperado
