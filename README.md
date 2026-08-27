# २१ कळ्या Modak & Culinary Studio — Storefront + Admin Portal

A full-stack storefront: React/Vite frontend, Express + MongoDB backend, email-OTP signup,
JWT-based auth, Razorpay payments, and a hidden admin dispatch panel.

## What's inside

- **Customer storefront** — browse products, add to cart, sign up/verify with an emailed OTP,
  log in, check out with Razorpay (or Cash on Delivery).
- **Hidden admin portal** at `/admin-portal-x7k2` — no button or link anywhere in the public
  site points to it. Manage products, view/update order status (pending → confirmed → packed →
  shipped → out for delivery → delivered), edit store settings and delivery slots.
- **Security**: bcrypt-hashed passwords, bcrypt-hashed OTPs (never stored in plaintext), JWT
  httpOnly cookies (separate cookie/session for customers vs admin), rate limiting on auth
  routes, Razorpay payment signature verification before any order is persisted.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | What it's for |
|---|---|
| `MONGO_URI` | Your MongoDB connection string (Atlas or local). |
| `JWT_SECRET` | Any long random string — signs session cookies. |
| `NODE_ENV` | `development` locally, `production` when deployed. |
| `CLIENT_URL` | Your frontend's public URL (used for CORS). |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Gmail address + a 16-character **App Password** (not your normal password) used to send OTP emails. Create one at https://myaccount.google.com/apppasswords after enabling 2-Step Verification. |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | From your Razorpay Dashboard → Settings → API Keys. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | An admin account is auto-created on server startup with these credentials if it doesn't already exist. |
| `GEMINI_API_KEY` | Optional — only used by the "Helper" AI chat widget, unrelated to the store backend. |

If `GMAIL_USER`/`GMAIL_APP_PASSWORD` aren't set, OTPs are printed to the server console instead
of emailed, so you can still test signup locally. If Razorpay keys aren't set, the online-payment
option returns a clear error and Cash on Delivery still works.

## 3. Run locally

```bash
npm run dev
```

This starts the Express server (with Vite in middleware mode) at `http://localhost:3000`.

- Storefront: `http://localhost:3000/`
- Admin portal: `http://localhost:3000/admin-portal-x7k2` (log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## 4. Build for production

```bash
npm run build
npm start
```

## How checkout works

1. Customer must sign up (name, email, phone, password) → receives a 6-digit OTP by email →
   verifies it → session cookie is set.
2. At checkout, customer fills in delivery details, then chooses **Pay Online (Razorpay)** or
   **Cash on Delivery**.
3. For Razorpay: the server creates a Razorpay order, the customer completes payment in the
   Razorpay checkout widget, and the server verifies the payment signature (HMAC-SHA256) before
   writing the order to MongoDB. Nothing is saved unless the signature checks out.
4. For COD: the order is saved immediately with `paymentStatus: pending`.
5. All orders are visible in the admin portal, where staff can move them through
   `pending → confirmed → packed → shipped → out_for_delivery → delivered` (or `cancelled`).

## Notes on the admin portal

- It is intentionally **not linked** from the customer site — no button, no nav item.
- It uses its own login and its own session cookie (`admin_token`, 12-hour expiry), separate
  from the customer session cookie (`token`, 30-day expiry), so an admin and a customer can be
  logged in simultaneously in the same browser without conflict.
- Change the path `/admin-portal-x7k2` in `src/main.tsx` to something else if you'd like a
  different hidden URL.
