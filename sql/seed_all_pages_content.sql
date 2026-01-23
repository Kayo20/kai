-- Comprehensive seed script for ALL pages: Events, Contact, Enroll
-- This adds all missing content keys and translations for admin editability

-- 1. Insert Content Keys
INSERT INTO content_keys (key, page, section, type, default_text) VALUES
-- Events Page
('nav.events', 'events', 'header', 'text', 'Events'),
('events.loading', 'events', 'status', 'text', 'Loading events...'),
('events.error_msg', 'events', 'status', 'text', 'Please try again later or contact support.'),
('events.not_found', 'events', 'status', 'text', 'No upcoming events at the moment'),
('events.check_back', 'events', 'status', 'text', 'Check back soon for new events!'),
('view_event', 'events', 'button', 'text', 'View Event'),
('view_all_events', 'events', 'button', 'text', 'View All Events'),

-- Contact Page
('contact.title', 'contact', 'header', 'text', 'Book a Meeting'),
('contact.subtitle', 'contact', 'header', 'text', 'Schedule a one-on-one consultation with our team'),
('contact.bookings_text', 'contact', 'bookings', 'text', 'Schedule a convenient time to discuss your needs'),
('contact.form_title', 'contact', 'form', 'text', 'Send a Message'),
('contact.form_description', 'contact', 'form', 'text', 'Fill out the form below and we will get back to you as soon as possible'),
('contact.company_label', 'contact', 'form', 'text', 'Company Name'),
('contact.email_title', 'contact', 'email', 'text', 'Prefer Email?'),
('contact.email_subtitle', 'contact', 'email', 'text', 'Click below to send us an email'),
('name', 'contact', 'form', 'text', 'Name'),
('email', 'contact', 'form', 'text', 'Email'),
('message', 'contact', 'form', 'text', 'Message'),
('submit', 'contact', 'form', 'text', 'Send Message'),
('legal.send_email_button', 'contact', 'email', 'text', 'Send Email'),

-- Enroll Page
('enroll.plans_title', 'enroll', 'header', 'text', 'Choose Your Plan'),
('enroll.plans_subtitle', 'enroll', 'header', 'text', 'Select the best plan for your practice'),
('enroll.plan_period', 'enroll', 'pricing', 'text', '/month'),
('enroll.pay_now', 'enroll', 'pricing', 'text', 'PAY NOW'),

-- Basic Plan
('enroll.plan_basic_name', 'enroll', 'pricing', 'text', 'BASIC'),
('enroll.plan_basic_price', 'enroll', 'pricing', 'text', '$29'),
('enroll.plan_basic_desc', 'enroll', 'pricing', 'text', 'Essential features for small practices'),
('enroll.plan_basic_feature1', 'enroll', 'pricing', 'text', 'Access to Ready-to-use Kit'),
('enroll.plan_basic_feature2', 'enroll', 'pricing', 'text', 'Basic Data Centre access'),
('enroll.plan_basic_feature3', 'enroll', 'pricing', 'text', 'Community support'),

-- Standard Plan
('enroll.plan_standard_name', 'enroll', 'pricing', 'text', 'STANDARD'),
('enroll.plan_standard_price', 'enroll', 'pricing', 'text', '$59'),
('enroll.plan_standard_desc', 'enroll', 'pricing', 'text', 'Best value for growing practices'),
('enroll.plan_standard_feature1', 'enroll', 'pricing', 'text', 'All BASIC features'),
('enroll.plan_standard_feature2', 'enroll', 'pricing', 'text', 'Full Data Centre access'),
('enroll.plan_standard_feature3', 'enroll', 'pricing', 'text', 'Trusted Alliance resources'),
('enroll.plan_standard_feature4', 'enroll', 'pricing', 'text', 'Priority support'),

-- Premium Plan
('enroll.plan_premium_name', 'enroll', 'pricing', 'text', 'PREMIUM'),
('enroll.plan_premium_price', 'enroll', 'pricing', 'text', '$99'),
('enroll.plan_premium_desc', 'enroll', 'pricing', 'text', 'Full access and personalized support'),
('enroll.plan_premium_feature1', 'enroll', 'pricing', 'text', 'All STANDARD features'),
('enroll.plan_premium_feature2', 'enroll', 'pricing', 'text', '1-on-1 consulting'),
('enroll.plan_premium_feature3', 'enroll', 'pricing', 'text', 'Custom integrations'),

-- Additional Info
('enroll.plans_include_title', 'enroll', 'info', 'text', 'All Plans Include'),
('enroll.guarantee_title', 'enroll', 'info', 'text', 'Money-Back Guarantee'),
('enroll.guarantee_text', 'enroll', 'info', 'text', '30-day satisfaction guarantee'),
('enroll.cancel_title', 'enroll', 'info', 'text', 'Cancel Anytime'),
('enroll.cancel_text', 'enroll', 'info', 'text', 'No long-term commitment required'),
('enroll.secure_title', 'enroll', 'info', 'text', 'Secure Payment'),
('enroll.secure_text', 'enroll', 'info', 'text', 'Your data is safe with us'),

-- Navigation (shared)
('nav.contact', 'navigation', 'menu', 'text', 'Contact Us')

ON CONFLICT (key) DO UPDATE SET 
    default_text = EXCLUDED.default_text,
    page = EXCLUDED.page,
    section = EXCLUDED.section;

-- 2. Insert English Translations
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'en', val FROM (VALUES
-- Events
('nav.events', 'Events'),
('events.loading', 'Loading events...'),
('events.error_msg', 'Please try again later or contact support.'),
('events.not_found', 'No upcoming events at the moment'),
('events.check_back', 'Check back soon for new events!'),
('view_event', 'View Event'),
('view_all_events', 'View All Events'),

-- Contact
('contact.title', 'Book a Meeting'),
('contact.subtitle', 'Schedule a one-on-one consultation with our team'),
('contact.bookings_text', 'Schedule a convenient time to discuss your needs'),
('contact.form_title', 'Send a Message'),
('contact.form_description', 'Fill out the form below and we will get back to you as soon as possible'),
('contact.company_label', 'Company Name'),
('contact.email_title', 'Prefer Email?'),
('contact.email_subtitle', 'Click below to send us an email'),
('name', 'Name'),
('email', 'Email'),
('message', 'Message'),
('submit', 'Send Message'),
('legal.send_email_button', 'Send Email'),

-- Enroll
('enroll.plans_title', 'Choose Your Plan'),
('enroll.plans_subtitle', 'Select the best plan for your practice'),
('enroll.plan_period', '/month'),
('enroll.pay_now', 'PAY NOW'),
('enroll.plan_basic_name', 'BASIC'),
('enroll.plan_basic_price', '$29'),
('enroll.plan_basic_desc', 'Essential features for small practices'),
('enroll.plan_basic_feature1', 'Access to Ready-to-use Kit'),
('enroll.plan_basic_feature2', 'Basic Data Centre access'),
('enroll.plan_basic_feature3', 'Community support'),
('enroll.plan_standard_name', 'STANDARD'),
('enroll.plan_standard_price', '$59'),
('enroll.plan_standard_desc', 'Best value for growing practices'),
('enroll.plan_standard_feature1', 'All BASIC features'),
('enroll.plan_standard_feature2', 'Full Data Centre access'),
('enroll.plan_standard_feature3', 'Trusted Alliance resources'),
('enroll.plan_standard_feature4', 'Priority support'),
('enroll.plan_premium_name', 'PREMIUM'),
('enroll.plan_premium_price', '$99'),
('enroll.plan_premium_desc', 'Full access and personalized support'),
('enroll.plan_premium_feature1', 'All STANDARD features'),
('enroll.plan_premium_feature2', '1-on-1 consulting'),
('enroll.plan_premium_feature3', 'Custom integrations'),
('enroll.plans_include_title', 'All Plans Include'),
('enroll.guarantee_title', 'Money-Back Guarantee'),
('enroll.guarantee_text', '30-day satisfaction guarantee'),
('enroll.cancel_title', 'Cancel Anytime'),
('enroll.cancel_text', 'No long-term commitment required'),
('enroll.secure_title', 'Secure Payment'),
('enroll.secure_text', 'Your data is safe with us'),
('nav.contact', 'Contact Us')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- 3. Insert Spanish Translations
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'es', val FROM (VALUES
-- Events
('nav.events', 'Eventos'),
('events.loading', 'Cargando eventos...'),
('events.error_msg', 'Por favor, inténtelo de nuevo más tarde o contacte con soporte.'),
('events.not_found', 'No hay eventos próximos en este momento'),
('events.check_back', '¡Vuelva pronto para ver nuevos eventos!'),
('view_event', 'Ver Evento'),
('view_all_events', 'Ver Todos los Eventos'),

-- Contact
('contact.title', 'Reservar una Reunión'),
('contact.subtitle', 'Programe una consulta individual con nuestro equipo'),
('contact.bookings_text', 'Programe un momento conveniente para discutir sus necesidades'),
('contact.form_title', 'Enviar un Mensaje'),
('contact.form_description', 'Complete el formulario a continuación y nos pondremos en contacto con usted lo antes posible'),
('contact.company_label', 'Nombre de la Empresa'),
('contact.email_title', '¿Prefiere Email?'),
('contact.email_subtitle', 'Haga clic a continuación para enviarnos un correo electrónico'),
('name', 'Nombre'),
('email', 'Correo Electrónico'),
('message', 'Mensaje'),
('submit', 'Enviar Mensaje'),
('legal.send_email_button', 'Enviar Email'),

-- Enroll
('enroll.plans_title', 'Elija Su Plan'),
('enroll.plans_subtitle', 'Seleccione el mejor plan para su práctica'),
('enroll.plan_period', '/mes'),
('enroll.pay_now', 'PAGAR AHORA'),
('enroll.plan_basic_name', 'BÁSICO'),
('enroll.plan_basic_price', '$29'),
('enroll.plan_basic_desc', 'Características esenciales para pequeñas prácticas'),
('enroll.plan_basic_feature1', 'Acceso al Kit listo para usar'),
('enroll.plan_basic_feature2', 'Acceso básico al Centro de Datos'),
('enroll.plan_basic_feature3', 'Soporte de la comunidad'),
('enroll.plan_standard_name', 'ESTÁNDAR'),
('enroll.plan_standard_price', '$59'),
('enroll.plan_standard_desc', 'Mejor valor para prácticas en crecimiento'),
('enroll.plan_standard_feature1', 'Todas las características BÁSICAS'),
('enroll.plan_standard_feature2', 'Acceso completo al Centro de Datos'),
('enroll.plan_standard_feature3', 'Recursos de la Alianza de Confianza'),
('enroll.plan_standard_feature4', 'Soporte prioritario'),
('enroll.plan_premium_name', 'PREMIUM'),
('enroll.plan_premium_price', '$99'),
('enroll.plan_premium_desc', 'Acceso completo y soporte personalizado'),
('enroll.plan_premium_feature1', 'Todas las características ESTÁNDAR'),
('enroll.plan_premium_feature2', 'Consultoría 1 a 1'),
('enroll.plan_premium_feature3', 'Integraciones personalizadas'),
('enroll.plans_include_title', 'Todos los Planes Incluyen'),
('enroll.guarantee_title', 'Garantía de Devolución de Dinero'),
('enroll.guarantee_text', 'Garantía de satisfacción de 30 días'),
('enroll.cancel_title', 'Cancelar en Cualquier Momento'),
('enroll.cancel_text', 'No se requiere compromiso a largo plazo'),
('enroll.secure_title', 'Pago Seguro'),
('enroll.secure_text', 'Sus datos están seguros con nosotros'),
('nav.contact', 'Contáctenos')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;

-- 4. Insert French Translations
INSERT INTO translations (content_key_id, locale, text)
SELECT id, 'fr', val FROM (VALUES
-- Events
('nav.events', 'Événements'),
('events.loading', 'Chargement des événements...'),
('events.error_msg', 'Veuillez réessayer plus tard ou contacter le support.'),
('events.not_found', 'Aucun événement à venir pour le moment'),
('events.check_back', 'Revenez bientôt pour de nouveaux événements !'),
('view_event', 'Voir l''Événement'),
('view_all_events', 'Voir Tous les Événements'),

-- Contact
('contact.title', 'Réserver une Réunion'),
('contact.subtitle', 'Planifiez une consultation individuelle avec notre équipe'),
('contact.bookings_text', 'Planifiez un moment convenable pour discuter de vos besoins'),
('contact.form_title', 'Envoyer un Message'),
('contact.form_description', 'Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible'),
('contact.company_label', 'Nom de l''Entreprise'),
('contact.email_title', 'Vous Préférez l''Email ?'),
('contact.email_subtitle', 'Cliquez ci-dessous pour nous envoyer un email'),
('name', 'Nom'),
('email', 'Email'),
('message', 'Message'),
('submit', 'Envoyer le Message'),
('legal.send_email_button', 'Envoyer un Email'),

-- Enroll
('enroll.plans_title', 'Choisissez Votre Plan'),
('enroll.plans_subtitle', 'Sélectionnez le meilleur plan pour votre pratique'),
('enroll.plan_period', '/mois'),
('enroll.pay_now', 'PAYER MAINTENANT'),
('enroll.plan_basic_name', 'BASIQUE'),
('enroll.plan_basic_price', '$29'),
('enroll.plan_basic_desc', 'Fonctionnalités essentielles pour les petites pratiques'),
('enroll.plan_basic_feature1', 'Accès au Kit prêt à l''emploi'),
('enroll.plan_basic_feature2', 'Accès de base au Centre de Données'),
('enroll.plan_basic_feature3', 'Support communautaire'),
('enroll.plan_standard_name', 'STANDARD'),
('enroll.plan_standard_price', '$59'),
('enroll.plan_standard_desc', 'Meilleur rapport qualité-prix pour les pratiques en croissance'),
('enroll.plan_standard_feature1', 'Toutes les fonctionnalités BASIQUES'),
('enroll.plan_standard_feature2', 'Accès complet au Centre de Données'),
('enroll.plan_standard_feature3', 'Ressources de l''Alliance de Confiance'),
('enroll.plan_standard_feature4', 'Support prioritaire'),
('enroll.plan_premium_name', 'PREMIUM'),
('enroll.plan_premium_price', '$99'),
('enroll.plan_premium_desc', 'Accès complet et support personnalisé'),
('enroll.plan_premium_feature1', 'Toutes les fonctionnalités STANDARD'),
('enroll.plan_premium_feature2', 'Consultation 1 à 1'),
('enroll.plan_premium_feature3', 'Intégrations personnalisées'),
('enroll.plans_include_title', 'Tous les Plans Incluent'),
('enroll.guarantee_title', 'Garantie de Remboursement'),
('enroll.guarantee_text', 'Garantie de satisfaction de 30 jours'),
('enroll.cancel_title', 'Annuler à Tout Moment'),
('enroll.cancel_text', 'Aucun engagement à long terme requis'),
('enroll.secure_title', 'Paiement Sécurisé'),
('enroll.secure_text', 'Vos données sont en sécurité avec nous'),
('nav.contact', 'Contactez-nous')
) AS data(k, val)
JOIN content_keys ON content_keys.key = data.k
ON CONFLICT (content_key_id, locale) DO UPDATE SET text = EXCLUDED.text;
