# ABTalks — 60-Day Challenge Redesign

A mobile-first redesign of ABTalks, built for Indian college students who are trying to turn late-night coding sessions into a consistent public learning habit. It is a front-end prototype with realistic mock data; no account or backend is required.

## Project Overview

The experience pairs a calm, cinematic habit dashboard with an end-to-end daily challenge flow. A student can open a task, focus, work through a checklist, add their GitHub proof and reflection, then see their success persist across a reload.

## Problem Statement

Students often begin tutorials and projects with energy but struggle to build a visible, sustainable practice. ABTalks gives that practice a small daily shape: build something meaningful, commit it, reflect on it, and make the progress visible.

## Design Philosophy

- Mobile first at a 390px viewport, with thumb-friendly layouts and safe-area spacing.
- A dark, low-distraction night-time palette grounded in violet, cyan, and warm streak feedback.
- Honest copy focused on consistency rather than exaggerated career promises.
- Motion that explains state change: progress fills, checklist updates, celebrations, and gentle contextual reveals.

## Tech Stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS v4 and shadcn-style Radix primitives
- Framer Motion for interaction and scroll motion
- Lucide React for interface icons
- Sonner for lightweight feedback

## Features

- Premium landing experience with social proof, tracks, timeline, outcomes, FAQ, and a sticky mobile CTA.
- Habit dashboard with state previews for active, first-day, missed-day, and empty-profile students.
- Current time, progress ring, weekly heatmap, achievement shelf, momentum board, activity feed, streak shield, and energy check-in.
- Complete Day 12 experience: responsive build preview, learning goals, requirements, resources, workflow, focus timer, screenshot mock, reflection, and community inspiration.
- Local submission persistence: a successful Day 12 submission survives reloads and updates the dashboard state.

## Innovative Ideas Implemented

1. **Midnight Rescue** — appears after 10 PM with a countdown, GitHub quick action, LinkedIn draft copy, and a supportive progress action.
2. **Focus Sprint** — a 25-minute timer with start, pause, reset, and a completion celebration.
3. **AI Reflection Helper** — locally generates an editable, realistic reflection starter.
4. **Streak Shield** — shows one protected miss available every 14 days.
5. **Public Momentum Card** — gives the student a shareable recap and a real downloadable SVG card.
6. **Energy Check-in** — changes the encouragement based on whether the student feels tired, okay, or energized.

## Mobile-First Strategy

The layout stays single-column up to the desktop enhancement breakpoint, avoids horizontal overflow, uses sticky controls for key actions, and reserves space for mobile navigation or submit controls. It includes smooth scrolling, reduced-motion fallbacks, focus states, semantic controls, and high-contrast copy.

## Performance Considerations

- No large images or 3D payloads.
- Route UI is mostly local, mocked data with small interactive client components.
- Animation uses transform/opacity-first patterns and honors `prefers-reduced-motion`.
- Next.js font loading and package import optimization keep the initial experience focused.

## Setup

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run lint
npm run build
```

## Deployment

Deployment placeholder: Vercel or any Node-compatible Next.js host.

## Repository

Repository placeholder: add the public repository URL here before submission.

## Route Map

```text
/
/dashboard
/day/12
```
