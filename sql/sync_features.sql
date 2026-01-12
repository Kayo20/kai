-- Supplementary Sync Script for detailed features and descriptions
-- This script ensures all nested features and descriptions match kaisg.netlify.app

-- 1. Enroll Page Detailed Features
INSERT INTO content_keys (key, page, section, type, default_text) VALUES
('enroll.plan_basic_feature1', 'enroll', 'pricing', 'text', 'Access to Ready-to-use Kit'),
('enroll.plan_basic_feature2', 'enroll', 'pricing', 'text', 'Basic Data Centre access'),
('enroll.plan_basic_feature3', 'enroll', 'pricing', 'text', 'Community support'),
('enroll.plan_standard_feature1', 'enroll', 'pricing', 'text', 'All BASIC features'),
('enroll.plan_standard_feature2', 'enroll', 'pricing', 'text', 'Full Data Centre access'),
('enroll.plan_standard_feature3', 'enroll', 'pricing', 'text', 'Trusted Alliance resources'),
('enroll.plan_standard_feature4', 'enroll', 'pricing', 'text', 'Priority support'),
('enroll.plan_premium_feature1', 'enroll', 'pricing', 'text', 'All STANDARD features'),
('enroll.plan_premium_feature2', 'enroll', 'pricing', 'text', '1-on-1 consulting'),
('enroll.plan_premium_feature3', 'enroll', 'pricing', 'text', 'Custom integrations'),
('enroll.plans_include_title', 'enroll', 'footer', 'text', 'All Plans Include'),
('enroll.guarantee_title', 'enroll', 'footer', 'text', 'Money-Back Guarantee'),
('enroll.guarantee_text', 'enroll', 'footer', 'text', '30-day refund policy'),
('enroll.cancel_title', 'enroll', 'footer', 'text', 'Cancel Anytime'),
('enroll.cancel_text', 'enroll', 'footer', 'text', 'No long-term commitment'),
('enroll.secure_title', 'enroll', 'footer', 'text', 'Secure Payment'),
('enroll.secure_text', 'enroll', 'footer', 'text', 'SSL encrypted checkout'),
-- Contact Page Descriptions
('contact.bookings_text', 'contact', 'bookings', 'text', 'Schedule a one-on-one consultation with our team'),
('contact.form_description', 'contact', 'form', 'text', 'Our team will get back to you within 24 hours.')
ON CONFLICT (key) DO UPDATE SET 
    default_text = EXCLUDED.default_text,
    page = EXCLUDED.page,
    section = EXCLUDED.section;

-- 2. Translations (en)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'en', val FROM (VALUES
('enroll.plan_basic_feature1', 'Access to Ready-to-use Kit'),
('enroll.plan_basic_feature2', 'Basic Data Centre access'),
('enroll.plan_basic_feature3', 'Community support'),
('enroll.plan_standard_feature1', 'All BASIC features'),
('enroll.plan_standard_feature2', 'Full Data Centre access'),
('enroll.plan_standard_feature3', 'Trusted Alliance resources'),
('enroll.plan_standard_feature4', 'Priority support'),
('enroll.plan_premium_feature1', 'All STANDARD features'),
('enroll.plan_premium_feature2', '1-on-1 consulting'),
('enroll.plan_premium_feature3', 'Custom integrations'),
('enroll.plans_include_title', 'All Plans Include'),
('enroll.guarantee_title', 'Money-Back Guarantee'),
('enroll.guarantee_text', '30-day refund policy'),
('enroll.cancel_title', 'Cancel Anytime'),
('enroll.cancel_text', 'No long-term commitment'),
('enroll.secure_title', 'Secure Payment'),
('enroll.secure_text', 'SSL encrypted checkout'),
('contact.bookings_text', 'Schedule a one-on-one consultation with our team'),
('contact.form_description', 'Our team will get back to you within 24 hours.')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- Spanish (es) - Approximate
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'es', val FROM (VALUES
('enroll.plans_include_title', 'Todos los planes incluyen'),
('enroll.guarantee_title', 'Garantía de reembolso'),
('enroll.guarantee_text', 'Política de reembolso de 30 días'),
('enroll.cancel_title', 'Cancele en cualquier momento'),
('enroll.cancel_text', 'Sin compromiso a largo plazo'),
('enroll.secure_title', 'Pago seguro'),
('enroll.secure_text', 'Pago cifrado SSL'),
('contact.form_description', 'Nuestro equipo se pondrá en contacto con usted en un plazo de 24 horas.')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- French (fr) - Approximate
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'fr', val FROM (VALUES
('enroll.plans_include_title', 'Tous les forfaits incluent'),
('enroll.guarantee_title', 'Garantie de remboursement'),
('enroll.guarantee_text', 'Politique de remboursement de 30 jours'),
('enroll.cancel_title', 'Annulez à tout moment'),
('enroll.cancel_text', 'Aucun engagement à long terme'),
('enroll.secure_title', 'Paiement sécurisé'),
('enroll.secure_text', 'Paiement crypté SSL'),
('contact.form_description', 'Notre équipe vous répondra dans les 24 heures.')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;
