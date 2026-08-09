# EVENTELITE V2 — API & SERVER ACTIONS SPECIFICATION

## 1. Overview
EventElite V2 utilizes Next.js **Server Actions** for all mutation workflows and standard **Route Handlers** for auth adapters, upload signatures, and webhooks.

---

## 2. Server Actions Reference

### 2.1 Authentication Actions (`actions/auth.actions.ts`)
- `loginAction(data: LoginInput)`: Authenticates user credentials against database bcrypt hash and establishes encrypted JWT session.
- `registerAction(data: RegisterInput)`: Self-service student registration with roll number and class validation.
- `logoutAction()`: Invalidates session and redirects to `/login`.
- `forgotPasswordAction(data: ForgotPasswordInput)`: Dispatches secure cryptographic password reset token.
- `resetPasswordAction(data: ResetPasswordInput)`: Validates token expiration and applies new password hash.
- `updateProfileAction(data: ProfileUpdateInput)`: Updates student/faculty profile information.

### 2.2 Registration Actions (`actions/registration.actions.ts`)
- `registerForEventAction({ eventId, participationStatus })`: Executes atomic database transaction checking capacity, duplicate checks, and setting initial payment status.
- `cancelRegistrationAction(registrationId)`: Cancels registration pass and re-opens capacity.
- `updatePaymentStatusAction({ registrationId, status })`: Approves or rejects payment for paid events.

### 2.3 Event Actions (`actions/event.actions.ts`)
- `createEventAction(data)`: Faculty/Admin event creation with date-conflict validation.
- `updateEventAction(id, data)`: Modifies event details.
- `deleteEventAction(id)`: Removes or cancels event.

---

## 3. Route Handlers (`app/api/`)
- `GET / POST /api/auth/[...nextauth]`: Auth.js authentication provider endpoints.
- `POST /api/uploads`: Secure Cloudinary media upload signature.
- `GET /api/cron/cleanup`: Automated transition for completed events.
