# Secure Relay

Proxy and VPN service site — marketing pages plus an authenticated customer
dashboard, backed by Supabase.

## Features

- Marketing landing page with global-locations and pricing sections
- Supabase email/password authentication (`/auth`)
- Customer dashboard (`/dashboard`)
- Responsive layout with mobile detection hook

## Routes

| Path | Page |
|---|---|
| `/` | Marketing landing page |
| `/auth` | Sign in / sign up |
| `/dashboard` | Authenticated customer dashboard |
| `*` | Not found |

## Stack

React · TypeScript · Vite · Supabase · shadcn/ui · Tailwind CSS

## Running locally

**Prerequisites:** Node.js 18+, a Supabase project

```bash
npm install
cp .env.example .env    # add your Supabase URL and anon key
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |

## Configuration

Supabase credentials are read from the environment. Never commit `.env` — only
the anon key belongs client-side, and the service-role key must never ship to
the browser.
