# SwiftMedia

A Next.js (App Router, TypeScript) portfolio site for SwiftMedia — a friend-run
design / photography / videography studio — with a minimal password-protected
admin area for uploading new work.

## Stack

- **Next.js** (App Router) — latest release
- **React 19** — latest release
- **TypeScript** — latest release
- Plain CSS (no UI framework), using CSS custom properties and `next/font` for
  self-hosted Google Fonts (Bricolage Grotesque + Inter)
- **Vercel Blob** for storing uploaded photos/videos and the project list
- **jose** for signing the admin session cookie (JWT), **bcryptjs** for the
  admin password hash — no database, no third-party auth service

`package.json` pins every dependency to `"latest"` on purpose, so the first
`npm install` always pulls the newest published release. After that,
`package-lock.json` locks the exact resolved versions for reproducible
builds — from then on, use `npm outdated` / `npm update` (or re-run
`npm install`) whenever you want to pick up newer releases again.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, and
[http://localhost:3000/admin](http://localhost:3000/admin) for the admin area.

**Without any environment variables set**, the public site still renders
fine — it falls back to nine seed projects (the same placeholder work from
the original design) so the site never looks broken. The admin area needs
the variables below to actually work.

## Setting up the admin login and storage

1. **Create a Blob store.** In your Vercel project, go to Storage → Create
   → Blob. Vercel automatically injects `BLOB_READ_WRITE_TOKEN` into your
   deployment once it's attached — you only need to copy it into
   `.env.local` yourself for local development (Storage tab → your store →
   `.env.local` tab has a copyable snippet).
2. **Pick an admin username and password**, then hash the password:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
   ```
   Set `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` (the hash, not the raw
   password) accordingly — in `.env.local` for dev, and in your hosting
   platform's environment variables for production.
3. **Generate a session secret:**
   ```bash
   openssl rand -base64 32
   ```
   Set this as `AUTH_SECRET`.

Once those three variables are set, sign in at `/admin`, add a project
(title, client, category, and an image or video file), and it appears on
the public site immediately — no redeploy needed.

## How the admin area works

- **Auth**: one hardcoded admin account (from env vars), no signup flow, no
  user table. Signing in sets an httpOnly, signed JWT cookie (7-day expiry).
  `middleware.ts` blocks `/admin/*` for anyone without a valid cookie; each
  mutating server action re-checks the session itself too, as defense in
  depth.
- **Uploads**: go straight to Vercel Blob via a server action — images and
  videos up to 90MB (comfortably under the platform's request-body limit for
  serverless functions). For much larger video files you'd want to switch to
  [Vercel Blob's client-direct upload](https://vercel.com/docs/vercel-blob/client-upload),
  which streams straight from the browser instead of through a function.
- **Project data**: stored as a single `data/projects.json` file in the same
  Blob store (no separate database). This is intentionally simple — fine for
  one admin adding work occasionally, not built for concurrent editors.
- **Deleting** a project also deletes its underlying file from Blob.

## Structure

```
app/
  layout.tsx           root layout, fonts, metadata
  page.tsx              server component: fetches projects, renders <PortfolioApp>
  globals.css           the whole design system, including the admin UI
  admin/
    actions.ts           server actions: login, logout, uploadProject, deleteProject
    layout.tsx
    page.tsx              protected dashboard: upload form + project list
    login/page.tsx         sign-in page
components/
  PortfolioApp.tsx        holds view/filter/mobile-drawer state, receives projects as a prop
  Sidebar.tsx / TopNav.tsx / BottomNav.tsx
  HomeView.tsx             hero + filterable project grid; renders real media or a CSS placeholder
  AboutView.tsx / ContactView.tsx
  icons.tsx
  admin/
    LoginForm.tsx
    UploadForm.tsx
data/
  projects.ts             types + the seed/fallback project list
lib/
  auth.ts                 JWT session helpers (jose)
  password.ts              admin password check (bcryptjs)
  projects-store.ts        reads/writes data/projects.json in Blob
middleware.ts             protects /admin/*
```

## Responsive behaviour

- **≥1081px** — full fixed sidebar, 3-column grid.
- **881–1080px** — narrower sidebar, 2-column grid.
- **≤880px** — sidebar becomes a slide-in drawer opened by the hamburger
  button in the top nav (closes on backdrop click, the × button, or Escape;
  background scroll is locked while it's open). Grid drops to 2 columns.
- **≤560px** — 1-column grid, tighter type scale, CTA label collapses to an
  icon-only button. The admin dashboard also restacks to a single column.

## Things to consider before launch

- Point the social links in `Sidebar.tsx` at real accounts.
- Wire `ContactView.tsx`'s form submit to a real send path (a Route Handler,
  Resend, Formspree, etc.) — it currently just shows a local confirmation.
- Rotate `AUTH_SECRET` and the admin password if you ever suspect either
  leaked — this immediately invalidates existing sessions.
- The JSON-file-as-database approach is last-write-wins; if you ever add a
  second admin who'll be uploading concurrently, move `projects-store.ts`
  onto a real database instead.
