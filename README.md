<div align="center">

# AinzStack

**Ship Your SaaS in Days, Not Months**

Production-ready Next.js 16 boilerplate for indie developers and startups.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Features

- ⚡ **Next.js 16** with Turbopack — instant dev starts
- 🎨 **Apple-inspired design** — monochrome palette, Inter/Poppins fonts, compact components
- 🧩 **56+ shadcn/ui components** — all customized for flat, mini-sized aesthetic
- 🔐 **Supabase Auth** — email/password + Google OAuth
- 💳 **Stripe Payments** — subscriptions, checkout, webhooks
- 📧 **Resend Email** — transactional emails with templates
- 📝 **Sanity CMS** — structured content with live previews
- 🧪 **Testing** — Vitest + Playwright + GitHub Actions CI
- 🎭 **Interactive Playground** — draggable Framer Motion component showcase
- 🌗 **Dark Mode** — system-aware with next-themes

## Tech Stack

| Category   | Technology                 |
| ---------- | -------------------------- |
| Framework  | Next.js 16, React 19       |
| Language   | TypeScript (strict)        |
| Styling    | Tailwind CSS v4, shadcn/ui |
| Auth       | Supabase                   |
| Payments   | Stripe                     |
| CMS        | Sanity                     |
| Email      | Resend                     |
| Animation  | Framer Motion              |
| State      | Zustand, TanStack Query    |
| Validation | Zod, react-hook-form       |
| Testing    | Vitest, Playwright         |
| CI/CD      | GitHub Actions             |

## Quick Start

```bash
# Clone
git clone https://github.com/JCFcodex/AinzStack.git
cd AinzStack

# Install
pnpm install

# Configure
cp .env.example .env.local
# Fill in your API keys in .env.local

# Develop
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Homepage, pricing
│   ├── (auth)/          # Sign in, sign up, forgot password
│   ├── (dashboard)/     # Dashboard, settings, billing
│   ├── api/             # Health check, Stripe webhooks
│   ├── layout.tsx       # Root layout with providers
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # SEO robots config
├── components/
│   ├── ui/              # 56+ customized shadcn components
│   ├── layout/          # Navbar, Footer, Sidebar, TopNav
│   ├── playground/      # Interactive Framer Motion showcase
│   └── providers/       # Theme, Query providers
├── lib/
│   ├── supabase/        # Client, server, middleware
│   ├── stripe/          # Client, server
│   ├── sanity/          # Client, image, schemas
│   ├── email/           # Resend client
│   └── env/             # Zod-validated env variables
├── actions/             # Server Actions (auth, billing, settings)
└── types/               # Shared TypeScript types
e2e/                     # Playwright E2E tests
```

## Scripts

| Command                     | Description                     |
| --------------------------- | ------------------------------- |
| `pnpm dev`                  | Start dev server with Turbopack |
| `pnpm build`                | Production build                |
| `pnpm test`                 | Run Vitest unit tests           |
| `pnpm exec playwright test` | Run Playwright E2E tests        |

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable                             | Service  | Required     |
| ------------------------------------ | -------- | ------------ |
| `NEXT_PUBLIC_SUPABASE_URL`           | Supabase | Yes          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase | Yes          |
| `STRIPE_SECRET_KEY`                  | Stripe   | Yes          |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe   | Yes          |
| `STRIPE_WEBHOOK_SECRET`              | Stripe   | For webhooks |
| `SANITY_PROJECT_ID`                  | Sanity   | Yes          |
| `RESEND_API_KEY`                     | Resend   | Yes          |

## Design System

AinzStack uses an **Apple-inspired minimalist** design:

- **Palette**: `#FFFFFF` / `#A9A9A9` / `#000000`
- **Fonts**: Inter (body, 14px), Poppins (headings)
- **Components**: h-8 defaults, 13px text, no shadows, flat borders
- **Spacing**: Compact — tight gaps, minimal padding
- **Dark Mode**: Full dark mode with system detection

## License

MIT © [JCFcodex](https://github.com/JCFcodex)
