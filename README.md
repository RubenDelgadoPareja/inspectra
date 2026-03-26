# Inspectra

Plataforma SaaS para analizar sitios web de forma continua: **SEO**, **Performance** y **Seguridad**.

## Requisitos

- Node.js >= 20
- pnpm >= 9

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev        # Arranca frontend (3000) y backend (3001) en paralelo
```

## Scripts disponibles

| Comando       | Descripción                              |
|---------------|------------------------------------------|
| `pnpm dev`    | Arranca todos los apps en modo watch     |
| `pnpm build`  | Compila todos los apps                   |
| `pnpm lint`   | Ejecuta ESLint en todos los workspaces   |
| `pnpm test`   | Ejecuta tests en todos los workspaces    |

## Estructura del workspace

```
inspectra/
├── apps/
│   ├── web/          # Frontend — Next.js 16, App Router, Tailwind, shadcn/ui
│   └── api/          # Backend  — NestJS, Clean Architecture
├── packages/
│   ├── typescript-config/   # Presets de tsconfig compartidos
│   └── eslint-config/       # Presets de ESLint compartidos
└── turbo.json        # Configuración de pipelines Turborepo
```

## Tech Stack

| Capa        | Tecnología                        |
|-------------|-----------------------------------|
| Frontend    | Next.js 16, React 19, TypeScript  |
| Estilos     | Tailwind CSS v4, shadcn/ui        |
| Backend     | NestJS 11, TypeScript             |
| Monorepo    | pnpm workspaces + Turborepo       |
| Arquitectura | Clean Architecture (4 capas)     |

## OpenSpec

Este repositorio usa OpenSpec para gestionar cambios mediante propuestas y especificaciones.

- Crear propuesta: `/opsx:propose "tu idea"`
- Implementar: `/opsx:apply`
- Archivar: `/opsx:archive`

Las especificaciones base viven en `openspec/specs/`.

