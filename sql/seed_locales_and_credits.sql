-- Seed locales
INSERT INTO locales (code, name) VALUES ('en', 'English') ON CONFLICT DO NOTHING;
INSERT INTO locales (code, name) VALUES ('es', 'Español') ON CONFLICT DO NOTHING;
INSERT INTO locales (code, name) VALUES ('fr', 'Français') ON CONFLICT DO NOTHING;

-- Example seeding for credits.yumi keys (useful to get started)
WITH ck AS (
  INSERT INTO content_keys (key, page, section, type, default_text)
  VALUES
    ('credits.yumi.title', 'credits', 'hero', 'text', 'Meet Yumi'),
    ('credits.yumi.subtitle', 'credits', 'hero', 'text', 'Our amazing brand designer who brought Kai\'s vibrant identity to life'),
    ('credits.yumi.about_title', 'credits', 'about', 'text', 'About Yumi'),
    ('credits.yumi.quote', 'credits', 'about', 'text', '"I absolutely love discovering and crafting logos..."'),
    ('credits.yumi.background_title', 'credits', 'background', 'text', 'Background & Expertise'),
    ('credits.yumi.bio_1', 'credits', 'background', 'text', 'Born in Akita in 1995, Yumi graduated from Akita Prefectural University...'),
    ('credits.yumi.bio_2', 'credits', 'background', 'text', 'Today, Yumi specializes in creating logos and brand identities...'),
    ('credits.yumi.contribution_title', 'credits', 'contribution', 'text', 'Her Contribution to Kai'),
    ('credits.yumi.contribution_text', 'credits', 'contribution', 'text', 'Yumi\'s creative vision was instrumental in developing Kai\'s vibrant brand identity...'),
    ('credits.yumi.role_label', 'credits', 'quickfacts', 'text', 'Role'),
    ('credits.yumi.role_value', 'credits', 'quickfacts', 'text', 'Logo & Brand Designer'),
    ('credits.yumi.location_label', 'credits', 'quickfacts', 'text', 'Location'),
    ('credits.yumi.location_value', 'credits', 'quickfacts', 'text', 'Akita, Japan'),
    ('credits.yumi.born_label', 'credits', 'quickfacts', 'text', 'Born'),
    ('credits.yumi.born_value', 'credits', 'quickfacts', 'text', '1995'),
    ('credits.yumi.background_label', 'credits', 'quickfacts', 'text', 'Background'),
    ('credits.yumi.background_value', 'credits', 'quickfacts', 'text', 'Banking → Design')
  ON CONFLICT (key) DO NOTHING
  RETURNING id, key
)
SELECT * FROM ck;