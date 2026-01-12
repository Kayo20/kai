# Kai Website Development Plan - MVP

## Project Overview
Building a Next.js-style multi-page website using React Router with shadcn-ui components, focusing on core functionality and mobile-first responsive design.

## Core Files to Create (Max 8 files)

### 1. **src/App.tsx** (MODIFY)
- Update routing structure for all pages
- Add language context provider
- Add mobile detection logic

### 2. **src/pages/Index.tsx** (REWRITE)
- Hero section with M PLUS font titles
- Three ManageableContentBlock components with scroll animations
- Mobile-first responsive layout

### 3. **src/pages/Events.tsx** (NEW)
- EventTile cards with hover effects
- Eventbrite widget integration
- Fallback page design

### 4. **src/pages/Enroll.tsx** (NEW)
- Three pricing plan cards (Basic, Standard, Premium)
- Subscribe button logic with redirects
- Mobile-responsive pricing layout

### 5. **src/pages/Contact.tsx** (NEW)
- MS Bookings iframe integration
- Contact form with validation
- Email launcher link
- CAPTCHA placeholder

### 6. **src/components/Layout.tsx** (NEW)
- Header with logo, navigation, language switcher
- Mobile hamburger menu
- Footer with links and LinkedIn
- MobileNavBar (fixed bottom navigation)
- Breadcrumbs component

### 7. **src/pages/Legal.tsx** (NEW)
- Terms and Conditions content
- Formatted for readability

### 8. **src/index.css** (MODIFY)
- Add M PLUS and Noto Sans fonts
- Add custom animations
- Brand accent colors
- Mobile-first breakpoints

## Simplified Approach (MVP)
- Use React Router instead of Next.js App Router (keeping within React/shadcn-ui template)
- Implement i18n with React context (simplified version)
- Focus on public pages first
- Secured pages will be basic login UI (no actual authentication logic)
- Use localStorage for language preference
- Eventbrite and MS Bookings as iframe embeds

## Design Priorities
1. Mobile-first responsive design
2. M PLUS for titles, Noto Sans for body
3. Smooth animations and transitions
4. Brand accent colors in header/footer
5. Fixed mobile bottom navigation
6. Clean, modern UI with shadcn-ui components

## Implementation Order
1. Setup fonts and global styles
2. Create Layout component (Header, Footer, MobileNavBar)
3. Build Homepage with Hero and content blocks
4. Create Events page with cards
5. Build Enroll page with pricing plans
6. Create Contact page with forms and integrations
7. Add Legal page
8. Final responsive testing and animations