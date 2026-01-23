-- STEP 1: Run this in Supabase SQL Editor
-- This will add all missing content keys for Events, Contact, and Enroll pages

-- First, ensure locales exist
INSERT INTO locales (code, name) VALUES
('en', 'English'),
('es', 'Español'),
('fr', 'Français')
ON CONFLICT (code) DO NOTHING;

-- Insert all content keys
INSERT INTO content_keys (key, page, section, type, default_text) VALUES
-- Events Page (7 keys)
('nav.events', 'events', 'header', 'text', 'Events'),
('events.loading', 'events', 'status', 'text', 'Loading events...'),
('events.error_msg', 'events', 'status', 'text', 'Please try again later or contact support.'),
('events.not_found', 'events', 'status', 'text', 'No upcoming events at the moment'),
('events.check_back', 'events', 'status', 'text', 'Check back soon for new events!'),
('view_event', 'events', 'button', 'text', 'View Event'),
('view_all_events', 'events', 'button', 'text', 'View All Events'),

-- Contact Page (13 keys)
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

-- Enroll Page (30 keys)
('enroll.plans_title', 'enroll', 'header', 'text', 'Choose Your Plan'),
('enroll.plans_subtitle', 'enroll', 'header', 'text', 'Select the best plan for your practice'),
('enroll.plan_period', 'enroll', 'pricing', 'text', '/month'),
('enroll.pay_now', 'enroll', 'pricing', 'text', 'PAY NOW'),
('enroll.plan_basic_name', 'enroll', 'pricing', 'text', 'BASIC'),
('enroll.plan_basic_price', 'enroll', 'pricing', 'text', '$29'),
('enroll.plan_basic_desc', 'enroll', 'pricing', 'text', 'Essential features for small practices'),
('enroll.plan_basic_feature1', 'enroll', 'pricing', 'text', 'Access to Ready-to-use Kit'),
('enroll.plan_basic_feature2', 'enroll', 'pricing', 'text', 'Basic Data Centre access'),
('enroll.plan_basic_feature3', 'enroll', 'pricing', 'text', 'Community support'),
('enroll.plan_standard_name', 'enroll', 'pricing', 'text', 'STANDARD'),
('enroll.plan_standard_price', 'enroll', 'pricing', 'text', '$59'),
('enroll.plan_standard_desc', 'enroll', 'pricing', 'text', 'Best value for growing practices'),
('enroll.plan_standard_feature1', 'enroll', 'pricing', 'text', 'All BASIC features'),
('enroll.plan_standard_feature2', 'enroll', 'pricing', 'text', 'Full Data Centre access'),
('enroll.plan_standard_feature3', 'enroll', 'pricing', 'text', 'Trusted Alliance resources'),
('enroll.plan_standard_feature4', 'enroll', 'pricing', 'text', 'Priority support'),
('enroll.plan_premium_name', 'enroll', 'pricing', 'text', 'PREMIUM'),
('enroll.plan_premium_price', 'enroll', 'pricing', 'text', '$99'),
('enroll.plan_premium_desc', 'enroll', 'pricing', 'text', 'Full access and personalized support'),
('enroll.plan_premium_feature1', 'enroll', 'pricing', 'text', 'All STANDARD features'),
('enroll.plan_premium_feature2', 'enroll', 'pricing', 'text', '1-on-1 consulting'),
('enroll.plan_premium_feature3', 'enroll', 'pricing', 'text', 'Custom integrations'),
('enroll.plans_include_title', 'enroll', 'info', 'text', 'All Plans Include'),
('enroll.guarantee_title', 'enroll', 'info', 'text', 'Money-Back Guarantee'),
('enroll.guarantee_text', 'enroll', 'info', 'text', '30-day satisfaction guarantee'),
('enroll.cancel_title', 'enroll', 'info', 'text', 'Cancel Anytime'),
('enroll.cancel_text', 'enroll', 'info', 'text', 'No long-term commitment required'),
('enroll.secure_title', 'enroll', 'info', 'text', 'Secure Payment'),
('enroll.secure_text', 'enroll', 'info', 'text', 'Your data is safe with us'),

-- Navigation
('nav.contact', 'navigation', 'menu', 'text', 'Contact Us')

ON CONFLICT (key) DO UPDATE SET 
    default_text = EXCLUDED.default_text,
    page = EXCLUDED.page,
    section = EXCLUDED.section;
