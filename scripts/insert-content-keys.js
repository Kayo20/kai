// Script to insert content keys directly into Supabase
// Run with: node scripts/insert-content-keys.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://yzilrdxggwbioqgvtxrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6aWxyZHhnZ3diaW9xZ3Z0eHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTk3OTQsImV4cCI6MjA4MzQ3NTc5NH0.0J2c_aW74qbp-bnubzZb51RAlKQhqijWtEB5PNhkoXc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Content keys to insert
const contentKeys = [
    // Events Page (7 keys)
    { key: 'nav.events', page: 'events', section: 'header', type: 'text', default_text: 'Events' },
    { key: 'events.loading', page: 'events', section: 'status', type: 'text', default_text: 'Loading events...' },
    { key: 'events.error_msg', page: 'events', section: 'status', type: 'text', default_text: 'Please try again later or contact support.' },
    { key: 'events.not_found', page: 'events', section: 'status', type: 'text', default_text: 'No upcoming events at the moment' },
    { key: 'events.check_back', page: 'events', section: 'status', type: 'text', default_text: 'Check back soon for new events!' },
    { key: 'view_event', page: 'events', section: 'button', type: 'text', default_text: 'View Event' },
    { key: 'view_all_events', page: 'events', section: 'button', type: 'text', default_text: 'View All Events' },

    // Contact Page (13 keys)
    { key: 'contact.title', page: 'contact', section: 'header', type: 'text', default_text: 'Book a Meeting' },
    { key: 'contact.subtitle', page: 'contact', section: 'header', type: 'text', default_text: 'Schedule a one-on-one consultation with our team' },
    { key: 'contact.bookings_text', page: 'contact', section: 'bookings', type: 'text', default_text: 'Schedule a convenient time to discuss your needs' },
    { key: 'contact.form_title', page: 'contact', section: 'form', type: 'text', default_text: 'Send a Message' },
    { key: 'contact.form_description', page: 'contact', section: 'form', type: 'text', default_text: 'Fill out the form below and we will get back to you as soon as possible' },
    { key: 'contact.company_label', page: 'contact', section: 'form', type: 'text', default_text: 'Company Name' },
    { key: 'contact.email_title', page: 'contact', section: 'email', type: 'text', default_text: 'Prefer Email?' },
    { key: 'contact.email_subtitle', page: 'contact', section: 'email', type: 'text', default_text: 'Click below to send us an email' },
    { key: 'name', page: 'contact', section: 'form', type: 'text', default_text: 'Name' },
    { key: 'email', page: 'contact', section: 'form', type: 'text', default_text: 'Email' },
    { key: 'message', page: 'contact', section: 'form', type: 'text', default_text: 'Message' },
    { key: 'submit', page: 'contact', section: 'form', type: 'text', default_text: 'Send Message' },
    { key: 'legal.send_email_button', page: 'contact', section: 'email', type: 'text', default_text: 'Send Email' },

    // Enroll Page (30 keys)
    { key: 'enroll.plans_title', page: 'enroll', section: 'header', type: 'text', default_text: 'Choose Your Plan' },
    { key: 'enroll.plans_subtitle', page: 'enroll', section: 'header', type: 'text', default_text: 'Select the best plan for your practice' },
    { key: 'enroll.plan_period', page: 'enroll', section: 'pricing', type: 'text', default_text: '/month' },
    { key: 'enroll.pay_now', page: 'enroll', section: 'pricing', type: 'text', default_text: 'PAY NOW' },
    { key: 'enroll.plan_basic_name', page: 'enroll', section: 'pricing', type: 'text', default_text: 'BASIC' },
    { key: 'enroll.plan_basic_price', page: 'enroll', section: 'pricing', type: 'text', default_text: '$29' },
    { key: 'enroll.plan_basic_desc', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Essential features for small practices' },
    { key: 'enroll.plan_basic_feature1', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Access to Ready-to-use Kit' },
    { key: 'enroll.plan_basic_feature2', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Basic Data Centre access' },
    { key: 'enroll.plan_basic_feature3', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Community support' },
    { key: 'enroll.plan_standard_name', page: 'enroll', section: 'pricing', type: 'text', default_text: 'STANDARD' },
    { key: 'enroll.plan_standard_price', page: 'enroll', section: 'pricing', type: 'text', default_text: '$59' },
    { key: 'enroll.plan_standard_desc', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Best value for growing practices' },
    { key: 'enroll.plan_standard_feature1', page: 'enroll', section: 'pricing', type: 'text', default_text: 'All BASIC features' },
    { key: 'enroll.plan_standard_feature2', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Full Data Centre access' },
    { key: 'enroll.plan_standard_feature3', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Trusted Alliance resources' },
    { key: 'enroll.plan_standard_feature4', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Priority support' },
    { key: 'enroll.plan_premium_name', page: 'enroll', section: 'pricing', type: 'text', default_text: 'PREMIUM' },
    { key: 'enroll.plan_premium_price', page: 'enroll', section: 'pricing', type: 'text', default_text: '$99' },
    { key: 'enroll.plan_premium_desc', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Full access and personalized support' },
    { key: 'enroll.plan_premium_feature1', page: 'enroll', section: 'pricing', type: 'text', default_text: 'All STANDARD features' },
    { key: 'enroll.plan_premium_feature2', page: 'enroll', section: 'pricing', type: 'text', default_text: '1-on-1 consulting' },
    { key: 'enroll.plan_premium_feature3', page: 'enroll', section: 'pricing', type: 'text', default_text: 'Custom integrations' },
    { key: 'enroll.plans_include_title', page: 'enroll', section: 'info', type: 'text', default_text: 'All Plans Include' },
    { key: 'enroll.guarantee_title', page: 'enroll', section: 'info', type: 'text', default_text: 'Money-Back Guarantee' },
    { key: 'enroll.guarantee_text', page: 'enroll', section: 'info', type: 'text', default_text: '30-day satisfaction guarantee' },
    { key: 'enroll.cancel_title', page: 'enroll', section: 'info', type: 'text', default_text: 'Cancel Anytime' },
    { key: 'enroll.cancel_text', page: 'enroll', section: 'info', type: 'text', default_text: 'No long-term commitment required' },
    { key: 'enroll.secure_title', page: 'enroll', section: 'info', type: 'text', default_text: 'Secure Payment' },
    { key: 'enroll.secure_text', page: 'enroll', section: 'info', type: 'text', default_text: 'Your data is safe with us' },

    // Navigation (1 key)
    { key: 'nav.contact', page: 'navigation', section: 'menu', type: 'text', default_text: 'Contact Us' }
];

async function insertContentKeys() {
    console.log('🚀 Starting content keys insertion...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const contentKey of contentKeys) {
        try {
            const { data, error } = await supabase
                .from('content_keys')
                .upsert(contentKey, { onConflict: 'key' })
                .select();

            if (error) {
                console.error(`❌ Error inserting ${contentKey.key}:`, error.message);
                errorCount++;
            } else {
                console.log(`✅ Inserted: ${contentKey.key}`);
                successCount++;
            }
        } catch (err) {
            console.error(`❌ Exception inserting ${contentKey.key}:`, err.message);
            errorCount++;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${contentKeys.length}`);
}

// Run the insertion
insertContentKeys()
    .then(() => {
        console.log('\n✨ Content keys insertion complete!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('\n💥 Fatal error:', err);
        process.exit(1);
    });
