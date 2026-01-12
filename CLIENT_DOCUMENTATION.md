**Kai — Client Documentation**

**Project:** shadcnui (working name in `package.json`)
**Repository path:** `c:\Users\ICTRC\Desktop\kai`
**Created:** December 14, 2025

**Overview:**
- **Purpose:** A marketing + enrollment web application with event listings, contact/enquiry form, and payment link generation. The site is a single-page React app with serverless API endpoints used for contact form handling, Eventbrite integration, and Wise checkout links.
- **Audience:** End users (site visitors), event attendees, and site administrators who manage content and respond to enquiries.

**Key Features:**
- **Public pages:** Home, Events, Enroll (plans), Contact, Credits, Legal.
- **Contact form:** Submits via a serverless API that sends emails (Nodemailer) and protects with optional reCAPTCHA.
- **Event integration:** Eventbrite events endpoint to surface ticketed events.
- **Payment links:** Wise checkout integration to create/send payment links for plans.
- **Localization:** Multi-language support via `i18next` with `locales/en.json`, `es.json`, `fr.json`.
- **Reusable UI:** Built from `shadcn-ui` components and a comprehensive `src/components/ui` folder.

**Tech Stack (high level):**
- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS, shadcn-ui
- **State + Data:** `@tanstack/react-query`, `zustand` (where used)
- **i18n:** `i18next`, `react-i18next`
- **Forms & Validation:** `react-hook-form`, `zod` (for schema validation)
- **Backend (serverless / local dev):** Netlify Functions (`netlify/functions/`), API handlers in `server/api` and `src/pages/api/*`; Express-based `server/dev-server.js` for local API proxying
- **Email & Payments:** `nodemailer` for emails; Wise and Eventbrite integrations in server routes
- **Hosting / Deployment:** Netlify (frontend + functions)

**Project Structure (relevant files/folders):**
- `index.html` — App entry
- `src/` — Frontend source
  - `src/pages/` — Top-level page components (`Index.tsx`, `Events.tsx`, `Contact.tsx`, `Enroll.tsx`, `Credits.tsx`, `Legal.tsx`, `NotFound.tsx`)
  - `src/components/ui/` — UI component library (shadcn-ui)
  - `src/pages/api/` — API handlers for contact, eventbrite, wise-checkout
  - `src/locales/` — JSON localization files
- `server/` — Local dev server and shim for API routes (`dev-server.js`) that proxies requests to the same API handlers used in Netlify functions
- `netlify/functions/` — Serverless functions used in production
- `netlify.toml` — Netlify build and redirect configuration
- `package.json` — Scripts and dependencies

**Routes & API Endpoints (overview):**
- Frontend routes (client-side): `/` (home), `/events`, `/enroll`, `/contact`, `/credits`, `/legal`.
- Server/API routes (serverless):
  - `POST /api/contact` — Contact form submits, sends email using configured SMTP or mail provider.
  - `POST /api/wise-checkout` — Create Wise payment link for plans.
  - `GET /api/eventbrite-events` — Proxy to Eventbrite to fetch events.
  - `GET /api/ms-bookings` — Returns MS Bookings URL if configured.

**Environment Variables & Secrets (summary)**
- The app expects a number of environment variables (do not commit these to source control):
  - Email: `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`, `CONTACT_RECEIVER`, or provider-specific keys like `SENDGRID_API_KEY` / `MAILGUN_API_KEY`.
  - Payment & integrations: `WISE_API_TOKEN` / `WISE_API_KEY`, `EVENTBRITE_CLIENT`, `EVENTBRITE_SECRET`.
  - Microsoft Bookings: `MS_BOOKINGS_URL`.
  - reCAPTCHA: `VITE_RECAPTCHA_SITE` (site key on client), `RECAPTCHA_SECRET` (server secret) — optional if captcha disabled.
  - CMS & misc: `CMS_API_KEY`, `VITE_CONTACT_EMAIL` (or other VITE_* keys used in client builds).
- Example and guidance for `.env.local` are in `README.md` and `DEPLOY_BACKEND.md` — use Netlify Environment settings for production secrets.

**Local Development (quick start, PowerShell)**
- Install dependencies (use `pnpm` if you prefer; `npm` also works):

```powershell
npm install
# or
pnpm install
```

- Start the frontend dev server (Vite):

```powershell
npm run dev
# or
pnpm run dev
```

- Run the local API proxy (recommended for testing server routes):

```powershell
node server/dev-server.js
```

- Alternative: Use Netlify CLI to run frontend + functions locally:

```powershell
npm install -g netlify-cli
netlify dev
```

**Build & Production Deployment (Netlify)**
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- `netlify.toml` contains the build settings and redirects; `/api/*` is redirected to serverless functions.
- Add the environment variables in Netlify site settings as listed above.

**Testing & Quality**
- Lint: `npm run lint` (uses ESLint configured for `./src`)
- No automated test suite found in the repository; consider adding unit and integration tests for:
  - API handlers (contact, wise, eventbrite)
  - Critical frontend flows (contact form, enrollment/payment flow)

**Accessibility & Localization**
- Multi-language support is configured with `i18next`. Translation files live in `src/locales/*.json`.
- Recommend verifying translations with the client and running basic accessibility checks (axe, Lighthouse).

**Maintenance & Handover Notes (for the client)**
- Content updates: Content shown on the homepage and plans may be driven from a CMS (check `CMS_API_KEY` usage). If using a headless CMS, provide CMS credentials and brief walkthrough of editing common content.
- Email settings: Ensure SMTP or chosen provider credentials are set in Netlify environment variables. Test by sending a contact message from a staging site.
- Payments: Wise integration requires `WISE_API_TOKEN` and correct return URLs. Test in sandbox mode before enabling production.
- Eventbrite: Provide Eventbrite credentials to allow the app to fetch events correctly.

**Operational & Security Recommendations**
- Use Netlify environment variables (never commit `.env` files).
- Rotate API keys periodically and use least privilege.
- Enable monitoring/alerting for errors (Sentry or similar) and set up site uptime checks.

**Contacts & Next Steps**
- **Developer:** (please provide preferred developer name/email/phone to include here)
- **Ops:** (provide name for hosting/Netlify admin)

**Files to review for technical detail**
- `package.json` — dependencies and scripts
- `netlify/netlify.toml` and `netlify.toml` — deployment config and redirects
- `server/dev-server.js` — local API shim
- `netlify/functions/*` and `server/api/*` — serverless / API handler implementations
- `src/pages/*` and `src/components/*` — frontend pages and UI

---

If you want, I can:
- Convert this into a PDF or Word doc for client delivery.
- Add a short non-technical executive summary and one-page “how to update content” checklist for non-technical clients.
- Insert real contact names and emails into the document.

Please tell me which next step you prefer or any details you'd like added/removed for the client's audience.