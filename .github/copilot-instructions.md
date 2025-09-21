Project: Social-Media-Website - Copilot Instructions

This file contains concise, actionable guidance for AI coding agents working in this repository.

High-level architecture
- Frontend-only React + Vite TypeScript SPA (no backend in repo). Entry: `src/index.tsx` -> `src/App.tsx`.
- UI composed of small feature modules under `src/modules/*` (Dashboard, Account, Content, Report, Teamwork).
- Shared UI components in `src/components/*` (Header, Footer, Breadcrumb, ThemeSwitcher).
- Global client: `src/services/api.ts` uses `axios.create({ baseURL: 'https://api.example.com' })` — replace `baseURL` when integrating with a real backend.
- Client state: lightweight Zustand store in `src/store/index.ts` (`useAppStore`) for user/theme/notification.

Build / dev / test workflows
- Start dev server: `pnpm|npm|yarn run dev` (package.json uses `vite` on port 3333 by `vite.config.ts`).
- Build: `npm run build` runs `tsc && vite build`.
- Preview build: `npm run preview`.
- Lint: `npm run lint` (ESLint + TypeScript rules).

Project conventions and patterns
- Tailwind is used for styling. See `src/index.css` / `src/App.css` which import `@tailwind base/components/utilities`.
- Keep components small and presentational in `src/components` and place feature screens in `src/modules/*`.
- Routes are simple in-page anchors (e.g. `#account`) inside `App.tsx` — there is no React Router wiring; if adding routing, prefer `react-router-dom` already in deps.
- State management: use `useAppStore` from `src/store/index.ts` for app-wide user, theme, and notification state. Prefer adding focused selector hooks where needed.
- API calls: centralize HTTP logic in `src/services/api.ts`. Use this instance to set interceptors for auth tokens and errors.

Integration points
- Service worker: `src/serviceWorkerRegistration.ts` and `src/service-worker.ts` are present; `serviceWorkerRegistration.unregister()` is called in `src/index.tsx`. If enabling PWA behavior, change to `register()` and follow CRA Workbox notes.
- Analytics/perf: `src/reportWebVitals.ts` is present. To enable logging, call `reportWebVitals(console.log)` from `src/index.tsx`.

File examples and patterns
- Zustand store example: `src/store/index.ts` defines TypeScript `AppState` and `useAppStore`. Use that pattern to expand state with typed actions.
- Axios instance: `src/services/api.ts` demonstrates a default `timeout` and `baseURL`. Example usage: `import api from 'src/services/api'; await api.get('/posts')`.
- Component example: `src/components/Header.tsx` shows usage of `ThemeSwitcher` and avatar image URL; prefer local assets under `/public` (logo192.png).

What AI agents should do and avoid
- Do: keep changes small and local, add or update files under `src/` and wire exports in existing modules. Use TypeScript types where practical and follow current styling (Tailwind classes).
- Do: update `src/services/api.ts` when implementing auth (attach tokens via interceptors), and update `src/store/index.ts` when adding global state.
- Avoid: introducing a complex global framework (Redux) without explicit request — the repo uses Zustand intentionally.
- Avoid: removing service worker files; they are scaffolding for optional PWA behavior.

Quick references
- Start dev server: `npm run dev` (uses `vite`, configured in `vite.config.ts` to open at port `3333`).
- Key files: `src/index.tsx`, `src/App.tsx`, `src/services/api.ts`, `src/store/index.ts`, `vite.config.ts`, `package.json`.

If you update this file
- Merge instead of overwrite if an existing `.github/copilot-instructions.md` exists; preserve any manual guidance.

Follow-up questions for the repo owner
- Which backend endpoints should replace `https://api.example.com`?
- Should the service worker be enabled by default (`register()`)?
