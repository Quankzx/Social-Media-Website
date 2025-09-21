# Frontend TODO Roadmap (30 Categories × 10 Tasks)
Target stack: **React + TypeScript (Vite), Tailwind, Zustand, TanStack Query, Axios**, Chart library, and modern tooling.  
Goal: Complete a production-grade **multi-platform content management** frontend.

> Conventions: PascalCase components, camelCase locals/fields, strict TypeScript, functional components + hooks, accessibility-first, testable and observable.

---

## 1) Project Setup & Standards
1. Create Vite + React + TS project baseline; enable strict mode.
2. Add path aliases, absolute imports, tsconfig base config.
3. Configure ESLint (typescript, react hooks, jsx-a11y) and Prettier.
4. Enable import/order and exhaustive-deps lint rules.
5. Add Husky + lint-staged for pre-commit checks.
6. Configure commitlint + Conventional Commits.
7. Add EditorConfig and recommended VSCode settings.
8. Provide `.env.example` with all FE variables.
9. Create example `.dockerignore` and `.gitignore`.
10. Add Makefile/NPM scripts for dev, build, preview, format, lint, test.

## 2) Type Safety & Models
1. Define core models: Post, PostAsset, PostChannel, ChannelAccount, AnalyticsSnapshot.
2. Add enums: PostStatus, Provider, MediaType, Role.
3. Create API DTOs (request/response) types aligned to backend contracts.
4. Introduce Zod schemas mirroring DTOs for runtime validation.
5. Provide type guards for uncertain provider payloads.
6. Add Result/Either utility types for safe returns.
7. Centralize date/time types (UTC vs local) with helpers.
8. Introduce branded IDs (PostId, TenantId) for safer refs.
9. Create pagination types (Paged<T>, PageQuery).
10. Write fixtures/factories for tests and storybook.

## 3) State Management (Zustand)
1. Create root store with slices: auth, posts, channels, media, analytics, ui.
2. Implement immutable updates and selectors to prevent re-renders.
3. Persist auth slice (sessionStorage) with migration strategy.
4. Add reset actions per slice for logout.
5. Provide hydration guard for SSR/CSR parity.
6. Define async actions as thin wrappers around service layer.
7. Add devtools middleware in dev only.
8. Normalize entities with ids map + list ordering.
9. Integrate broadcast channel for multi-tab logout.
10. Add store unit tests for reducers/actions.

## 4) Data Fetching (TanStack Query)
1. Configure QueryClient with sensible staleTime/cacheTime per entity.
2. Implement query keys factory (`queryKeys.posts`, `channels`, `analytics`).
3. Create hooks: `usePosts`, `usePost(id)`, `useChannels`, `useAnalytics`.
4. Implement mutations: create/update/schedule/publish post.
5. Add optimistic updates with rollback on failure.
6. Enable request deduplication and background refetch.
7. Add pagination & infinite queries for lists.
8. Expose query invalidation utilities by entity scope.
9. Surface network status (isFetching) to global topbar.
10. Add TanStack Query devtools in dev builds.

## 5) API Client (Axios)
1. Create axios instance with baseURL from env.
2. Add auth header injection via interceptor.
3. Implement refresh-token interceptor with request queueing.
4. Map backend ProblemDetails → FE error shape.
5. Implement retry for 502/503; do not retry 4xx.
6. Timeouts per request; cancel tokens for unmount.
7. Upload helpers with progress callbacks.
8. Binary/CSV download helpers.
9. Centralize error logging hooks.
10. Add e2e mocked API via MSW for local testing.

## 6) Authentication (UI & Flow)
1. Build Login page + form validation (Zod + RHF).
2. Handle access/refresh token storage (httpOnly if proxy; fallback memory+session).
3. Implement auto-refresh flow and token rotation.
4. Guard private routes with `<ProtectedRoute>`.
5. Implement logout (local + server revoke) and force logout on 401.
6. Show login-required banner when token missing.
7. Add profile dropdown with tenant selector.
8. Persist last-tenant selection.
9. Handle token scope errors with clear messaging.
10. Add “impersonation mode” notice (if supported).

## 7) Authorization & RBAC (FE)
1. Define Role enum and permission matrix per feature.
2. Create `useAbility()` hook to check permissions.
3. Add `RequirePermission` component to gate UI controls.
4. Disable/tooltip actions when lacking permission.
5. Hide routes from nav if unauthorized.
6. Load user roles/claims on login and cache.
7. Support per-tenant roles switching.
8. Add test cases for gating logic.
9. Log denied actions for telemetry.
10. Provide demo seeds for each role in Storybook.

## 8) Routing & Navigation
1. Set up React Router v6 with code-splitting routes.
2. Define route map: /login, /dashboard, /content, /calendar, /media, /reports, /team, /settings.
3. Add route guards & pending UI while loading user.
4. Preserve query params across navigations where relevant.
5. Use URL states for filters/pagination.
6. Scroll restoration and focus management on route change.
7. 404/403 pages with helpful actions.
8. Handle trailing slashes and base paths.
9. Add breadcrumbs component.
10. Test deep-links and invalid ids behaviors.

## 9) Design System & Components
1. Establish Tailwind config (spacing, colors, radius, shadows).
2. Build primitives: Button, Input, Textarea, Select, Switch, Badge, Tooltip.
3. Layout components: Page, Card, Modal, Drawer, Tabs.
4. Data components: Table, EmptyState, Skeleton, Pagination.
5. Feedback: Toast, Alert, InlineError, LoadingBar.
6. Icon system with lucide-react; create Icon wrapper.
7. Avatar/Presence/Assignee components.
8. Keyboard & focus states for all controls.
9. Create component docs with Storybook.
10. Add visual regression tests (Storybook/Chromatic optional).

## 10) Theming & Dark Mode
1. Configure CSS variables for light/dark tokens.
2. Add theme toggle persisted in local storage.
3. Respect OS prefers-color-scheme by default.
4. Ensure charts/themes respond to mode.
5. Provide high-contrast theme option.
6. Themed shadows/borders/gradients consistent.
7. Document color usage & accessibility contrast.
8. Snapshot tests for theming variants.
9. No FOUC: apply theme class early in index.html.
10. Provide ThemeProvider with context hook.

## 11) Accessibility (a11y)
1. Use semantic HTML and landmark regions.
2. Ensure focus order & visible focus outlines.
3. Add aria-labels/roles for interactive elements.
4. Escape/close modals on Esc and click outside.
5. Manage focus trap inside dialog/drawer.
6. Provide skip-to-content link.
7. Keyboard shortcuts for common actions.
8. Screen reader live regions for toasts.
9. Color contrast ≥ WCAG AA.
10. Automated a11y tests with axe-core.

## 12) Internationalization (i18n)
1. Integrate i18next with ICU message format.
2. Organize translation files by domain/screen.
3. Lazy-load namespaces per route.
4. Locale switcher UI + persist choice.
5. Date/time/number formatting helpers.
6. RTL support baseline (dir attribute).
7. Do not translate keys in code; use descriptors.
8. Extract hardcoded text to resources.
9. Fallback locale and missing key logging.
10. Pseudo-localization environment for QA.

## 13) Forms & Validation
1. Add React Hook Form + Zod resolvers.
2. Compose reusable FormField component.
3. Inline validation and submit validation states.
4. Normalize server errors into RHF error bag.
5. Async validation (e.g., unique handle).
6. Prevent double submit; loading states on actions.
7. Draft autosave with debounce.
8. Undo/redo for editors where feasible.
9. Reset form on success with notifications.
10. Unit tests for complex validation rules.

## 14) Post Editor (Multi-Platform)
1. Create provider-aware form (caption, tags, media, link).
2. Enforce provider rules (max length, hashtags, mentions).
3. Live character counter per provider.
4. Attach multiple assets with ordering.
5. Preview per-channel (layout hints).
6. Save as draft and create new version.
7. Schedule with timezone & calendar picker.
8. Assign reviewers and mention teammates.
9. Show validation errors before scheduling/publish.
10. Optimistic UI on save; rollback on fail.

## 15) Media Library
1. Grid/list view with search, filter (type/date/owner).
2. Upload UI with drag & drop; progress bars.
3. Client-side checks: size, type, aspect ratio.
4. Generate thumbnails for images/videos (where possible).
5. Tagging and favorite/star assets.
6. Bulk select and batch operations (delete/move/tag).
7. Show usage: where an asset is referenced.
8. Link to storage (presigned preview).
9. Lazy-load & virtualized list for large libraries.
10. Keyboard navigation and shortcuts.

## 16) Calendar & Scheduling UI
1. Monthly/weekly/daily views with virtualization.
2. Drag to create schedule; resize to change time.
3. Drag & drop posts between slots.
4. Color coding by status/provider.
5. Filter by channel/account/assignee.
6. “Conflicts” detection (overlaps, quota).
7. Quick editor modal from calendar cell.
8. Jump to today/next week; range picker.
9. Export calendar as ICS (client-side).
10. Print-friendly schedule view.

## 17) Channel Account Linking
1. Accounts page listing all linked channel accounts.
2. Connect flow button → opens backend OAuth URL.
3. Display account metadata (name, page/channel).
4. Handle connect/cancel/error redirects.
5. Refresh token button and status indicator.
6. Disconnect account with confirm dialog.
7. Filter posts by channel account.
8. Tag account with team/project.
9. Badge account state (active/expired).
10. Empty state and help links per provider.

## 18) Provider Rules & Config
1. Centralize provider config (limits, features, fields).
2. Provide `useProviderRules(provider)` hook.
3. Conditional fields in editor per provider.
4. Hint texts/tooltips reflecting rules.
5. Block schedule/publish if rules not met.
6. Serialize payloads per provider shape.
7. Store last-used provider selection per user.
8. Feature flags to toggle beta providers.
9. Unit tests for rules across providers.
10. Visual docs page for provider differences.

## 19) Error Handling & Observability
1. Global ErrorBoundary with fallback UI.
2. Map API errors to human messages.
3. Toasts for mutation outcomes (success/failure).
4. Log errors to Sentry/OTEL exporter.
5. Add correlation id header to requests and display trace id in errors.
6. Track soft-fail validations as events.
7. Network offline/online banners.
8. Retry UI for transient failures.
9. Capture unhandled promise rejections.
10. Redact PII in logs by default.

## 20) Notifications & Activity
1. Central notifications drawer (assignments, approvals, comments).
2. Real-time updates via SSE/WebSocket (if available).
3. In-app mention notifications from comments.
4. Mark-as-read and filters (type/priority).
5. Email/web push preference toggles.
6. Link notifications to context (open post/editor).
7. Batch mark-as-read action.
8. Badge counters in navbar.
9. Store notifications in Zustand slice.
10. Unit tests for deduplication and ordering.

## 21) Performance & Caching
1. Code-split heavy routes (editor, reports).
2. Preload next routes on hover/intent.
3. Memoize heavy components and selectors.
4. Virtualize long lists/tables.
5. Use `React.memo` and stable callbacks.
6. Image lazy-loading and srcset sizes.
7. Cache frequently used queries with long staleTime.
8. Avoid unnecessary re-renders via keying and context boundaries.
9. Measure with React Profiler and Web Vitals.
10. Add Lighthouse CI budget checks.

## 22) Offline & Resilience
1. Add network status hook and UI banners.
2. Queue mutations offline and replay when online (basic).
3. Cache last N pages for read-only offline view.
4. Protect from double actions on reconnect.
5. Graceful degradation of charts/media.
6. Persist forms drafts locally.
7. Handle clock skew in scheduling UIs.
8. Idempotent buttons (disable until settled).
9. Retry with backoff for selected operations.
10. Document offline limitations.

## 23) Frontend Security
1. Sanitize user content (DOMPurify for risky HTML).
2. Escape/encode dynamic text in templates.
3. Enforce Content Security Policy docs (if app shell serves).
4. Avoid storing tokens in localStorage when possible.
5. SameSite and Secure flags for cookies (if used).
6. Mask secrets in logs and network panel (avoid logging tokens).
7. Use Subresource Integrity for external scripts (if any).
8. Clickjacking protection via frameguard (docs/proxy).
9. Prevent XSS via React best practices (no dangerouslySetInnerHTML).
10. Review dependency vulnerabilities regularly.

## 24) Analytics & Reports UI
1. Build charts for reach/likes/comments/shares/impressions.
2. Provide filters: date range, channel, campaign, tag.
3. Add compare mode (period over period).
4. Show top-performing posts and outliers.
5. Export CSV/PNG from charts.
6. Empty/error/loading states for charts.
7. Tooltips/legends responsive to theme.
8. Print view for reports.
9. Save report presets per user.
10. Snapshot caching to minimize API load.

## 25) Lists: Pagination/Filter/Sort
1. Implement reusable DataTable with columns config.
2. Server-driven pagination with total count.
3. Persist table state in URL (page, size, sort).
4. Column sort and multi-filter chips.
5. Quick search with debounce.
6. Select rows + batch actions.
7. Sticky header and responsive columns.
8. Empty state and no-results variants.
9. CSV export for current result set.
10. Keyboard navigation between rows.

## 26) File Upload UX
1. Drag & drop zone with file picker fallback.
2. Validate type/size and show warnings.
3. Client-side image compression (optional).
4. Chunked uploads with resume (if backend supports).
5. Show per-file progress, pause/cancel.
6. Parallelism with concurrency limit.
7. Thumbnails preview for images/videos.
8. Retry failed chunks with exponential backoff.
9. Graceful cancel on route change/unmount.
10. Accessibility: label, descriptions, focus.

## 27) Unit Testing (FE)
1. Configure Vitest + Testing Library.
2. Add test utilities: renderWithProviders.
3. Snapshot tests for pure presentational components.
4. Test hooks (store, queries) with MSW.
5. Test forms validation/error mapping.
6. Test optimistic updates and rollbacks.
7. Test routing guards and redirects.
8. Test error boundary fallbacks.
9. Achieve ≥80% coverage for critical modules.
10. Add coverage gating in CI.

## 28) E2E Testing
1. Set up Playwright with project config.
2. Auth helpers to obtain tokens programmatically or mock.
3. E2E for login/logout and protected routes.
4. E2E create draft → schedule → publish happy path.
5. E2E media upload and attach to post.
6. E2E calendar drag/drop scheduling.
7. E2E reports filters and export.
8. Visual regression on key pages (optional plugin).
9. Trace viewer on failures in CI.
10. Parallelize tests with artifacts retention.

## 29) CI/CD & Quality Gates (FE)
1. GitHub Actions workflow: install, lint, typecheck, test, build.
2. Cache pnpm/npm and vite build output.
3. Fail on lint or type errors; upload coverage.
4. Run MSW-based tests in headless CI.
5. Lighthouse CI for performance budgets.
6. Upload build artifacts (static bundle).
7. Environment matrix (dev/staging/prod) variables.
8. Dependency review and Dependabot alerts.
9. SAST on JS/TS (CodeQL) baseline.
10. Release notes from Conventional Commits.

## 30) Documentation & DX
1. Write CONTRIBUTING.md (branching, commits, PR checks).
2. Create ARCHITECTURE.md (state, data flow, modules).
3. Document ENV variables and their meanings.
4. Add API client README mapping endpoints to hooks.
5. Describe error taxonomy and UX patterns.
6. Storybook docs for complex components and patterns.
7. Onboarding script: `pnpm dev` with seeded data via MSW.
8. Add troubleshooting guide (ports, CORS, SSL).
9. Changelog with semantic versioning.
10. Roadmap and ownership map (who maintains what).

---

## How to Use
- Tackle categories **P0 → P1 → P2** based on product priorities.
- Convert each category into GitHub Issues with labels: `area/*`, `priority/*`, `type/*`.
- Track progress in a project board (Backlog → In Progress → Review → Done).

Happy building! 🚀
