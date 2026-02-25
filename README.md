# FinFlow

A financial expense management dashboard built to demonstrate production-quality React and TypeScript architecture in Ramp's core product domain.

**Live demo → https://finflow-navy.vercel.app**

![FinFlow Dashboard](screenshot.png)

---

## Overview

FinFlow simulates the kind of expense intelligence interface finance teams use daily. It handles 200 transactions across a 90-day period with real-time filtering, sorting, pagination, budget tracking, and data export — built with the same architectural principles used in production fintech systems.

---

## Features

- **Transaction table** — sort by merchant, date, or amount with instant visual feedback
- **Multi-layer filtering** — filter by category, status, date range, and keyword simultaneously
- **Summary cards** — total cleared spend, pending count, average transaction, and top merchant by volume
- **Budget tracker** — per-category spend vs. limit with color-coded progress bars (green → amber → red)
- **Transaction detail modal** — click any row for full transaction details, close with Escape or backdrop click
- **CSV export** — exports the current filtered result set, not just the visible page
- **Keyboard shortcut** — press `/` anywhere to focus search
- **Skeleton loading states** — layout-preserving placeholders during data fetches
- **Error handling** — graceful error banner with full recovery path
- **Seeded mock data** — consistent transactions across refreshes for reliable demos

---

## Architecture

The core of this project isn't the features — it's the decisions underneath them.

### Money stored in cents

All amounts are integers. `$12.50` is stored as `1250`. Floating point arithmetic is unreliable for financial data (`0.1 + 0.2 === 0.30000000000000004`). Converting to a display string happens only at render time, in one place.

### Discriminated union for async state

Instead of separate `isLoading` and `error` booleans, all async state uses a discriminated union:
```typescript