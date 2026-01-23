# Adding Content Keys to Supabase - Instructions

## Quick Start

Follow these 3 simple steps to add all missing content keys to your Supabase database:

### Step 1: Insert Content Keys
1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/yzilrdxggwbioqgvtxrc/sql/new
2. Copy the contents of `sql/step1_insert_keys.sql`
3. Paste into the SQL Editor
4. Click "Run" or press Ctrl+Enter
5. You should see: **51 rows affected** (51 new content keys added)

### Step 2: Add English Translations
1. In the same SQL Editor
2. Copy the contents of `sql/step2_insert_english.sql`
3. Paste and Run
4. You should see: **51 rows affected** (English translations added)

### Step 3: Add Spanish & French Translations
1. In the same SQL Editor
2. Copy the contents of `sql/step3_insert_translations.sql`
3. Paste and Run
4. You should see: **102 rows affected** (Spanish and French translations added)

## What Gets Added

### Events Page (7 keys)
- Page title, loading states, error messages, button labels

### Contact Page (13 keys)
- Form labels, titles, descriptions, button text

### Enroll Page (30 keys)
- Pricing plan names, prices, descriptions
- Feature lists for all 3 plans (Basic, Standard, Premium)
- Additional info sections (guarantee, cancellation, security)

### Navigation (1 key)
- Contact Us link

## Verification

After running all 3 steps:

1. Go to your Admin page: http://localhost:5173/admin
2. Login with password: `KaisgcAdmin190`
3. You should now see cards for:
   - EVENTS sections
   - CONTACT sections  
   - ENROLL sections
4. Try editing any text and click "Send" to save
5. Navigate to the actual pages to see your changes!

## Total Added
- **51 content keys**
- **153 translations** (51 × 3 languages)
- **All pages now editable via Admin panel!**

## Alternative: Run All at Once

If you prefer, you can also run the complete script:
- File: `sql/seed_all_pages_content.sql`
- This combines all 3 steps into one

## Troubleshooting

If you get errors:
1. Make sure you're logged into Supabase
2. Verify you're in the correct project (nft-app / yzilrdxggwbioqgvtxrc)
3. Check that the `locales` table has entries for 'en', 'es', 'fr'
4. If duplicate key errors appear, that's OK - it means some keys already exist

## Next Steps

Once complete:
1. Test the Admin page - edit some content
2. Check each page (Events, Contact, Enroll) in different languages
3. All text should now be editable through the Admin panel!
