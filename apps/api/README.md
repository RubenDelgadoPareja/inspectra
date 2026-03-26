# @inspectra/api

Backend de Inspectra — NestJS 11, TypeScript, Clean Architecture.

## Requisitos

- Node.js >= 20
- pnpm >= 9

## Setup

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Disponible en: http://localhost:3001

## Endpoints

| Método | Ruta      | Descripción        |
|--------|-----------|--------------------|
| GET    | /health   | Estado de la API   |

## Variables de entorno

| Variable       | Descripción                  |
|----------------|------------------------------|
| `PORT`         | Puerto del servidor (3001)   |
| `NODE_ENV`     | Entorno (development/production) |
| `DATABASE_URL` | Conexión a PostgreSQL        |
| `REDIS_URL`    | Conexión a Redis             |

## Estructura de carpetas

```
src/
├── domain/           # Entidades, value objects, interfaces de repositorio
├── application/      # Casos de uso, DTOs, puertos
├── infrastructure/   # DB, APIs externas, adaptadores de framework
└── presentation/     # Controladores, módulos NestJS, bootstrap
```
