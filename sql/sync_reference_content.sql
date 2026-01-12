-- Comprehensive Sync Script to match https://kaisg.netlify.app/
-- This script updates all content keys and translations to match the reference site exactly.

-- 1. Ensure all keys exist
INSERT INTO content_keys (key, page, section, type, default_text) VALUES
-- Homepage
('homepage.hero_title', 'homepage', 'hero', 'text', 'Welcome to Kai'),
('homepage.hero_subtitle', 'homepage', 'hero', 'text', 'Help your clients protect their business'),
('homepage.hero_text', 'homepage', 'hero', 'text', 'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.'),
('homepage.block2_title', 'homepage', 'block2', 'text', 'What is Kai?'),
('homepage.block2_text', 'homepage', 'block2', 'text', 'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.'),
-- Features
('homepage.feature1_title', 'homepage', 'features', 'text', 'Ready-to-use Kit'),
('homepage.feature1_text', 'homepage', 'features', 'text', 'To build a sustainability consultancy and compliance practice.'),
('homepage.feature2_title', 'homepage', 'features', 'text', 'Data Centre'),
('homepage.feature2_text', 'homepage', 'features', 'text', 'The largest knowledge base for SMEs on ESRS, CSRD and SDG.'),
('homepage.feature3_title', 'homepage', 'features', 'text', 'Continuous Mentoring'),
('homepage.feature3_text', 'homepage', 'features', 'text', 'A unique learning community of like-minded professionals.'),
('homepage.feature4_title', 'homepage', 'features', 'text', 'Trusted Alliance'),
('homepage.feature4_text', 'homepage', 'features', 'text', 'Reliable and professional experts to share cutting-edge knowledge and provide training.'),
-- Philosophy
('homepage.philosophy_title', 'homepage', 'philosophy', 'text', 'Our Philosophy'),
('homepage.philosophy_text', 'homepage', 'philosophy', 'text', 'Kai is named with intention, drawing from the Japanese term 改, which signifies ''Renew'' or ''Change.'' It embodies progress and forward momentum. The name Kai appears in several Japanese words such as Sekai (world), Kaigai (overseas), and especially Kaizen—the philosophy of continuous incremental improvements that drive significant positive outcomes across business operations.'),
-- Enroll Page
('enroll.plans_title', 'enroll', 'header', 'text', 'Choose Your Plan'),
('enroll.plans_subtitle', 'enroll', 'header', 'text', 'Select the best plan for your practice'),
('enroll.plan_basic_name', 'enroll', 'pricing', 'text', 'BASIC'),
('enroll.plan_basic_price', 'enroll', 'pricing', 'text', '$29'),
('enroll.plan_basic_desc', 'enroll', 'pricing', 'text', 'Essential features for small practices'),
('enroll.plan_standard_name', 'enroll', 'pricing', 'text', 'STANDARD'),
('enroll.plan_standard_price', 'enroll', 'pricing', 'text', '$59'),
('enroll.plan_standard_desc', 'enroll', 'pricing', 'text', 'Advanced tools for growing firms'),
('enroll.plan_premium_name', 'enroll', 'pricing', 'text', 'PREMIUM'),
('enroll.plan_premium_price', 'enroll', 'pricing', 'text', '$99'),
('enroll.plan_premium_desc', 'enroll', 'pricing', 'text', 'Full-service enterprise solutions'),
-- Contact Page
('contact.title', 'contact', 'header', 'text', 'Book a Meeting'),
('contact.subtitle', 'contact', 'header', 'text', 'Schedule a one-on-one consultation with our team'),
('contact.bookings_button', 'contact', 'bookings', 'text', 'Book Meeting Online'),
('contact.form_title', 'contact', 'form', 'text', 'Send a Message'),
('contact.email_title', 'contact', 'email', 'text', 'Prefer Email?'),
('contact.email_subtitle', 'contact', 'email', 'text', 'Click below to send us an email')
ON CONFLICT (key) DO UPDATE SET 
    default_text = EXCLUDED.default_text,
    page = EXCLUDED.page,
    section = EXCLUDED.section;

-- 2. Upsert Translations
-- English (en)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'en', val FROM (VALUES
('homepage.hero_title', 'Welcome to Kai'),
('homepage.hero_subtitle', 'Help your clients protect their business'),
('homepage.hero_text', 'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.'),
('homepage.block2_title', 'What is Kai?'),
('homepage.block2_text', 'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.'),
('homepage.feature1_title', 'Ready-to-use Kit'),
('homepage.feature1_text', 'To build a sustainability consultancy and compliance practice.'),
('homepage.feature2_title', 'Data Centre'),
('homepage.feature2_text', 'The largest knowledge base for SMEs on ESRS, CSRD and SDG.'),
('homepage.feature3_title', 'Continuous Mentoring'),
('homepage.feature3_text', 'A unique learning community of like-minded professionals.'),
('homepage.feature4_title', 'Trusted Alliance'),
('homepage.feature4_text', 'Reliable and professional experts to share cutting-edge knowledge and provide training.'),
('homepage.philosophy_title', 'Our Philosophy'),
('homepage.philosophy_text', 'Kai is named with intention, drawing from the Japanese term 改, which signifies ''Renew'' or ''Change.'' It embodies progress and forward momentum. The name Kai appears in several Japanese words such as Sekai (world), Kaigai (overseas), and especially Kaizen—the philosophy of continuous incremental improvements that drive significant positive outcomes across business operations.'),
('enroll.plans_title', 'Choose Your Plan'),
('enroll.plans_subtitle', 'Select the best plan for your practice'),
('enroll.plan_basic_name', 'BASIC'),
('enroll.plan_basic_price', '$29'),
('enroll.plan_standard_name', 'STANDARD'),
('enroll.plan_standard_price', '$59'),
('enroll.plan_premium_name', 'PREMIUM'),
('enroll.plan_premium_price', '$99'),
('contact.title', 'Book a Meeting'),
('contact.subtitle', 'Schedule a one-on-one consultation with our team'),
('contact.bookings_button', 'Book Meeting Online'),
('contact.form_title', 'Send a Message'),
('contact.email_title', 'Prefer Email?'),
('contact.email_subtitle', 'Click below to send us an email')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- Spanish (es) - Approximate or placeholders if not known, but following reference structure
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'es', val FROM (VALUES
('homepage.hero_title', 'Bienvenido a Kai'),
('homepage.hero_subtitle', 'Ayude a sus clientes a proteger su negocio'),
('homepage.hero_text', 'Identificación exhaustiva de riesgos combinada con una gestión proactiva estratégica para mejorar la resiliencia empresarial y crear valor sostenible a largo plazo.'),
('homepage.block2_title', '¿Qué es Kai?'),
('homepage.block2_text', 'Dirigido a empresas pequeñas y medianas. Kai proporciona a sus clientes 3 pilares fundamentales para una práctica exitosa.'),
('homepage.feature1_title', 'Kit listo para usar'),
('homepage.feature1_text', 'Para construir una consultoría de sostenibilidad y cumplimiento.'),
('homepage.feature2_title', 'Centro de Datos'),
('homepage.feature2_text', 'La base de conocimientos más grande para PYMEs sobre ESRS, CSRD y SDG.'),
('homepage.feature3_title', 'Mentoría Continua'),
('homepage.feature3_text', 'Una comunidad de aprendizaje única de profesionales con ideas afines.'),
('homepage.feature4_title', 'Alianza de Confianza'),
('homepage.feature4_text', 'Expertos confiables y profesionales para compartir conocimientos de vanguardia y brindar capacitación.'),
('homepage.philosophy_title', 'Nuestra Filosofía'),
('homepage.philosophy_text', 'Kai se nombra con intención, derivado del término japonés 改, que significa ''Renovar'' o ''Cambiar''. Encapsula el progreso y el impulso hacia adelante.'),
('enroll.plan_basic_name', 'BÁSICO'),
('enroll.plan_standard_name', 'ESTÁNDAR'),
('enroll.plan_premium_name', 'PREMIUM')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- French (fr)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'fr', val FROM (VALUES
('homepage.hero_title', 'Bienvenue chez Kai'),
('homepage.hero_subtitle', 'Aidez vos clients à protéger leur entreprise'),
('homepage.hero_text', 'Identification approfondie des risques combinée à une gestion proactive stratégique pour renforcer la résilience de l''entreprise.'),
('homepage.block2_title', 'Qu''est-ce que Kai ?'),
('homepage.block2_text', 'Destiné aux petites et moyennes entreprises. Kai fournit à ses clients 3 piliers fondamentaux pour une pratique réussie.'),
('homepage.feature1_title', 'Kit prêt à l''emploi'),
('homepage.feature1_text', 'Pour construire un cabinet de conseil en durabilité et conformité.'),
('homepage.feature2_title', 'Centre de Données'),
('homepage.feature2_text', 'La plus grande base de connaissances pour les PME sur ESRS, CSRD et SDG.'),
('homepage.feature3_title', 'Mentorat Continu'),
('homepage.feature3_text', 'Une communauté d''apprentissage unique de professionnels partageant les mêmes idées.'),
('homepage.feature4_title', 'Alliance de Confiance'),
('homepage.feature4_text', 'Des experts fiables et professionnels pour partager des connaissances de pointe.'),
('homepage.philosophy_title', 'Notre Philosophie'),
('homepage.philosophy_text', 'Kai est nommé avec intention, tiré du terme japonais 改, qui signifie ''Renouveler'' ou ''Changer''.')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;
