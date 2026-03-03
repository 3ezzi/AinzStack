# AinzStack

Production-ready full-stack scaffold for Next.js 16 App Router.

This repository currently includes:
- Core framework and package setup
- Backend integration stubs (Supabase, Stripe, Sanity, Resend)
- Server Actions scaffolding
- API route scaffolding
- Environment schema utilities
- Unit and E2E test scaffolding
- CI workflow baseline

This repository intentionally excludes:
- UI component implementation
- Marketing/auth/dashboard page implementations
- Design system customization work

## Stack

- Next.js 16.1.6
- React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS 4.2.1
- shadcn config initialized (no generated components)
- Supabase, Stripe, Sanity, Resend stubs
- Vitest + Playwright

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Fill in values in `.env.local`.

4. Start development server:
```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - run local dev server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm lint` - lint project
- `pnpm typecheck` - TypeScript validation
- `pnpm test` - run Vitest suite
- `pnpm test:e2e` - run Playwright suite
- `pnpm ci` - run lint + typecheck + unit tests + build

## Scaffolded Backend Paths

- `proxy.ts`
- `src/lib/env/*`
- `src/lib/supabase/*`
- `src/lib/stripe/*`
- `src/lib/sanity/*`
- `src/lib/email/*`
- `src/actions/*`
- `src/app/api/health/route.ts`
- `src/app/api/webhooks/stripe/route.ts`

## Notes

- `src/actions/*` and webhook handlers are intentionally scaffold-only.
- Provide real credentials and business logic before production use.
