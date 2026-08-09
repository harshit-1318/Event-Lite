# 🎓 EventElite V2 — Enterprise Campus Event Ecosystem

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Auth.js](https://img.shields.io/badge/Auth.js_v5-purple?style=for-the-badge&logo=auth0&logoColor=white)](https://authjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>A modern, production-ready, full-stack event management and participation platform engineered for universities and academic institutions.</strong>
</p>

[Explore Features](#-role-based-features) • [Tech Stack](#-technology-stack) • [Quick Start](#-quick-start) • [Demo Credentials](#-test-credentials) • [Architecture](#-system-architecture)

---

</div>

## 🌟 Overview

**EventElite V2** is a collegiate event lifecycle platform built to eliminate registration bottlenecks, manual attendee tracking, and disjointed departmental announcements. Powered by Next.js 16 Server Components and Prisma ORM, it delivers sub-second page loads, atomic concurrency-safe registrations, and dedicated role-based portals for Students, Faculty Organizers, and College Administrators.

---

## ✨ Key Capabilities

- **⚡ Blazing Fast Architecture**: Hybrid rendering with React Server Components (RSC) and Server Actions for zero client-bundle data mutations.
- **🛡️ Multi-Role RBAC**: Strict defense-in-depth authorization with Edge Middleware guards and Server Action validations (`STUDENT`, `FACULTY`, `ADMIN`).
- **🎟️ Atomic Seat & Capacity Engine**: Concurrency-safe transactions prevent overbooking in high-demand workshops and hackathons.
- **📊 Real-Time Analytics & Oversight**: Executive metrics, department breakdown charts, and full audit logging for college governance.
- **📱 Responsive & Accessible UI**: Dark/Light mode, fluid micro-animations, and mobile-first design built with Tailwind CSS and shadcn/ui.
- **🔔 Live Notifications & Alerts**: In-app event updates, status changes, and registration confirmation dispatches.

---

## 👥 Role-Based Portals

| Portal | Primary Capabilities |
| :--- | :--- |
| **🎓 Student Portal** | • Discover events with real-time multi-filter search (Category, Date, Free/Paid)<br>• 1-Click atomic event registration with instant seat reservation<br>• Personal dashboard with registered passes, status badges, and attendance QR<br>• Real-time notifications for registration approvals and schedule updates |
| **👨‍🏫 Faculty Portal** | • Comprehensive Event Studio with Cloudinary media CDN upload & schedule conflict checks<br>• Attendee roster management with CSV/Excel export capability<br>• One-click approval/rejection workflow for paid/moderated registrations<br>• Direct departmental student enrollment assistance |
| **👑 Admin Portal** | • Global oversight across all institutional events, departments, and categories<br>• User lifecycle administration (Activate, Deactivate, Role promotion)<br>• Taxonomy management (create, update, and manage event categories)<br>• Comprehensive audit trail and real-time security logging |

---

## 🛠️ Technology Stack

```
Frontend:   Next.js 16 (App Router) • React 19 • Tailwind CSS v4 • shadcn/ui • Lucide Icons
Backend:    Next.js Server Actions • Route Handlers • Edge Middleware • Zod Validation
Database:   PostgreSQL • Prisma ORM 7 • Connection Pooling
Auth:       Auth.js v5 (NextAuth) • Bcrypt Password Hashing • Stateless JWT Sessions
Media:      Cloudinary CDN (Optimized image pipeline)
Testing:    Vitest • React Testing Library • Playwright E2E
```

---

## 🏛️ System Architecture

```
[ Client Browser ]
        │  (Next.js 16 App Router / React 19 SSR)
        ▼
[ Edge Middleware ] ──► [ Role Guard & Session Validation (Auth.js v5) ]
        │
        ▼
[ Server Actions & API Handlers ] ──► [ Zod Schema Runtime Validation ]
        │
        ▼
[ Prisma ORM 7 Engine ] ──► [ PostgreSQL Database ] (ACID Transactions)
        │
        ├─► [ Cloudinary Media CDN ] (Image Asset Storage)
        └─► [ Audit Log Engine ] (Security & Compliance Tracking)
```

> 📖 *For deeper technical specifications, inspect [ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md), [API.md](API.md), and [RBAC.md](RBAC.md).*

---

## 🔑 Test Credentials

The database seed provides pre-configured testing accounts with distinct permission tiers:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@eventelite.com` | `Admin@12345` | Complete platform administration & analytics |
| **Faculty** | `faculty@eventelite.com` | `Faculty@12345` | Event publishing, roster management & approvals |
| **Student** | `student@eventelite.com` | `Student@12345` | Event registration, tickets & student dashboard |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (or `pnpm` / `yarn`)
- **Database**: PostgreSQL instance (Local or cloud e.g. Neon, Supabase, Railway)

### 2. Installation & Setup

```bash
# Clone the repository
git clone https://github.com/harshit-1318/Event-Lite.git
cd Event-Lite

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### 3. Configure `.env`

Edit `.env` with your PostgreSQL database credentials and NextAuth secret:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/eventelite?schema=public"
AUTH_SECRET="your-secure-random-32-byte-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional Media & Email Integrations
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
RESEND_API_KEY="re_your_resend_api_key"
```

### 4. Database Setup & Seeding

```bash
# Push Prisma schema to PostgreSQL database
npx prisma db push

# Seed initial categories, demo events, and test accounts
npm run db:seed
```

### 5. Launch Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
eventelite/
├── actions/             # Type-safe Server Actions (auth, event, registration, admin)
├── app/                 # Next.js 16 App Router
│   ├── (auth)/          # Authentication pages (login, register, forgot-password)
│   ├── (marketing)/     # Public landing & event exploration routes
│   ├── dashboard/       # Role-based portals (student, faculty, admin)
│   └── api/             # NextAuth, Cloudinary upload & webhook endpoints
├── components/          # Modular UI components (<100 LOC per file)
│   ├── ui/              # shadcn/ui base primitives
│   ├── layout/          # Navbar, Footer, and Role Navigation Shells
│   ├── events/          # Event cards, grids, filters & detail views
│   └── dashboard/       # Specialized role metrics & tables
├── lib/                 # Database client, auth utilities, validations & helpers
├── prisma/              # Prisma schema, seeds, and migrations
├── types/               # Global TypeScript definitions & NextAuth augmentations
└── tests/               # Vitest unit tests & Playwright specs
```

---

## 📜 Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint across project source |
| `npm run db:push` | Synchronize Prisma schema with PostgreSQL database |
| `npm run db:seed` | Seed database with demo users, categories & events |
| `npm run db:studio`| Launch visual Prisma Studio UI |
| `npm run test` | Run Vitest test suites |

---

## 🔒 Security & Best Practices

- **Zero Client Trust**: All mutations are authenticated on the server with Zod schema verification and RBAC checks.
- **CSRF & XSS Protection**: Secure HTTP-only cookies with SameSite policy.
- **Password Security**: Salted Bcrypt encryption with minimum entropy standards.
- **Modular Code Quality**: 100% adherence to single responsibility sub-module architecture.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Engineered with precision for modern campus ecosystems. Built with Next.js 16 & Prisma ORM.</sub>
</div>
