import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Check specifically for optional/missing env vars
  if (!url || !anonKey || url === 'undefined' || anonKey === 'undefined') {
    if (import.meta.env.DEV) {
      console.warn('Supabase credentials missing in development');
    } else {
      console.error('Supabase credentials missing in production. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    }
    return null;
  }

  try {
    if (typeof url !== 'string' || !url.startsWith('http')) {
      console.error(`Invalid VITE_SUPABASE_URL: ${url}`);
      return null;
    }
    supabase = createClient(url, anonKey);
    return supabase;
  } catch (err) {
    console.error('Supabase initialization error', err);
    return null;
  }
}

export default getSupabaseClient;