# ABTalks — 60-Day Coding Challenge

A mobile-first app for Indian college students building a 60-day coding streak. The experience pairs a calm, cinematic habit dashboard with an end-to-end daily challenge flow — build, commit, reflect, and share.

No backend. No account wall. Realistic mock data only.

## Quick Start

```bash
npm install
npm run dev
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page with social proof, tracks, outcomes, FAQ |
| `/dashboard` | Habit dashboard with streak, community, midnight rescue |
| `/day/12` | Day challenge: build checklist, focus timer, submission flow |

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** + shadcn-style Radix primitives
- **Framer Motion** — scroll-linked parallax, staggered reveals, celebration micro-interactions
- **Lucide React** icons · **Sonner** toasts
- **html-to-image** — client-side PNG export for the Momentum Card

## Design System

Midnight palette (`#07070A` base → `#16161D` cards → `#27272F` borders) with purple (`#8B5CF6`) and cyan (`#22D3EE`) accents. Typography: Inter (body) + JetBrains Mono (monospace). All motion respects `prefers-reduced-motion`.

## Key Features

| Feature | Details |
|---------|---------|
| **Two-row header** | Greeting + live clock, user name, animated streak pill, avatar |
| **Segmented control** | 4-column icon tabs (Dashboard / Start / Missed / Profile) |
| **Streak hero** | Animated count-up, progress ring, streak flame pulse, purple glow |
| **Midnight Rescue** | Time-based: pre-10 PM countdown + progress bar → after 10 PM live midnight countdown + quick actions (GitHub, LinkedIn draft, mark progress) |
| **Focus Sprint** | 25-min Pomodoro with localStorage persistence, session counter, checkmark celebration |
| **Community feed** | Live relative timestamps ("8m ago"), avatar, day number, action |
| **Momentum Card** | 9:16 story card with PNG export via `html-to-image` |
| **Energy Check-in** | localStorage persistence, dynamic encouragement per energy level |
| **Empty states** | Tailwind-drawn illustrations for first-day, missed-day, empty-profile, no-submissions |
| **Micro-wins** | Spring-animated toasts for challenge opened, focus started, draft copied, reflection added, submission |
| **Scroll experience** | Parallax gradient blobs, staggered reveals, smooth scrolling |
| **Bottom nav** | 76px, safe-area, glass blur, top border glow, animated active indicator |

## Persistence

All state is client-side localStorage. A Day 12 submission survives page refresh and updates the dashboard state. Focus sprint sessions and energy check-ins persist per day.

## Accessibility

Semantic HTML, `aria-label` on icon buttons, `aria-live` status regions, visible focus rings, keyboard-navigable, AA contrast on all text.

## Build

```bash
npm run build   # zero TypeScript errors
npm run lint    # zero ESLint warnings
```

## Deployment

Vercel or any Node-compatible Next.js host.
