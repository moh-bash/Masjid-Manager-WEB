# مسجدي — Masjid Manager Web

A bilingual-ready, Arabic-first (RTL) web application for managing mosque students and Quran circles in the town.

The platform connects four types of users — **system admins**, **mosque managers**, **circle teachers**, and **parents** — giving each role a tailored dashboard for managing mosques, Quran circles, students, attendance, and parent-facing reports.

---

## Features

### Public
- Landing page with mosque information and announcements (posts)
- Browse mosques with location maps (Leaflet)
- Read mosque posts / announcements
- Register and log in

### Dashboard — role-based
| Role | Route | Capabilities |
| --- | --- | --- |
| `SYSTEM_ADMIN` | `/admin` | Manage mosques, users, posts, and view reports/settings |
| `MOSQUE_MANAGER` | `/mosque/[mosqueId]` | Manage circles and students within a mosque; transfer students |
| `CIRCLE_TEACHER` | `/teacher/[circleId]` | Manage circle students and record daily attendance with reports |
| `PARENT` | `/parent` | Link to a student and view their attendance/performance |

---

## Tech Stack

- **Framework**: Next.js 16.3.2 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (custom `@theme` palette, no `tailwind.config.*`)
- **Validation**: Zod schemas
- **HTTP**: Axios
- **Maps**: Leaflet + react-leaflet
- **Content**: MDX Editor + react-markdown (GFM)
- **Icons**: Lucide
- **Auth**: JWT (httpOnly cookie server-side + `localStorage` fallback on the client)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A running backend API that this frontend consumes (the repo only ships the web app)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file at the project root (see `.gitignore` — `.env*` files are not committed):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> `NEXT_PUBLIC_API_URL` must point to the backend API base URL.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint (`next core-web-vitals` + TypeScript rules) |

> There is no test framework or `tsc`/`prettier`/`format` script configured. To type-check manually: `npx tsc --noEmit`.

---

## Project Structure

```
app/
  (public)/              # Unauthenticated pages (landing, login, register, mosques, posts)
  (dashboard)/           # Protected, role-gated routes
    admin/               #   /admin      → SYSTEM_ADMIN
    mosque/[mosqueId]/   #   /mosque/... → MOSQUE_MANAGER
    teacher/[circleId]/  #   /teacher/... → CIRCLE_TEACHER
    parent/              #   /parent     → PARENT
  layout.tsx             # Root layout (RTL, Arabic, Tajawal font)
  globals.css            # Tailwind v4 entry + custom @theme palette
components/              # UI organized by domain (home, dashboard, mosque, student, ...)
config/
  dashboard-navigation.ts  # Role-based sidebar navigation
context/
  toast.tsx                # useToast() hook + ToastProvider
lib/
  api/
    client.ts              # api (public) + apiClient (auth-attached) axios instances
  features/                # Domain modules:
    auth/ circle/ attendance/ student/ mosque/ parent/ post/ map/
      types.ts             #   TypeScript interfaces
      schema(s)/           #   Zod validation schemas
      services/            #   Server actions / API calls
  types.ts                 # Shared pagination types
```

### Module Convention

Each domain under `lib/features/*` follows the same pattern:

```
lib/features/<domain>/
  types.ts          # Domain types
  schemas/          # Zod schemas for validation
  services/         # API service functions (server actions)
```

---

## Conventions & Architecture Notes

- **RTL Arabic UI** — `<html lang="ar" dir="rtl">`, Tajawal font for Arabic and Geist Mono for code.
- **Server Components by default** — use `"use client"` only when interactivity is needed; API services use `"use server"`.
- **Path alias** — `@/*` maps to the project root.
- **State of data** — the app fetches directly from the backend API; dashboard pages opt out of caching with `export const dynamic = "force-dynamic"`.
- **Toast feedback** — UI feedback via `useToast()` from `context/toast`.
- **Validation** — all form input is validated with Zod before submission.
- **Auth flow** — tokens are read from an httpOnly cookie (server) or `localStorage` (client). `apiClient` attaches the Bearer token automatically and redirects to `/login` on `401`.
- **Remote images** — allowed hosts are configured in `next.config.ts` (`i.pravatar.cc`, `images.unsplash.com`, `cdn.sanity.io`, `quran.com`, `res.cloudinary.com`, `i.pinimg.com`).

---

## Deployment

### Vercel

The app is fully compatible with the [Vercel Platform](https://vercel.com/new):

1. Push the repository to GitHub and import it into Vercel.
2. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to the production backend.
3. Deploy — the framework preset detects Next.js automatically.

### Self-hosting

```bash
npm run build
npm run start
```

Then serve the request on port 3000 (or set `PORT`) behind a reverse proxy, and make sure the backend API is reachable from the server.

---

## License

All rights reserved — internal project. Not open source.