<div align="center">
  <img src="public/logo.png" alt="AinzStack Logo" width="64" />
  <br />
  <h1>AinzStack</h1>
</div>

<p align="center">
  <strong>Launch production-ready SaaS applications in days, not months.</strong><br />
  <em>A modern Next.js 16 starter kit with authentication, billing, CMS, email, and a polished UI system — all wired together.</em>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJCFcodex%2FAinzStack&env=NEXT_PUBLIC_APP_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,SANITY_PROJECT_ID,SANITY_DATASET,RESEND_API_KEY&project-name=ainzstack&repository-name=ainzstack"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" /></a>
  &nbsp;&nbsp;
  <a href="https://render.com/deploy?repo=https://github.com/JCFcodex/AinzStack"><img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" height="32" /></a>
</p>

<p align="center">
  <a href="https://github.com/JCFcodex/AinzStack/actions"><img src="https://img.shields.io/badge/build-passing-success?style=flat-square" alt="Build Status" /></a>
  <a href="https://github.com/JCFcodex/AinzStack/releases"><img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.4-149eca?style=flat-square&logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" /></a>
</p>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
  - [Deploy to Vercel](#deploy-to-vercel)
  - [Deploy to Render](#deploy-to-render)
  - [Post-Deployment Checklist](#post-deployment-checklist)
- [License](#license)

---

## Overview

AinzStack is a full-stack SaaS starter kit that handles the repetitive integration work so you can focus on building product. Authentication, billing, content management, transactional email, marketing pages, and a dashboard — all pre-wired and production-scaffolded.

<p align="center">
  <img src="public/preview.png" alt="AinzStack Preview" width="100%" />
</p>

---

## Features

- **Authentication** — Email/password and Google OAuth via Supabase, with SSR session handling
- **Billing** — Stripe Checkout integration with webhook routing for subscription lifecycle events
- **Content Management** — Sanity CMS client and schema foundation for structured content
- **Transactional Email** — Resend API integration for notifications and onboarding flows
- **Marketing Site** — Pre-built public-facing pages and layout scaffolding
- **Dashboard** — Secured application interface with sidebar navigation
- **UI System** — Tailwind CSS v4 with Framer Motion animation primitives
- **Form Handling** — Zod schema validation paired with React Hook Form
- **State Management** — React Query for server state, Zustand for client state
- **Quality Enforcement** — Strict TypeScript, ESLint, Vitest unit tests, and Playwright E2E tests
- **CI-Ready** — Single `pnpm ci` command runs the full lint → typecheck → test → build pipeline

---

## Tech Stack

| Layer              | Technology                                           |
| :----------------- | :--------------------------------------------------- |
| **Framework**      | Next.js App Router, Turbopack, React 19              |
| **Authentication** | Supabase (Email/Password, Google OAuth), SSR handled |
| **Database**       | Supabase PostgreSQL                                  |
| **Payments**       | Stripe Checkout, Webhook routing                     |
| **Content**        | Sanity CMS                                           |
| **Email**          | Resend                                               |
| **Styling**        | Tailwind CSS v4, Framer Motion                       |
| **State**          | React Query, Zustand                                 |
| **Validation**     | Zod, React Hook Form                                 |
| **Testing**        | Vitest (unit), Playwright (E2E)                      |
| **Tooling**        | TypeScript (strict), ESLint, pnpm                    |

---

## Getting Started

### Prerequisites

| Tool    | Minimum Version |
| :------ | :-------------- |
| Node.js | `v22.0.0`       |
| pnpm    | `v10.0.0`       |

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/JCFcodex/AinzStack.git
cd AinzStack
pnpm install
```

### Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

The following variables are required in `.env.local`:

| Variable                             | Description                                  |
| :----------------------------------- | :------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`                | Your application's base URL                  |
| `NEXT_PUBLIC_SUPABASE_URL`           | Supabase project URL                         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase anonymous (public) key              |
| `SUPABASE_SERVICE_ROLE_KEY`          | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key                       |
| `STRIPE_SECRET_KEY`                  | Stripe secret key (server-side only)         |
| `STRIPE_WEBHOOK_SECRET`             | Stripe webhook signing secret                |
| `SANITY_PROJECT_ID`                  | Sanity project ID                            |
| `SANITY_DATASET`                     | Sanity dataset name (e.g., `production`)     |
| `RESEND_API_KEY`                     | Resend API key for transactional email       |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never prefix secret keys with `NEXT_PUBLIC_`.

### Running Locally

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/             # Authentication flows (login, signup, callback)
│   ├── (dashboard)/        # Secured application interface
│   ├── (marketing)/        # Public-facing marketing pages
│   └── api/                # API route handlers (Edge & Node.js)
├── actions/                # Server Actions for data mutations
├── components/
│   ├── layout/             # Structural components (navbar, sidebar, footer)
│   ├── providers/          # React context and service providers
│   └── ui/                 # Reusable UI primitives
└── lib/                    # Core integrations and shared utilities
    ├── auth/               # Authentication helpers
    ├── sanity/             # Sanity client and schemas
    ├── stripe/             # Stripe client and webhook logic
    └── supabase/           # Supabase client configuration
```

---

## Available Scripts

| Command          | Description                                            |
| :--------------- | :----------------------------------------------------- |
| `pnpm dev`       | Start the development server with Turbopack            |
| `pnpm build`     | Create an optimized production build                   |
| `pnpm start`     | Serve the production build locally                     |
| `pnpm lint`      | Run ESLint static analysis                             |
| `pnpm typecheck` | Run TypeScript type checking                           |
| `pnpm test`      | Run unit tests with Vitest                             |
| `pnpm test:e2e`  | Run end-to-end tests with Playwright                   |
| `pnpm ci`        | Run full CI pipeline (lint → typecheck → test → build) |

---

## Deployment

### Deploy to Vercel

The fastest path to production. Click the button to clone the repo into your Vercel account, fill in your environment variables, and deploy — all in one step.

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJCFcodex%2FAinzStack&env=NEXT_PUBLIC_APP_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,SANITY_PROJECT_ID,SANITY_DATASET,RESEND_API_KEY&project-name=ainzstack&repository-name=ainzstack"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" /></a>
</p>

Vercel will prompt you to provide each required environment variable during setup. Refer to the [Environment Variables](#environment-variables) table for descriptions.

### Deploy to Render

Prefer Render? Click the button below to create a new web service from this repository. Render will use the `render.yaml` blueprint in the repo to configure the service automatically.

<p align="center">
  <a href="https://render.com/deploy?repo=https://github.com/JCFcodex/AinzStack"><img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" height="32" /></a>
</p>

> **Render setup notes:**
> - Add all required [environment variables](#environment-variables) in the Render dashboard under **Environment**.
> - Set the **Build Command** to `pnpm build` and the **Start Command** to `pnpm start` (these are pre-configured in `render.yaml` if the blueprint file is present).
> - Ensure the Node.js version is set to `22` or higher in your service settings.

### Post-Deployment Checklist

Regardless of your hosting provider, verify the following after your first deploy:

1. **Base URL** — Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g., `https://yourdomain.com`).
2. **Auth Callbacks** — Register your production callback URI in the [Supabase Dashboard](https://supabase.com/dashboard) under **Authentication → URL Configuration**:
   ```
   https://yourdomain.com/auth/callback
   ```
3. **Stripe Webhooks** — Update your [Stripe webhook endpoints](https://dashboard.stripe.com/webhooks) to point to your production URL:
   ```
   https://yourdomain.com/api/stripe/webhook
   ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>
    <a href="https://github.com/JCFcodex/AinzStack">GitHub</a> ·
    <a href="https://github.com/JCFcodex/AinzStack/issues">Issues</a> ·
    <a href="https://github.com/JCFcodex/AinzStack/discussions">Discussions</a> ·
    <a href="https://github.com/sponsors/JCFcodex">Sponsor</a>
  </p>
  <p>
    Built by <a href="https://github.com/JCFcodex">JCFcodex</a>
  </p>
</div> 