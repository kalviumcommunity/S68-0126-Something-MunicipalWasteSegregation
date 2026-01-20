# WasteWise - Municipal Waste Segregation System

A community-driven platform for tracking and improving municipal waste management through collaborative efforts between households, waste collectors, and municipal authorities.

## Problem Statement

Ineffective municipal waste management due to the lack of tracking and accountability for waste segregation at the source. This system enables real-time monitoring, issue reporting, and data-driven decision making.

## Project Structure

```
web/
├── app/
│   ├── page.tsx                    # Landing page (SSG)
│   ├── layout.tsx                  # Root layout
│   ├── about/page.tsx              # About page (SSG)
│   ├── education/page.tsx          # Educational content (SSG)
│   ├── faq/page.tsx                # FAQ page (SSG)
│   ├── dashboard/
│   │   ├── page.tsx                # Dashboard selector (SSR)
│   │   ├── household/page.tsx      # Household dashboard (SSR)
│   │   ├── collector/page.tsx      # Collector validation (SSR)
│   │   ├── authority/page.tsx      # Authority dashboard (SSR)
│   │   └── reports/page.tsx        # Issue reporting (SSR)
│   └── statistics/
│       ├── page.tsx                # Ward statistics (ISR - 5 min)
│       ├── leaderboard/page.tsx    # Community leaderboard (ISR - 10 min)
│       └── events/page.tsx         # Events & drives (ISR - 1 hour)
```

## Rendering Strategies

### Static Rendering (SSG)
**Best for:** Content that doesn't change frequently and doesn't depend on user-specific data.

| Page | Purpose |
|------|---------|
| `/` | Landing page with program overview |
| `/about` | About the initiative |
| `/education` | Waste segregation guidelines |
| `/faq` | Frequently asked questions |

**Benefits:** Fast load times, SEO-optimized, cached at CDN edge.

### Dynamic Rendering (SSR)
**Best for:** Real-time, user-specific, or frequently changing data.

| Page | Purpose |
|------|---------|
| `/dashboard` | Role selection dashboard |
| `/dashboard/household` | Household segregation scores |
| `/dashboard/collector` | Collector validation screens |
| `/dashboard/authority` | Live reports and heatmaps |
| `/dashboard/reports` | Community issue feeds |

**Implementation:** Uses `export const dynamic = "force-dynamic"` to ensure fresh data on every request.

### Hybrid Rendering (ISR)
**Best for:** Data that should be periodically refreshed without requiring real-time updates.

| Page | Revalidation | Purpose |
|------|--------------|---------|
| `/statistics` | 5 minutes | Ward-level segregation statistics |
| `/statistics/leaderboard` | 10 minutes | Community rankings |
| `/statistics/events` | 1 hour | Awareness drives and events |

**Implementation:** Uses `export const revalidate = <seconds>` for periodic regeneration.

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 👥 Stakeholders

- **Households:** Track segregation scores, report issues, earn recognition
- **Waste Collectors:** Validate segregation quality, manage routes
- **Municipal Authorities:** Access analytics, heatmaps, and performance data

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **React:** v19