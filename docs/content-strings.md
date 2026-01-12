# Editable UI Texts

Below is a scan of hardcoded UI texts found in the project that should be manageable via the Admin content system. For each string I suggest a canonical `content_key` you can use in the `content_keys` table and the initial `default_text` to seed.

## Pages & Components

- `src/pages/Credits.tsx`
  - Meet Yumi → `credits.yumi.title`
  - Our amazing brand designer who brought Kai's vibrant identity to life → `credits.yumi.subtitle`
  - About Yumi (section heading) → `credits.yumi.about_title`
  - Quote text (the large italic block) → `credits.yumi.quote`
  - Background & Expertise → `credits.yumi.background_title`
  - Yumi biography paragraphs → `credits.yumi.bio_1`, `credits.yumi.bio_2`
  - Her Contribution to Kai (title) → `credits.yumi.contribution_title`
  - Contribution paragraph → `credits.yumi.contribution_text`
  - Role → `credits.yumi.role_label`
  - Location → `credits.yumi.location_label`
  - Born → `credits.yumi.born_label`
  - Background (label) → `credits.yumi.background_label`
  - `1995` (born value) → `credits.yumi.born_value`

- `src/pages/Legal.tsx`
  - Section headings (Introduction, Indemnification, Severability, etc.) → `legal.introduction.title`, `legal.indemnification.title`, `legal.severability.title`, `legal.<section>.title`
  - Any block content in the legal text should be moved to content keys too (e.g. `legal.introduction.text`)

- `src/pages/NotFound.tsx`
  - `404` heading → `notfound.title`

- `src/components/ui/pagination.tsx`
  - Previous → `pagination.previous`
  - Next → `pagination.next`

- `src/components/ui/dialog.tsx` and `src/components/ui/sheet.tsx`
  - sr-only Close → `ui.close_accessible`

- `src/components/ui/breadcrumb.tsx`
  - sr-only More → `ui.more_accessible`

- Misc
  - `Loading...` in `src/pages/Contact.tsx` → `ui.loading`

## Observations
- Most site copy on the homepage, contact, enroll, and events pages already use i18n keys (see `t('...')` usage). Those keys must be kept and seeded to the `content_keys` table if you want to let the admin edit them.
- The `src/locales/*.json` files already contain many translations — we will keep these as initial seeds and import into Supabase as `content_keys` + `translations` rows.

## Next steps for migration
1. Seed `locales` table (en, es, fr).
2. For every key in `src/locales/en.json` insert a row in `content_keys` with `key` equal to the i18n key and `default_text` equal to the English text.
3. Insert corresponding `translations` for other locales (es/fr) from the locale files.
4. For hardcoded strings not using i18n (like the `Credits.tsx` strings above), add new `content_keys` and replace the literal string in the component with `t('<content_key>')` and/or use the runtime loader that merges Supabase translations into i18n resources.

If you'd like, I can prepare the seed SQL to migrate `src/locales/en.json` into `content_keys` and translation rows automatically.
