# EVENTELITE V2 — SYSTEM ARCHITECTURE SPECIFICATION

## 1. System Overview
EventElite V2 is an enterprise-grade, full-stack event management and student participation ecosystem engineered for DAV College Jalandhar. It modernizes collegiate event lifecycle workflows, from creation and capacity management to real-time student registration, automated fee tracking, payment approvals, and analytical dashboards.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|  Next.js 16 App Router (React 19) + Tailwind CSS + shadcn/ui + Lucide + Motion   |
+-----------------------------------------------------------------------------------+
                                         |
                       (Server Components & Server Actions)
                                         v
+-----------------------------------------------------------------------------------+
|                              APPLICATION TIER                                     |
|  - Edge Middleware: Role-Based Route Guard & NextAuth Auth.js Session Validation  |
|  - Server Actions: Mutation Engine (Zod Validation, RBAC Guards, DB Transactions) |
|  - Route Handlers: NextAuth API, Cloudinary Upload Signer, Webhooks, Cron APIs   |
+-----------------------------------------------------------------------------------+
                                         |
                                (Prisma ORM 7 Engine)
                                         v
+-----------------------------------------------------------------------------------+
|                                 DATA TIER                                         |
|  - Primary Relational DB: PostgreSQL (Normalized schema, FKs, Unique Constraints)  |
|  - Media Storage: Cloudinary (Secure image hosting & auto-optimization)           |
|  - Email Transport: Resend API (Transactional notification templates)             |
+-----------------------------------------------------------------------------------+
```

---

## 2. Core Architectural Principles
1. **Server Components by Default**: Zero-client-bundle data fetching with streaming SSR.
2. **Server Actions for Mutations**: Type-safe mutations replacing legacy express endpoints with automatic cache revalidation.
3. **Defense-in-Depth Security**: Layered auth checks via Edge Middleware + Server Action RBAC Guards + Database Foreign Key & Unique Constraints.
4. **Strict Modularization (100 LOC Rule)**: Single Responsibility Principle where each component or utility is concise, readable, and under ~100 lines of code.
5. **No Destructive Archiving**: Replaced raw SQL deletions with immutable status transitions (`PUBLISHED` -> `COMPLETED`).

---

## 3. Directory Layout
```
eventelite/
├── actions/        # Dedicated mutation actions (auth, event, registration, user, admin)
├── app/            # App Router: (marketing), (auth), dashboard (student/faculty/admin), api
├── components/     # UI, Layout, Events, Dashboard, Forms, Shared components (<100 LOC)
├── lib/            # Auth, DB singleton, RBAC guards, validations, utilities, constants
├── prisma/         # Prisma schema, configuration, migrations, seed script
├── types/          # Global TypeScript interfaces & NextAuth augmentations
└── tests/          # Vitest unit tests & Playwright E2E suites
```
