-- STEP 2: Run this in Supabase SQL Editor AFTER Step 1
-- This adds English translations for all the new content keys

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
