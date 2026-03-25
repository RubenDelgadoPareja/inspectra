# Web Analysis Platform Specification

## Overview

Inspectra is a SaaS platform that provides real-time SEO, performance, and security analysis for websites. It is designed for digital agencies and consultancies managing multiple client websites, delivering actionable findings, historical visibility, and scoring comparable to what a Big4 digital consultancy would produce.

## Architecture

### Methodology: Clean Architecture

All layers are strictly separated. Dependencies always point inward — from infrastructure toward the domain. The domain layer has zero external dependencies.

```
Domain → Application → Infrastructure → Presentation
```

### Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| State management | Zustand (client state), React Query (server state) |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL + TypeORM |
| Job queue | Redis + BullMQ |
| Analysis engine | Playwright (headless browser) |
| Auth | Passport.js (JWT + session) |
| Monorepo | pnpm workspaces + Turborepo |
| Real-time | SSE (Server-Sent Events) |

---

## Domain Model

### Core Entities

**Workspace**
Represents an agency or consultancy account. Contains multiple clients and websites.
- `id`, `name`, `slug`, `plan`, `createdAt`

**Website**
A monitored URL belonging to a workspace.
- `id`, `url`, `name`, `workspaceId`, `createdAt`, `lastAnalysisAt`

**Analysis**
A single analysis run for a website. Orchestrates the three modules in parallel.
- `id`, `websiteId`, `status` (pending | running | completed | failed), `startedAt`, `completedAt`
- `seoScore`, `performanceScore`, `securityScore`, `globalScore`

**Finding**
An individual issue or observation detected during an analysis.
- `id`, `analysisId`, `module` (seo | performance | security), `key`, `title`, `description`
- `severity` (critical | warning | info), `impact`, `recommendation`, `referenceUrl`

**Score**
A normalised 0–100 value for a module or globally.
- Computed from findings weighted by severity
- Global score = SEO (40%) + Performance (35%) + Security (25%)
- SEO score = Technical SEO (60%) + On-page SEO (40%)

### Value Objects

- `Url` — validated, normalised URL
- `Severity` — critical | warning | info
- `ScoreValue` — 0–100, immutable
- `AnalysisStatus` — pending | running | completed | failed

---

## Bounded Contexts

### 1. Workspace Management
Registration and management of workspaces, clients, and websites.

### 2. Analysis Engine
Orchestrates Playwright-based analysis. Emits real-time progress via SSE.

### 3. SEO Module
Evaluates technical SEO and on-page signals via rendered DOM.

### 4. Performance Module
Measures Core Web Vitals and loading metrics via Playwright CDP.

### 5. Security Module
Inspects HTTP response headers and TLS configuration.

### 6. Findings & Scoring
Normalises raw results into findings and computes scores.

### 7. Reporting
Dashboard views, historical comparison, shareable reports, and PDF export.

---

## Requirements

### Requirement: Workspace Management

The system SHALL allow users to create and manage a workspace containing multiple websites.

#### Scenario: Create a workspace
- **WHEN** a user registers and completes onboarding
- **THEN** the system creates a workspace associated with their account

#### Scenario: Add a website to a workspace
- **WHEN** a user submits a valid URL
- **THEN** the system stores it as a monitored website within the workspace
- **AND** validates the URL format before persisting

#### Scenario: List monitored websites
- **WHEN** a user opens their workspace dashboard
- **THEN** the system displays all websites with their latest score and analysis date

---

### Requirement: Real-time Analysis Execution

The system SHALL execute analysis using a headless browser (Playwright) and stream progress in real-time via SSE.

#### Scenario: Trigger an analysis
- **WHEN** a user requests an analysis for a website
- **THEN** the system enqueues a job via BullMQ
- **AND** the analysis engine launches a Playwright instance for that URL

#### Scenario: Stream analysis progress
- **WHEN** an analysis is running
- **THEN** the frontend receives SSE events as each module completes
- **AND** the UI updates progressively (SEO → Performance → Security)

#### Scenario: Handle analysis failure
- **WHEN** Playwright cannot reach the URL or times out
- **THEN** the analysis is marked as failed
- **AND** the user receives a clear error message with the reason

---

### Requirement: SEO Analysis

The system SHALL evaluate SEO signals from the fully rendered DOM.

#### Technical SEO checks
- robots.txt and sitemap.xml presence and validity
- Canonical tags — presence and self-referencing
- Meta robots — noindex / nofollow detection
- URL structure — length, special characters, parameters
- Redirect chains — 301/302 detection
- Hreflang — presence for multi-language sites

#### On-page SEO checks
- `<title>` — presence, length (50–60 chars), uniqueness
- Meta description — presence, length (150–160 chars)
- H1 — exactly one, not empty
- Heading hierarchy — logical Hx order
- Image alt attributes — missing or empty detection
- Open Graph tags — og:title, og:description, og:image
- Schema.org / structured data — presence detection

#### Scenario: Generate SEO findings
- **WHEN** the SEO module completes analysis
- **THEN** each detected issue is stored as a Finding with severity, impact, and recommendation
- **AND** an SEO score (0–100) is computed

---

### Requirement: Performance Analysis

The system SHALL measure Core Web Vitals and loading metrics using Playwright CDP.

#### Metrics collected
| Metric | Good threshold |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB (Time To First Byte) | < 800ms |
| Total page size | < 3MB recommended |
| Number of requests | tracked |
| Image optimisation | WebP detection |
| Render-blocking resources | JS/CSS detection |
| Compression | gzip / brotli detection |
| Caching headers | Cache-Control presence |

#### Scenario: Capture performance metrics
- **WHEN** the performance module completes
- **THEN** all metrics are stored and a performance score (0–100) is computed based on Core Web Vitals thresholds

#### Scenario: Detect performance regression
- **WHEN** a new analysis scores lower than the previous one
- **THEN** the system flags the regression in the dashboard

---

### Requirement: Security Analysis

The system SHALL assess HTTP security headers and TLS configuration.

#### HTTP headers checked
| Header | Severity if missing |
|---|---|
| Strict-Transport-Security (HSTS) | Critical |
| Content-Security-Policy (CSP) | Critical |
| X-Frame-Options | Warning |
| X-Content-Type-Options | Warning |
| Referrer-Policy | Info |
| Permissions-Policy | Info |

#### TLS / HTTPS checks
- HTTPS enforced (no plain HTTP)
- Certificate valid and not expired
- TLS version — SSLv3 and TLS 1.0/1.1 flagged as critical
- Mixed content detection (HTTP resources on HTTPS page)

#### Scenario: Generate security findings
- **WHEN** the security module completes
- **THEN** each missing or misconfigured header is stored as a Finding
- **AND** a security score (0–100) is computed

---

### Requirement: Findings & Scoring

The system SHALL normalise all module findings and compute scores.

#### Scenario: Compute global score
- **WHEN** all three modules complete
- **THEN** the system computes:
  - `globalScore = SEO*0.40 + Performance*0.35 + Security*0.25`
  - Each module score is derived from findings weighted by severity

#### Scenario: Classify finding severity
- **critical** — blocks ranking, exposes users, or breaks core functionality
- **warning** — degrades experience or signals poor practice
- **info** — best practice suggestion, no immediate impact

#### Scenario: Provide actionable recommendations
- **WHEN** a user opens a finding
- **THEN** the system shows: what was found, why it matters, how to fix it, and a reference link (MDN, Google, OWASP)

---

### Requirement: Reporting & Historical Visibility

The system SHALL provide a dashboard, historical comparison, and exportable reports.

#### Scenario: View website dashboard
- **WHEN** a user opens a website
- **THEN** the system displays the latest scores, findings grouped by module and severity, and a trend chart

#### Scenario: Compare analyses over time
- **WHEN** multiple analyses exist for a website
- **THEN** the user can view score evolution and identify improving or degrading areas

#### Scenario: Share a report
- **WHEN** a user generates a shareable report link
- **THEN** the system creates a public read-only view of that analysis result
- **AND** the view is SSR-rendered for correct link previews (og:image, title)

#### Scenario: Export to PDF
- **WHEN** a user exports a report
- **THEN** the system generates a professional PDF with scores, findings, and recommendations
- **AND** the PDF is branded and suitable for client delivery

---

## Non-functional Requirements

| Concern | Requirement |
|---|---|
| Analysis time | Full analysis completes in < 30s per URL |
| Concurrency | Multiple analyses can run in parallel via BullMQ workers |
| Availability | API uptime > 99.5% |
| Security | All endpoints authenticated via JWT. Workspace data is isolated per tenant |
| Scalability | Workers are horizontally scalable |
| Accessibility | Frontend meets WCAG 2.1 AA |
