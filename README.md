# FinFlow — Expense Intelligence Dashboard

A financial expense management dashboard built to demonstrate production-quality React and TypeScript architecture.

**Live demo:** https://finflow-navy.vercel.app

## Features

- Transaction table with sorting, filtering, and pagination
- Filter by category, status, and search query
- Summary cards showing total spend, pending count, average transaction, and top merchant
- Budget tracker with per-category progress bars
- Mock API layer with simulated network latency and error states
- Skeleton loading states and empty states
- Fully typed with TypeScript strict mode

## Tech Stack

- React 18
- TypeScript (strict mode)
- Vite
- Tailwind CSS

## Architecture Decisions

- **Money stored in cents** — avoids floating point arithmetic errors
- **Discriminated union for async state** — makes invalid states unrepresentable
- **Custom hooks** — all stateful logic extracted from components
- **Mock API layer** — swappable with a real backend without touching UI code
- **`useEffect` cleanup** — prevents stale data from race conditions

## Running locally
```bash
npm install
npm run dev
```