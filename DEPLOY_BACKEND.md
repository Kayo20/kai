# Deploying to Netlify (Frontend + Serverless Functions)

Overview
- The frontend and API are both deployed to Netlify.
- API routes are deployed as Netlify Functions under `netlify/functions/`.
- A `_redirects` file maps `/api/*` requests to the serverless functions.

Quick Start
1. Push your code to GitHub (or connect your repo to Netlify directly).

2. Log in to Netlify and connect your repository:
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider (GitHub, GitLab, Bitbucket)
   - Choose your repository and branch

3. Build settings should auto-detect:
   - Build command: `npm run build` (or `pnpm run build`)
   - Publish directory: `dist`
   - If not auto-detected, set these manually

4. Add environment variables in Site settings:
   - Go to Site settings → Build & deploy → Environment → Environment variables
   - Click "Add environment variable" and add each key from `.env.example`:
     - `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`, `CONTACT_RECEIVER`
     - `EVENTBRITE_CLIENT`, `EVENTBRITE_SECRET`
     - `WISE_API_TOKEN`
     - `MS_BOOKINGS_URL`
     - (Optional) `VITE_RECAPTCHA_SITE`, `RECAPTCHA_SECRET` if re-enabling captcha

5. Deploy by pushing to your connected branch, or click "Deploy site" in Netlify dashboard.

Testing locally before deploying
- Install Netlify CLI:

```bash
npm install -g netlify-cli
```

- Copy `.env.example` to `.env` and fill in your values (do NOT commit `.env`):

```powershell
copy .env.example .env
notepad .env    # fill in your secrets, save and close
```

- Test locally with functions:

```bash
netlify dev
```

- Open http://localhost:8888 in your browser. The frontend and serverless functions will run together locally.

Environment variables
- Required keys (add these to Netlify Site settings → Build & deploy → Environment):

  - `MAIL_HOST`: SMTP host (e.g. `smtp.postmarkapp.com`)
  - `MAIL_PORT`: SMTP port (e.g. `587`)
  - `MAIL_USERNAME`: SMTP username
  - `MAIL_PASSWORD`: SMTP password
  - `MAIL_FROM`: From address used in outgoing emails (e.g. `"Kai <no-reply@yourdomain.com>"`)
  - `CONTACT_RECEIVER`: Email that receives contact form submissions
  - `EVENTBRITE_CLIENT`: Eventbrite client ID
  - `EVENTBRITE_SECRET`: Eventbrite client secret
  - `WISE_API_TOKEN`: Wise API token (or placeholder if using simple send-link)
  - `MS_BOOKINGS_URL`: Microsoft Bookings URL used for the Book Meeting button
  - `VITE_RECAPTCHA_SITE` (optional): reCAPTCHA site key if re-enabling captcha
  - `RECAPTCHA_SECRET` (optional): reCAPTCHA secret key if re-enabling captcha

Security
- Treat these values as secrets. Use Netlify's environment variable store rather than committing them to source control.
- A sample file `.env.example` is included in the repo for reference; never commit real secrets.

