-- Supabase/Postgres schema for editable content and translations
-- Single SQL command (multi-statement) to create all necessary tables and a view

BEGIN;

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Locales table (simple list of locales)
CREATE TABLE IF NOT EXISTS locales (
  code text PRIMARY KEY,
  name text NOT NULL
);

-- Admins table (supabase auth user id would be used to link to this table)
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_uid uuid,
  email text UNIQUE,
  full_name text,
  role text DEFAULT 'editor',
  created_at timestamptz DEFAULT now()
);

-- Content Keys: unique keys used throughout the app
CREATE TABLE IF NOT EXISTS content_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  page text,
  section text,
  type text DEFAULT 'text', -- text, html, rich, image, link
  default_text text,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Translations: per-locale content for content_keys
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key_id uuid REFERENCES content_keys(id) ON DELETE CASCADE,
  locale text REFERENCES locales(code) ON DELETE CASCADE,
  text text,
  last_edited_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (content_key_id, locale)
);

-- Media table for any image resources that might be editable
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE,
  url text NOT NULL,
  alt_text text,
  caption text,
  meta jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Optional revisions table for audit/history of translation edits
CREATE TABLE IF NOT EXISTS translation_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id uuid REFERENCES translations(id) ON DELETE CASCADE,
  content text,
  edited_by uuid REFERENCES admins(id),
  created_at timestamptz DEFAULT now()
);

-- Useful view to join translations with keys for easy reading
CREATE OR REPLACE VIEW translations_view AS
SELECT
  t.id,
  ck.key AS content_key,
  t.locale,
  t.text,
  t.updated_at,
  t.created_at,
  ck.page,
  ck.section
FROM translations t
JOIN content_keys ck ON t.content_key_id = ck.id;

COMMIT;

-- NOTES:
-- 1) After creating these tables, enable Row-Level Security (RLS) on tables and add policies to allow only authenticated admin users to INSERT/UPDATE/DELETE.
-- 2) Seed the locales table with entries like ('en','English'), ('es','Español'), ('fr','Français').
-- 3) Use the `translations_view` for simpler client queries that need key + locale + text.
