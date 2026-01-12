-- Seed content for homepage and credits pages
-- Generated from en.json, es.json, fr.json

-- 1. Upsert Content Keys (using English as default_text)
INSERT INTO content_keys (key, page, section, type, default_text) VALUES
-- Homepage
('homepage.block1_title', 'homepage', 'block1', 'text', 'Help your clients protect their business'),
('homepage.block1_text', 'homepage', 'block1', 'text', 'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.'),
('homepage.block2_title', 'homepage', 'block2', 'text', 'What is Kai?'),
('homepage.block2_text', 'homepage', 'block2', 'text', 'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.'),
('homepage.block3_1_title', 'homepage', 'block3', 'text', 'Ready-to-use Kit'),
('homepage.block3_1_text', 'homepage', 'block3', 'text', 'To build a sustainability consultancy and compliance practice.'),
('homepage.block3_2_title', 'homepage', 'block3', 'text', 'Data Centre'),
('homepage.block3_2_text', 'homepage', 'block3', 'text', 'A mutualised Data Computing and Competencies Centre, to ensure quality and low cost.'),
('homepage.block3_3_title', 'homepage', 'block3', 'text', 'Trusted Alliance'),
('homepage.block3_3_text', 'homepage', 'block3', 'text', 'Reliable and professional experts to share cutting-edge knowledge and provide training.'),
('homepage.our_story_title', 'homepage', 'story', 'text', 'OUR STORY'),
('homepage.our_story_text', 'homepage', 'story', 'text', 'Kai is an alliance of highly experienced professionals with more than 80 years of combined expertise in compliance consulting, accounting, auditing, and sustainability. Our multilingual and international team is dedicated to strengthening your practice by providing new skills and competencies aligned with the most recent industry best practices and international standards.'),
('homepage.philosophy_title', 'homepage', 'philosophy', 'text', 'Our Philosophy'),
('homepage.philosophy_text', 'homepage', 'philosophy', 'text', 'Kai is named with intention, drawing from the Japanese term 改, which signifies ''Renew'' or ''Change.'' It embodies progress and forward momentum. The name Kai appears in several Japanese words such as Sekai (world), Kaigai (overseas), and especially Kaizen—the philosophy of continuous incremental improvements that drive significant positive outcomes across business operations. At its core, Kai empowers you to assist your clients in managing risk effectively through both subtle and major changes, leveraging globally recognised compliance standards.'),

-- Credits (Yumi)
('credits.yumi.title', 'credits', 'yumi', 'text', 'Meet Yumi'),
('credits.yumi.subtitle', 'credits', 'yumi', 'text', 'Our amazing brand designer who brought Kai''s vibrant identity to life'),
('credits.yumi.about_title', 'credits', 'yumi', 'text', 'About Yumi'),
('credits.yumi.quote', 'credits', 'yumi', 'text', '"I absolutely love discovering and crafting logos. Even when travelling abroad, I eagerly snap photos of stunning logos I find. I''m passionate about simple and flat logo designs. My superpower is capturing clients'' ideas through engaging conversations and interviews, then bringing those visions to life in my designs!"'),
('credits.yumi.background_title', 'credits', 'yumi', 'text', 'Background & Expertise'),
('credits.yumi.bio_1', 'credits', 'yumi', 'text', 'Born in Akita in 1995, Yumi graduated from Akita Prefectural University and initially worked as a banker before pursuing her passion for logo design. This unique career transition brought fresh perspectives and professional discipline to her creative work.'),
('credits.yumi.bio_2', 'credits', 'yumi', 'text', 'Today, Yumi specializes in creating logos and brand identities across a variety of industries, including corporate logos, store logos, and service logos. Her work is characterized by minimalist aesthetics, clean lines, and a deep understanding of brand storytelling.'),
('credits.yumi.contribution_title', 'credits', 'yumi', 'text', 'Her Contribution to Kai'),
('credits.yumi.contribution_text', 'credits', 'yumi', 'text', 'Yumi''s creative vision was instrumental in developing Kai''s vibrant brand identity. Through thoughtful conversations about our mission and values, she crafted a visual language that perfectly captures our commitment to sustainability, innovation, and knowledge sharing. We''re incredibly grateful for her talent and dedication!'),
('credits.yumi.role_label', 'credits', 'yumi', 'text', 'Role'),
('credits.yumi.location_label', 'credits', 'yumi', 'text', 'Location'),
('credits.yumi.born_label', 'credits', 'yumi', 'text', 'Born'),
('credits.yumi.background_label', 'credits', 'yumi', 'text', 'Background'),
('credits.yumi.born_value', 'credits', 'yumi', 'text', '1995'),
('credits.yumi.role_value', 'credits', 'yumi', 'text', 'Logo & Brand Designer'),
('credits.yumi.location_value', 'credits', 'yumi', 'text', 'Akita, Japan'),
('credits.yumi.background_value', 'credits', 'yumi', 'text', 'Banking → Design')
ON CONFLICT (key) DO UPDATE SET 
    default_text = EXCLUDED.default_text,
    page = EXCLUDED.page,
    section = EXCLUDED.section;

-- 2. Upsert Translations

-- English (en)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'en', val FROM (VALUES
('homepage.block1_title', 'Help your clients protect their business'),
('homepage.block1_text', 'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.'),
('homepage.block2_title', 'What is Kai?'),
('homepage.block2_text', 'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.'),
('homepage.block3_1_title', 'Ready-to-use Kit'),
('homepage.block3_1_text', 'To build a sustainability consultancy and compliance practice.'),
('homepage.block3_2_title', 'Data Centre'),
('homepage.block3_2_text', 'A mutualised Data Computing and Competencies Centre, to ensure quality and low cost.'),
('homepage.block3_3_title', 'Trusted Alliance'),
('homepage.block3_3_text', 'Reliable and professional experts to share cutting-edge knowledge and provide training.'),
('homepage.our_story_title', 'OUR STORY'),
('homepage.our_story_text', 'Kai is an alliance of highly experienced professionals with more than 80 years of combined expertise in compliance consulting, accounting, auditing, and sustainability. Our multilingual and international team is dedicated to strengthening your practice by providing new skills and competencies aligned with the most recent industry best practices and international standards.'),
('homepage.philosophy_title', 'Our Philosophy'),
('homepage.philosophy_text', 'Kai is named with intention, drawing from the Japanese term 改, which signifies ''Renew'' or ''Change.'' It embodies progress and forward momentum. The name Kai appears in several Japanese words such as Sekai (world), Kaigai (overseas), and especially Kaizen—the philosophy of continuous incremental improvements that drive significant positive outcomes across business operations. At its core, Kai empowers you to assist your clients in managing risk effectively through both subtle and major changes, leveraging globally recognised compliance standards.'),
('credits.yumi.title', 'Meet Yumi'),
('credits.yumi.subtitle', 'Our amazing brand designer who brought Kai''s vibrant identity to life'),
('credits.yumi.about_title', 'About Yumi'),
('credits.yumi.quote', '"I absolutely love discovering and crafting logos. Even when travelling abroad, I eagerly snap photos of stunning logos I find. I''m passionate about simple and flat logo designs. My superpower is capturing clients'' ideas through engaging conversations and interviews, then bringing those visions to life in my designs!"'),
('credits.yumi.background_title', 'Background & Expertise'),
('credits.yumi.bio_1', 'Born in Akita in 1995, Yumi graduated from Akita Prefectural University and initially worked as a banker before pursuing her passion for logo design. This unique career transition brought fresh perspectives and professional discipline to her creative work.'),
('credits.yumi.bio_2', 'Today, Yumi specializes in creating logos and brand identities across a variety of industries, including corporate logos, store logos, and service logos. Her work is characterized by minimalist aesthetics, clean lines, and a deep understanding of brand storytelling.'),
('credits.yumi.contribution_title', 'Her Contribution to Kai'),
('credits.yumi.contribution_text', 'Yumi''s creative vision was instrumental in developing Kai''s vibrant brand identity. Through thoughtful conversations about our mission and values, she crafted a visual language that perfectly captures our commitment to sustainability, innovation, and knowledge sharing. We''re incredibly grateful for her talent and dedication!'),
('credits.yumi.role_label', 'Role'),
('credits.yumi.location_label', 'Location'),
('credits.yumi.born_label', 'Born'),
('credits.yumi.background_label', 'Background'),
('credits.yumi.born_value', '1995'),
('credits.yumi.role_value', 'Logo & Brand Designer'),
('credits.yumi.location_value', 'Akita, Japan'),
('credits.yumi.background_value', 'Banking → Design')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- Spanish (es)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'es', val FROM (VALUES
('homepage.block1_title', 'Ayude a sus clientes a proteger su negocio'),
('homepage.block1_text', 'Identificación exhaustiva de riesgos combinada con una gestión proactiva estratégica para mejorar la resiliencia empresarial y crear valor sostenible a largo plazo.'),
('homepage.block2_title', '¿Qué es Kai?'),
('homepage.block2_text', 'Dirigido a pequeñas y medianas empresas. Kai proporciona a sus clientes 3 pilares fundamentales para una práctica exitosa.'),
('homepage.block3_1_title', 'Kit listo para usar'),
('homepage.block3_1_text', 'Para construir una consultoría de sostenibilidad y cumplimiento.'),
('homepage.block3_2_title', 'Centro de Datos'),
('homepage.block3_2_text', 'Un Centro de Competencias y Computación de Datos mutualizado, para garantizar calidad y bajo costo.'),
('homepage.block3_3_title', 'Alianza de Confianza'),
('homepage.block3_3_text', 'Expertos confiables y profesionales para compartir conocimientos de vanguardia y brindar capacitación.'),
('homepage.our_story_title', 'NUESTRA HISTORIA'),
('homepage.our_story_text', 'Kai es una alianza de profesionales altamente experimentados con más de 80 años de experiencia combinada en consultoría de cumplimiento, contabilidad, auditoría y sostenibilidad. Nuestro equipo multilingüe e internacional está dedicado a fortalecer su práctica proporcionando nuevas habilidades y competencias alineadas con las mejores prácticas de la industria y los estándares internacionales más recientes.'),
('homepage.philosophy_title', 'Nuestra Filosofía'),
('homepage.philosophy_text', 'Kai se nombra con intención, derivado del término japonés 改, que significa ''Renovar'' o ''Cambiar''. Encapsula el progreso y el impulso hacia adelante. El nombre Kai aparece en varias palabras japonesas como Sekai (mundo), Kaigai (extranjero) y especialmente Kaizen: la filosofía de mejoras incrementales continuas que impulsan resultados positivos significativos en las operaciones comerciales. En esencia, Kai le permite ayudar a sus clientes a gestionar el riesgo de manera efectiva a través de cambios sutiles y mayores, aprovechando los estándares de cumplimiento reconocidos globalmente.')
-- Note: Credits not fully present in es.json yet based on file view, strictly fetching what is there.
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- French (fr)
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'fr', val FROM (VALUES
('homepage.block1_title', 'Aidez vos clients à protéger leur entreprise'),
('homepage.block1_text', 'Identification approfondie des risques combinée à une gestion proactive stratégique pour renforcer la résilience de l''entreprise et créer une valeur durable à long terme.'),
('homepage.block2_title', 'Qu''est-ce que Kai ?'),
('homepage.block2_text', 'Destiné aux petites et moyennes entreprises. Kai fournit à ses clients 3 piliers fondamentaux pour une pratique réussie.'),
('homepage.block3_1_title', 'Kit prêt à l''emploi'),
('homepage.block3_1_text', 'Pour construire un cabinet de conseil en durabilité et conformité.'),
('homepage.block3_2_title', 'Centre de Données'),
('homepage.block3_2_text', 'Un Centre mutualisé de Compétences et de Calcul de Données, pour garantir qualité et faible coût.'),
('homepage.block3_3_title', 'Alliance de Confiance'),
('homepage.block3_3_text', 'Des experts fiables et professionnels pour partager des connaissances de pointe et fournir une formation.'),
('homepage.our_story_title', 'NOTRE HISTOIRE'),
('homepage.our_story_text', 'Kai est une alliance de professionnels hautement expérimentés avec plus de 80 ans d''expertise combinée en conseil en conformité, comptabilité, audit et durabilité. Notre équipe multilingue et internationale s''engage à renforcer votre pratique en fournissant de nouvelles compétences alignées sur les meilleures pratiques de l''industrie et les normes internationales les plus récentes.'),
('homepage.philosophy_title', 'Notre Philosophie'),
('homepage.philosophy_text', 'Kai est nommé avec intention, tiré du terme japonais 改, qui signifie ''Renouveler'' ou ''Changer''. Il incarne le progrès et l''élan en avant. Le nom Kai apparaît dans plusieurs mots japonais comme Sekai (monde), Kaigai (étranger) et surtout Kaizen : la philosophie des améliorations continues et incrémentales qui génèrent des résultats positifs significatifs dans les opérations commerciales. Au cœur, Kai vous permet d''aider vos clients à gérer efficacement les risques grâce à des changements subtils et majeurs, en tirant parti des normes de conformité reconnues mondialement.')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;
