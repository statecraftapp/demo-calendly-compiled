# Compiled Bookings — Statecraft demo

A Calendly-style scheduling app demonstrating Statecraft's support for
[Compiled](https://compiledcssinjs.com) (Atlassian's CSS-in-JS). Local-only — no auth, no backend, no real email.

## Stack
- Framework: React 19 + Vite
- Styling: `@compiled/react` + `@compiled/babel-plugin` (babel chained inside `@vitejs/plugin-react`)
- Routing: `react-router-dom`
- Data: YAML seed at `data/seed.yaml`, persisted to `localStorage`
- Date math: `date-fns`
- Bundler: Vite

## Develop
```
pnpm install
pnpm dev
```
Open the printed URL. Navigate via the in-app nav (Event types / Availability) or open a public booking page at `/book/<slug>`.

## Screens
- `/` — Owner dashboard with event-type CRUD and "New event type" modal
- `/book/:slug` — Public booking page (calendar + time-slot grid + invitee form)
- `/booking/:id` — Confirmation page with cancel action
- `/availability` — Per-weekday start/end editor

## Reset data
Click **Reset data** in the topbar, or run `localStorage.clear()` in DevTools.

## Compiled setup notes
Compiled doesn't ship a top-level Vite plugin — its babel plugin nests inside `@vitejs/plugin-react`'s `babel.plugins` array. See `vite.config.ts`:

```ts
react({ babel: { plugins: ['@compiled/babel-plugin'] } })
```

This mirrors how Statecraft's kind:live bundler wires Compiled into its scratch builds (`daemon/core/src/importer/css_engines.rs`, `COMPILED` spec). We use Compiled's `styled` API exclusively (no `css` prop) to avoid needing a `@jsxImportSource` pragma in every file.

## Statecraft publish
On push to `main`, GitHub Actions runs `statecraft publish` and rotates the bundle. The DS slug is `demo-calendly-compiled`. Token lives in repo secret `STATECRAFT_TOKEN`.
