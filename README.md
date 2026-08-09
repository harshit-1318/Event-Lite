# EventElite V2 — Production-Grade Event Management Platform

EventElite V2 is the modernized, full-stack event management ecosystem for DAV College Jalandhar, built with Next.js 16, React 19, TypeScript, PostgreSQL, Prisma ORM 7, Tailwind CSS, and Auth.js v5.

---

## 🚀 Key Features

### 🎓 Students
- Browse, search, and filter campus workshops, hackathons, seminars, cultural fests, and sports championships.
- 1-Click atomic event registration with live seat capacity tracking and conflict checks.
- View personalized enrolled events, pass statuses (Free/Pending/Paid), and registration history.
- Real-time in-app notification center and downloadable passes.

### 👨‍🏫 Faculty
- Create campus events with Cloudinary image upload and date conflict blockers.
- Manage attendee rosters and approve/reject pending registrations for paid sessions.
- Direct student enrollment assistance for departmental activities.

### 👑 Administration
- System-wide user administration with active/deactivated status control.
- Global event oversight and category taxonomy management.
- Real-time analytical statistics and security audit logging.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & UI**: Tailwind CSS, shadcn/ui, Lucide Icons, Framer Motion
- **Database**: PostgreSQL with Prisma ORM 7
- **Authentication**: Auth.js v5 with bcrypt password hashing and RBAC
- **Validation**: Zod runtime schemas & React Hook Form
- **Storage**: Cloudinary Cloud Media CDN
- **Email**: Resend API

---

## 🔑 Development Login Credentials
- **Admin**: `admin@eventelite.com` | Password: `Admin@12345`
- **Faculty**: `faculty@eventelite.com` | Password: `Faculty@12345`
- **Student**: `student@eventelite.com` | Password: `Student@12345`

---

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Push Prisma schema to PostgreSQL
npx prisma db push

# 3. Seed initial users, categories & realistic events
npm run db:seed

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
