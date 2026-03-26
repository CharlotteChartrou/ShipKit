# ShipKit Starter

## What is this?

ShipKit Starter is a clean Next.js SaaS starter with authentication, billing, and a dashboard already in place.

It is designed to give developers a solid starting point without spending days rebuilding the same setup work.

## Features

- Supabase authentication
- Stripe payments
- Dashboard UI
- Clean architecture

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

This project uses a local `.env.local` file for configuration.

Start by copying the example file:

```bash
cp .env.example .env.local
```

Then add your own values for the services you want to use.

Common variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Notes:

- `NEXT_PUBLIC_*` variables are safe to expose to the browser
- Secret keys should stay server-side only
- Do not commit `.env.local`

## Project structure

```text
app/         App Router pages and server routes
components/  Reusable UI and layout components
lib/         Shared helpers and integrations
public/      Static assets
supabase/    SQL migrations
scripts/     Local utility scripts
```

## Getting started

If you want to use the full stack setup, add your Supabase and Stripe credentials, run the Supabase migrations, and start building from there.
# ShipKit
