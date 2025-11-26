# API Keys & Environment Variables

To enable all integrations and backend features, you must add your API keys and secrets to a `.env.local` file in the project root. This file should never be committed to version control.

### Example `.env.local` file:

```
# Google reCAPTCHA
RECAPTCHA_SECRET_KEY=your_recaptcha_secret

# Email Service (SendGrid or Mailgun)
SENDGRID_API_KEY=your_sendgrid_key
MAILGUN_API_KEY=your_mailgun_key
EMAIL_TO=contact@kai.com

# Wise Payment Gateway
WISE_API_KEY=your_wise_api_key

# CMS Integration
CMS_API_KEY=your_cms_api_key
```

- **RECAPTCHA_SECRET_KEY**: Used for validating CAPTCHA tokens in the contact form API route.
- **SENDGRID_API_KEY / MAILGUN_API_KEY**: Used by Nodemailer to send emails from the contact form.
- **WISE_API_KEY**: Used to securely generate payment links for BASIC and STANDARD plans.
- **CMS_API_KEY**: Used to fetch content for the homepage and enroll plans.

## How to Add API Keys
1. Copy the example above into a new file named `.env.local` in the project root.
2. Replace each value with your actual API key or secret.
3. Restart your development server after making changes.

**Never share or commit your `.env.local` file.**

---

For more details, see the code comments in `src/pages/api/` for each integration point.
# Shadcn-UI Template Usage Instructions

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration
- `src/pages/Index.tsx` - Home page logic

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

- The `@/` path alias points to the `src/` directory
- In your typescript code, don't re-export types that you're already importing

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Add Dependencies**

```shell
pnpm add some_new_dependency

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
pnpm run build
```
