# @inspectra/web

Frontend de Inspectra — Next.js 15, App Router, Tailwind CSS v4, shadcn/ui.

## Requisitos

- Node.js >= 20
- pnpm >= 9

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Disponible en: http://localhost:3000

## Variables de entorno

| Variable               | Descripción             |
|------------------------|-------------------------|
| `NEXT_PUBLIC_API_URL`  | URL base del backend    |

## Estructura de carpetas

```
src/
├── domain/           # Entidades, value objects, interfaces de repositorio
├── application/      # Casos de uso, DTOs, puertos
├── infrastructure/   # Adaptadores externos, APIs, storage
└── presentation/
    └── app/          # App Router de Next.js (páginas, layouts, componentes)
```
