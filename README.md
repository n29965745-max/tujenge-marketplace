# Tujenge — Africa's Construction & Real Estate Marketplace

> *"Tujenge"* — Swahili for **"Let's build."**
> The verified marketplace for African construction and real estate.

This is the production web application for **Tujenge**, connecting property seekers, verified professionals, suppliers, equipment owners, financiers, and transport providers across Africa.

---

## ✨ What's inside

- **Landing page** — hero, problem/solution, how-it-works, marketplace showcase, testimonials, trust, FAQ, final CTA.
- **Auth flows** — email + password sign-up & sign-in via Supabase Auth, email confirmation, password reset.
- **Dashboard** — authenticated user area with quick actions and Build My Project wizard entry.
- **Database** — full Postgres schema (PostGIS-enabled) covering profiles, listings, projects, milestones, escrow, orders, messages, reviews.
- **Row Level Security** — every table is protected by Supabase RLS so users only see what they should.
- **Storage** — Supabase Storage buckets for listings, avatars, documents, and project photos.
- **API health endpoint** — `/api/health` for monitoring.

---

## 🛠 Tech stack

| Layer | Tool |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19, TypeScript) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) with custom Tujenge design tokens |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Manrope (display) + Inter (body) via `next/font/google` |
| Database | [Supabase](https://supabase.com) — Postgres + PostGIS + Auth + Storage |
| Hosting | [Vercel](https://vercel.com) |
| Animations | Native CSS + `IntersectionObserver`, 60fps, `prefers-reduced-motion` aware |

No client-side animation library. All motion uses native CSS with GPU-accelerated transforms.

---

## 🚀 Quick start

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/tujenge.git
cd tujenge
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in your Supabase project URL and anon key. See **Supabase setup** below.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🗄 Supabase setup

### Create a project

1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **anon public key** from `Settings → API`.
3. Add them to `.env.local`.

### Run the migrations

Two options:

**Option A — Supabase Dashboard**
1. Open `supabase/migrations/` and copy the contents of each file in order:
   - `20240101000000_initial_schema.sql`
   - `20240101000100_rls_policies.sql`
   - `20240101000200_storage_and_triggers.sql`
2. Paste into the **SQL Editor** in the Supabase dashboard and run.

**Option B — Supabase CLI** (recommended for teams)
```bash
# Install: https://supabase.com/docs/guides/local-development/cli/getting-started
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Configure auth

In your Supabase dashboard:

1. **Authentication → URL Configuration**
   - Site URL: `http://localhost:3000` (dev) and your production URL.
   - Redirect URLs: add `http://localhost:3000/auth/callback` and `https://your-domain.com/auth/callback`.
2. **Authentication → Email Templates** (optional) — customize confirmation and password reset emails.

### Storage buckets

The migrations create four buckets automatically:
- `listings` (public) — property and equipment photos.
- `avatars` (public) — user profile pictures.
- `documents` (private) — KYC documents, title deeds.
- `projects` (public) — construction progress photos.

---

## 📁 Project structure

```
tujenge/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Landing page (composes all sections)
│   │   ├── layout.tsx            # Root layout (fonts, metadata, ScrollProgress)
│   │   ├── globals.css           # Design system tokens + Tailwind
│   │   ├── login/                # Sign-in flow
│   │   ├── signup/               # Sign-up flow
│   │   ├── dashboard/            # Authenticated user dashboard
│   │   ├── auth/callback/        # Email confirmation + OAuth callback
│   │   ├── auth/actions.ts       # Server actions for auth
│   │   ├── api/health/           # Liveness check
│   │   ├── properties/           # Property listings
│   │   ├── materials/            # Materials marketplace
│   │   ├── contractors/          # Contractor directory
│   │   ├── professionals/        # Architects, engineers, etc.
│   │   ├── equipment/            # Equipment rental
│   │   ├── build/                # Build My Project wizard
│   │   ├── quote/                # Request a quote
│   │   ├── projects/             # User projects dashboard
│   │   ├── financing/            # Financing & insurance
│   │   ├── logistics/            # Transport providers
│   │   ├── blog/                 # Insights content
│   │   └── register/             # Onboarding for suppliers + contractors
│   ├── components/               # Reusable UI components
│   │   ├── Navigation.tsx        # Sticky glass nav with mobile drawer
│   │   ├── HeroSection.tsx       # Full-bleed hero with parallax
│   │   ├── ProblemAgitation.tsx  # Pain points grid
│   │   ├── SolutionEcosystem.tsx # 8-category service grid
│   │   ├── HowItWorks.tsx        # 4-step timeline
│   │   ├── MarketplaceShowcase.tsx # Filterable listings grid
│   │   ├── Testimonials.tsx      # Auto-rotating carousel
│   │   ├── TrustBadges.tsx       # 6 verification badges + animated stats
│   │   ├── FAQSection.tsx        # Accordion with 10 Qs
│   │   ├── Footer.tsx            # 5-column footer with newsletter
│   │   ├── ScrollReveal.tsx      # IntersectionObserver wrapper
│   │   ├── AnimatedCounter.tsx   # Viewport-triggered counter
│   │   ├── PageTransition.tsx    # Page-level fade-up
│   │   └── ScrollProgress.tsx    # Top-of-page scroll bar
│   ├── lib/
│   │   └── supabase/             # Supabase clients
│   │       ├── client.ts         # Browser client
│   │       ├── server.ts         # Server Component client
│   │       └── middleware.ts     # Session refresh middleware
│   └── middleware.ts             # Next.js middleware (session refresh)
├── supabase/
│   └── migrations/               # SQL migrations
│       ├── 20240101000000_initial_schema.sql
│       ├── 20240101000100_rls_policies.sql
│       └── 20240101000200_storage_and_triggers.sql
├── public/                       # Static assets
├── tailwind.config.ts            # Design tokens
├── postcss.config.mjs            # PostCSS plugins
├── next.config.ts                # Next.js config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🎨 Design system

The brand identity follows the [Tujenge Brand Identity](./.kimchi/docs/africa-construction-marketplace/02-brand-identity.md) guide.

**Colors** (defined in `tailwind.config.ts`):
- `navy` — primary brand (`#0F172A` to `#F8FAFC`)
- `gold` — accent + CTAs (`#7A5B0A` to `#FDF8E8`)
- `emerald` — success + verified states (`#10B981`)

**Typography**:
- Display: **Manrope** (300–800)
- Body: **Inter** (400–700)

**Motion** (in `globals.css`):
- `--motion-fast: 200ms`, `--motion-normal: 300ms`, `--motion-slow: 500ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (premium)
- All motion respects `prefers-reduced-motion`.

---

## 🚢 Deploy to Vercel

### One-click

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add the environment variables from `.env.example` in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, for server admin tasks)
   - `NEXT_PUBLIC_SITE_URL` (set to your production URL)
4. Click **Deploy**.

### Via CLI

```bash
npm i -g vercel
vercel login
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

The `/api/health` endpoint will return a 200 once Supabase is reachable.

---

## 🧪 Useful commands

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## 📐 Roadmap

See [the strategic blueprint](./.kimchi/docs/africa-construction-marketplace/) for the full product, technical, and business roadmap.

**Phase 1** (now): Manual brokerage + simple site — ✅ live
**Phase 2**: SEO-led content + listings directory — ✅ live
**Phase 3**: Marketplace MVP (two-sided) — 🚧 in progress
**Phase 4**: Payments + escrow (M-Pesa, Stripe, Flutterwave)
**Phase 5**: Construction operations (BOQ, project management)
**Phase 6**: Mobile app + financing placement

---

## 🛡 Security

- Row Level Security on every table — users only see what they should.
- Application-layer encryption for sensitive PII (national IDs, etc.).
- Service role key never exposed to the client.
- Server actions validate all input server-side.
- HTTPS only in production.

Found a security issue? Email **security@tujenge.africa**.

---

## 📜 License

Proprietary. © Tujenge. All rights reserved.

---

## 🙏 Acknowledgments

Built with ❤️ for Africa's builders.
