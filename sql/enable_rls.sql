-- Enable Row Level Security and create public read policies
-- This allows the anonymous key to read content from the database
-- Run this in your Supabase SQL Editor for the production project

-- Enable RLS on content_keys table
ALTER TABLE content_keys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to content_keys
CREATE POLICY "Allow public read access" ON content_keys
    FOR SELECT
    USING (true);

-- Enable RLS on translations table
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to translations
CREATE POLICY "Allow public read access" ON translations
    FOR SELECT
    USING (true);
