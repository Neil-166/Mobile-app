# ABTalks — 60-Day Coding Challenge

A mobile-first app for Indian college students building a 60-day coding streak. The experience pairs a calm, cinematic habit dashboard with an end-to-end daily challenge flow — build, commit, reflect, and share.

No backend. No account wall. Realistic mock data only.

## Quick Start

```bash
npm install
npm run dev      # dev server → http://localhost:5173
npm run build    # type-check + production build (dist/)
npm run preview  # preview the production build
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page with social proof, tracks, outcomes, FAQ |
| `/dashboard` | Habit dashboard with streak, day progress, midnight rescue |
| `/day/12` | Day challenge: build checklist, focus timer, submission flow |
| `/profile` | User profile, stats, achievements, activity |

## Tech Stack

- **Vite 7 + React 19 + TypeScript** (strict, zero TS errors at build)
- **React Router DOM 7** — `/`, `/dashboard`, `/day/:day`, `/profile`
- **Tailwind CSS v4** + shadcn-style Radix primitives (`button`, `badge`, `checkbox`, `accordion`)
- **Framer Motion** — scroll-linked parallax, tab transitions, celebration micro-interactions
- **Lucide React** icons · **Sonner** toasts · **html-to-image** (Momentum Card PNG export)
- **@fontsource-variable/inter + jetbrains-mono** — self-hosted fonts (no render-blocking CDN)

## Design System

Calm dark palette — `#0E1116` base → `#171C26` cards → `#262D3D` borders, with a single blue accent family (`#7C8CFF` / `#A7B4FF`) and semantic success / warning / danger colors. No neon glows, no harsh gradients — only a subtle white surface gradient.

**Typography:** H1 34–36px · H2 24px · H3 20px · body 15–16px · caption 12–13px. Soft line-height, balanced headings.

**Mobile (390px):** no horizontal scroll (`overflow-x: clip`), 48px touch targets, safe-area padding, sticky bottom nav with clearance, smooth scrolling.

**Performance:** lazy-loaded sections (`HeroPhone`, `Confetti`, `MomentumCard`), radial gradients instead of `filter: blur`, chunk-split vendor bundles. All motion respects `prefers-reduced-motion`.

## Key Features

| Feature | Details |
|---------|---------|
| **Two-row header** | Greeting + live clock, user name, animated streak pill, avatar |
| **Segmented control** | 4-column icon tabs (Dashboard / Start / Missed / Profile) |
| **Streak hero** | Animated count-up, progress ring, streak flame pulse (above the fold) |
| **Day card** | Today's task, estimated time, live countdown to midnight, primary CTA |
| **Midnight Rescue** | Time-based: pre-10 PM countdown + progress bar → after 10 PM live midnight countdown + quick actions |
| **Focus Sprint** | 25-min Pomodoro with localStorage persistence, session counter, checkmark celebration |
| **Submission flow** | Checklist → focus → submit; persists to localStorage, celebrates on completion |
| **Momentum Card** | 9:16 story card with PNG export via `html-to-image` |
| **Profile page** | Identity hero, stats, social links, achievement shelf, activity timeline |
