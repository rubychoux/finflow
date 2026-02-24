# FinFlow

A financial expense management dashboard built with React, TypeScript, and Vite.

**Live demo:** https://finflow-navy.vercel.app

![FinFlow Dashboard](screenshot.png)

## Features

- Transaction table with multi-column sorting
- Filter by category, status, date range, and keyword search
- Summary cards — total spend, pending count, average transaction, top merchant
- Budget tracker with color-coded progress bars per category
- Export filtered transactions to CSV
- Skeleton loading states and empty states
- Mock API layer with simulated network latency

## Tech Stack

- React 18
- TypeScript (strict mode)
- Vite
- Tailwind CSS

## Architecture Decisions

- **Money in cents** — all amounts stored as integers to avoid floating point errors
- **Discriminated union async state** — impossible to have loading + data simultaneously
- **Custom hooks** — stateful logic separated from presentation components
- **Mock API layer** — mirrors a real API contract, swappable without touching UI
- **useEffect cleanup** — cancels stale requests to prevent race conditions

## Running Locally
```bash
npm install
npm run dev
```