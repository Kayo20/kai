# Supabase Setup for Content Admin

Steps to get the Admin Content dashboard working with Supabase:

1. Install the client package:
   - npm install @supabase/supabase-js

2. Create DB schema in Supabase SQL editor:
   - Paste the contents of `sql/create_supabase_schema.sql` and run it.

3. Seed locales and initial content:
   - Insert locales: ('en','English'), ('es','Español'), ('fr','Français')
   - Optional: run a script to import keys from `src/locales/*.json` into the `content_keys` and `translations` tables.

4. Enable Row-Level Security (RLS) and add policies:
   - For `content_keys` and `translations`, enable RLS and add policies that allow:
     - public READ (if you want translations to be readable by the client)
     - authenticated admin role to INSERT/UPDATE/DELETE
   - Example policy for translations (replace `auth.uid()` checks with your approach):
     - CREATE POLICY "Admins can modify translations" ON translations FOR ALL USING (exists (select 1 from admins where admins.auth_uid = auth.uid()));

5. Add Supabase keys to local env and Netlify:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

6. Start the app and open `/admin` to access the dashboard.

Notes:
- The front-end includes `src/pages/Admin.tsx` (basic listing + editor). You might want to protect the route or require an admin sign-in before exposing it in production.
- I added `loadSupabaseTranslations()` in `src/i18n.ts` which can be called at app startup to merge DB translations into i18next.
