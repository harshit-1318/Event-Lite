# EVENTELITE V2 — PRODUCTION DEPLOYMENT GUIDE

## 1. Cloud Architecture Overview
- **Hosting**: Vercel (Edge network, Serverless functions, Automatic SSL)
- **Database**: PostgreSQL on Neon / Supabase / Prisma Postgres
- **Media CDN**: Cloudinary
- **Transactional Email**: Resend API

---

## 2. Environment Variables Configuration
Configure the following in the production environment:
```bash
# Database (Connection Pooling enabled)
DATABASE_URL="postgresql://user:pass@ep-host.neon.tech/eventelite?sslmode=verify-full"

# Auth.js / NextAuth
AUTH_SECRET="generated-secure-random-32-byte-hex-secret"
NEXTAUTH_URL="https://eventelite.davjalandhar.com"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Resend
RESEND_API_KEY="re_live_api_key"
EMAIL_FROM="EventElite <events@davjalandhar.com>"

# App
NEXT_PUBLIC_APP_URL="https://eventelite.davjalandhar.com"
```

---

## 3. Deployment Steps
1. Push repository to GitHub.
2. Link repository to Vercel Project.
3. Apply database migrations: `npx prisma db push` or `npx prisma migrate deploy`.
4. Seed initial production roles & categories: `npx tsx prisma/seed.ts`.
5. Verify build passes with zero errors: `npm run build`.
