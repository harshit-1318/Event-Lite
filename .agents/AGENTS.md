# PROJECT RULES & CONSTRAINTS

## 1. MANDATORY 100-LOC RULE (STRICT ENFORCEMENT)
- **Hard Limit**: Every single source code file in the project (TypeScript, TSX, CSS, Tests, Seeds, Actions, Components, Configs, etc.) MUST be kept under **100 lines of code (LOC)**.
- **Single Responsibility & Sub-modules**: If any component, server action, form, hook, utility, or script grows near 100 LOC, you MUST split it into smaller, dedicated sub-components placed inside a semantic sub-folder.
- **Naming Conventions**:
  - Auth components: `components/forms/auth/`
  - Event detail sections: `components/events/detail/`
  - Dashboard portals: `components/dashboard/student/`, `components/dashboard/faculty/`, `components/dashboard/admin/`
  - Mutation actions: `actions/auth/`, `actions/registration/`, `actions/events/`, `actions/admin/`
  - Seed scripts: `prisma/seed/`

## 2. Next.js 16 & Server Architecture
- Use Server Components by default; use Server Actions for mutations.
- Keep UI accessible, modular, and responsive using Tailwind CSS and shadcn/ui.
- Maintain type-safety with zero TypeScript errors (`npx tsc --noEmit`).
