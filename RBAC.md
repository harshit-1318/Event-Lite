# EVENTELITE V2 — ROLE-BASED ACCESS CONTROL (RBAC)

## 1. Role Matrix Overview

| Action / Resource | Student | Faculty | Admin |
| :--- | :---: | :---: | :---: |
| **Browse & Search Events** | ✅ | ✅ | ✅ |
| **View Event Details** | ✅ | ✅ | ✅ |
| **Register for Events** | ✅ | ✅ | ✅ |
| **Cancel Own Registration** | ✅ | ✅ | ✅ |
| **View Own Dashboard** | ✅ | ✅ | ✅ |
| **Update Personal Profile** | ✅ | ✅ | ✅ |
| **Create Campus Events** | ❌ | ✅ | ✅ |
| **Edit / Delete Own Events** | ❌ | ✅ | ✅ |
| **Manage Payment Approvals** | ❌ | ✅ (Own) | ✅ (All) |
| **Register Student Directly** | ❌ | ✅ | ✅ |
| **Manage System Users** | ❌ | ❌ | ✅ |
| **Manage Categories** | ❌ | ❌ | ✅ |
| **View System Audit Logs** | ❌ | ❌ | ✅ |

---

## 2. Route Protection Rules
- `/dashboard/student/*`: Accessible by authenticated `STUDENT`, `FACULTY`, `ADMIN`.
- `/dashboard/faculty/*`: Accessible exclusively by `FACULTY` and `ADMIN`.
- `/dashboard/admin/*`: Accessible exclusively by `ADMIN`.
- `/api/admin/*`: Protected server-side via `requireAdmin()`.
- `/api/faculty/*`: Protected server-side via `requireFacultyOrAdmin()`.

---

## 3. Server Guards Implementation (`lib/permissions/rbac.ts`)
1. `requireAuth()`: Enforces active session.
2. `requireRole(allowedRoles: Role[])`: Validates session role against allowed enum list.
3. `canManageEvent(user, event)`: Restricts event modification to the original organizer or an administrator.
