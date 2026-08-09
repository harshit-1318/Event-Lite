# EVENTELITE V2 — DATABASE SPECIFICATION

## 1. Database Architecture
EventElite V2 utilizes **PostgreSQL** with **Prisma ORM 7** for type-safe query generation, migrations, and declarative relation modeling.

---

## 2. Entity Relationship Diagram (ERD)
```
+------------------+         +------------------+         +------------------+
|      User        |         |      Event       |         |     Category     |
+------------------+         +------------------+         +------------------+
| id (PK)          |<---+    | id (PK)          |<---+    | id (PK)          |
| email (Unique)   |    |    | title            |    |    | name (Unique)    |
| passwordHash     |    |    | slug (Unique)    |    |    | slug (Unique)    |
| name             |    |    | description      |    |    | description      |
| role (ENUM)      |    |    | categoryId (FK)  |----+    +------------------+
| department       |    |    | organizerId (FK) |----+
| rollNo           |    |    | venue            |    |
| phone            |    |    | startDate        |    |
| fatherName       |    |    | endDate          |    |
| studentClass     |    |    | time             |    |
| isActive         |    |    | fee              |    |
| image            |    |    | capacity         |    |
| createdAt        |    |    | status (ENUM)    |    |
+------------------+    |    | imageUrl         |    |
        |               |    +------------------+    |
        | 1:N           |            | 1:N           |
        v               |            v               |
+------------------+    |    +------------------+    |
|   Registration   |    |    |   Registration   |    |
+------------------+    |    +------------------+    |
| id (PK)          |    |    | id (PK)          |    |
| userId (FK)      |----+    | userId (FK)      |    |
| eventId (FK)     |---------| eventId (FK)     |----+
| status (ENUM)    |         | status (ENUM)    |
| paymentStatus    |         | paymentStatus    |
| registeredAt     |         | registeredAt     |
+------------------+         +------------------+
```

---

## 3. Core Tables & Field Mappings
1. **`User`**: Core identity table storing credentials hash, assigned role (`STUDENT`, `FACULTY`, `ADMIN`), and academic attributes (`rollNo`, `studentClass`, `department`).
2. **`Category`**: Event taxonomy (Workshops, Seminars, Cultural, Sports, Conferences, FDP).
3. **`Event`**: Detailed event metadata with capacity enforcement and status lifecycle (`DRAFT`, `PUBLISHED`, `CANCELLED`, `COMPLETED`).
4. **`Registration`**: Event enrollments with compound unique constraint `@@unique([userId, eventId])` preventing duplicate registrations.
5. **`Notification`**: Real-time student and faculty alert dispatch.
6. **`PasswordResetToken`**: Secure cryptographic reset tokens with expiration.
7. **`AuditLog`**: System and user audit tracking for administrative security.
