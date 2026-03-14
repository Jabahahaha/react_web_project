# Sports Scoreboard

A React + TypeScript application for browsing live scores, filtering games by sport and status, and favoriting games across multiple sports leagues.

## Features

- Browse games across football, basketball, tennis, and hockey
- Live score display with real-time status indicators (live, scheduled, finished)
- Filter games by sport and game status
- Favorite games with a persistent toggle on cards and detail views
- Game detail page with full score breakdown and winner display
- Responsive grid layout that adapts to screen size
- Dark theme with custom MUI palette

## Architecture Overview

The project follows a **domain-based file organization** with the **modlet pattern** for components and pages.

```
src/
  games/                          # Game domain
    api/                          # Async data-fetching functions
    components/                   # Game-specific UI (modlets)
      GameCard/
      GameList/
      ScoreboardHeader/
    context/                      # Favorites & Filter context/providers
    hooks/                        # Domain hooks (useGames, useFilter, useFavorites)
    types.ts                      # Game data types (Game, Team, Sport, GameStatus)
    scoreboard.ts                 # Pure business logic (getWinner, formatScore, filterGames)
  pages/                          # Route-level page modlets
    HomePage/
    GameDetailPage/
  shared/                         # Cross-cutting, reusable utilities
    components/
      ErrorBoundary/
  App.tsx                         # Layout shell (AppBar + Outlet)
  main.tsx                        # Entry point, providers, routing
  theme.ts                        # MUI theme configuration
```

**Key design decisions:**

- **Separation of concerns:** Business logic lives in `games/scoreboard.ts` (pure functions, fully unit-tested). Data fetching lives in `games/api/`. Rendering logic stays in components. App state is managed via React Context (Favorites, Filter) and TanStack Query (server cache).
- **Services-hooks pattern:** API functions (`api/games.ts`) are consumed through custom hooks (`hooks/useGames.ts`) using TanStack Query's `useSuspenseQuery`, with `Suspense` boundaries for loading states.
- **Scoped state:** `FilterContext` is only provided inside `HomePage`, not globally, preventing data leakage to unrelated parts of the app.
- **Type safety:** All data structures are defined upfront in `games/types.ts`. Strict TypeScript is enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`).

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling and dev server
- **MUI (Material UI)** for component library and theming
- **TanStack Query** for data fetching and server state
- **React Router v7** for client-side routing
- **Vitest** + **Testing Library** for unit and integration tests

## Getting Started

```bash
npm install
npm run dev          # Start dev server at http://localhost:5173
```

## Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start Vite dev server                              |
| `npm run build` | Type-check and build for production                |
| `npm run lint`  | Run all quality checks (tsc, eslint, prettier, depcheck) |
| `npm test`      | Run all tests with Vitest                          |

## CI/CD

The project uses GitHub Actions (`.github/workflows/ci.yml`):

- **CI:** Runs `npm run lint` and `npm test` on every push/PR to `main`
- **CD:** Builds and deploys to GitHub Pages on pushes to `main`
