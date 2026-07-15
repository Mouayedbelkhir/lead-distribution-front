# Lead Distribution Frontend

## Project Overview

This repository contains the **Next.js 16** frontend for the Lead Distribution System. It provides an admin dashboard for managing clients, verticals, delivery rules, leads, and real-time distribution statistics. The application communicates with the Lead Distribution Backend API through REST endpoints and is intentionally kept as a thin, responsive UI layer.

## Features

- **Authentication** — JWT-based login with token persistence and automatic logout on 401/403 responses.
- **Protected Dashboard** — Route groups guard authenticated views and redirect unauthenticated users to login.
- **Client Management** — Create, update, and deactivate client accounts.
- **Vertical Management** — Manage business verticals used to categorize leads and deliveries.
- **Delivery Management** — Configure delivery rules with age ranges, postal codes, time slots, capacity, and price.
- **Lead Management** — Submit leads, view distribution status, and browse paginated lead history.
- **Lead Distribution Simulation** — Preview eligible deliveries for a lead without persisting it.
- **Dashboard Statistics** — High-level KPIs including distribution rate, revenue, and capacity utilization.
- **Responsive Interface** — Bootstrap-styled tables, forms, and buttons that work across screen sizes.
- **Reusable UI Component System** — Shared components under `src/components/ui` and `src/components/client` reduce duplication.

## Tech Stack

- **Next.js 16** — App Router, React 19, standalone output.
- **React 19** — UI library.
- **Bootstrap 5** — CSS framework.
- **Redux** — Client-side application state management for authentication and UI state.
- **React Query (TanStack Query)** — Server state caching and synchronization.
- **Axios** — HTTP client with request/response interceptors for JWT injection and 401 handling.
- **React Hook Form** — Form state management.
- **Lucide React** — Icon set.

## Architecture

The frontend follows Next.js App Router conventions:

- **Server Components by default** — Pages render on the server unless interactivity is required.
- **Client Components only when required** — Forms, auth redirects, and data tables use client directives where necessary.
- **Feature-based structure** — Each domain (`auth`, `clients`, `verticals`, `deliveries`, `leads`, `dashboard`) owns its components, hooks, services, and schemas.
- **Server state** is managed by React Query via `QueryProvider`.
- **UI/auth display state** is managed by Redux via `ReduxProvider`.
- **Shared reusable UI components** live in `src/components/ui` and `src/components/client`.
- **API layer** is centralized in `src/lib/api.js`, which attaches the Bearer token from `localStorage` and dispatches logout on auth errors.

## Folder Structure

```
lead-distribution-front/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   │   ├── (auth)/      # Login route group
│   │   └── (dashboard)/ # Protected dashboard route group
│   ├── components/      # Shared reusable components
│   │   ├── client/
│   │   └── ui/
│   ├── constants/       # Application constants
│   ├── features/        # Domain-specific modules
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── dashboard/
│   │   ├── deliveries/
│   │   ├── leads/
│   │   └── verticals/
│   ├── lib/             # API client and auth helpers
│   ├── providers/       # React context providers (Redux, Query, Toast)
│   ├── store/           # Redux store, actions, reducers, types
│   ├── styles/          # Global and component styles
│   └── utils/           # Utility functions
├── .env.example
├── Dockerfile
└── package.json
```

## Application Pages

The application uses Next.js App Router route groups to separate public and authenticated pages.

| Route | Description |
|---|---|
| `/login` | Public login page. |
| `/dashboard` | Main dashboard with summary statistics. |
| `/dashboard/clients` | Client management page. |
| `/dashboard/verticals` | Vertical management page. |
| `/dashboard/deliveries` | Delivery rule management page. |
| `/dashboard/leads` | Lead submission, simulation, and listing page. |

## Installation

1. Ensure Node.js 22+ and the backend API are running.
2. Install dependencies:

```bash
npm install
```

3. Copy the environment example:

```bash
cp .env.example .env.local
```

4. Update `.env.local` if your backend runs on a different host or port.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the backend API (e.g. `http://localhost:4000/api/v1`). |

See `.env.example` for the default value.

## Running in Development

```bash
npm run dev
```

The application starts on [http://localhost:3000](http://localhost:3000).

## Production Build

Build the standalone output:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

The Next.js configuration uses `output: 'standalone'` to optimize the production Docker image and reduce the final container size. Container orchestration is handled separately from this repository.

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Start the development server. |
| `build` | `next build` | Create an optimized production build. |
| `start` | `next start` | Start the production server. |
| `lint` | `eslint` | Run ESLint across the codebase. |

## Quality Checks

Before submitting changes, validate the codebase with:

```bash
npm run lint
npm run build
```

`npm run lint` checks code style with ESLint. `npm run build` creates an optimized production build and verifies that the application compiles successfully.

## Deployment

Docker Compose deployment is maintained separately from this repository. The deployment configuration contains:

- `docker-compose.yml`
- Environment configuration
- Production orchestration scripts

This repository (`lead-distribution-front`) only provides the frontend `Dockerfile`. Do not run `docker-compose` commands from this folder; use the deployment configuration instead.

## Troubleshooting

- **401 errors / redirect loops**: Verify `NEXT_PUBLIC_API_URL` points to the running backend and that the JWT token has not expired.
- **Build fails in Docker**: Ensure `NEXT_PUBLIC_API_URL` is passed as a build argument; public env vars are baked at build time in Next.js.
- **CORS errors**: The backend `FRONTEND_URL` must match this frontend's origin.
