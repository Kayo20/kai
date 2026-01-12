import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url === 'undefined' || anonKey === 'undefined') {
    return null;
  }

  try {
    if (typeof url !== 'string' || !url.startsWith('http')) {
      console.error('Invalid VITE_SUPABASE_URL');
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