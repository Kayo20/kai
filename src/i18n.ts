import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

/**
 * Load translations from Supabase at runtime and merge into i18next resources.
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to be set.
 */
export async function loadSupabaseTranslations() {
  try {
    // lazy import to avoid hard dependency when env vars are missing
    const getSupabaseClient = (await import('@/lib/supabase')).default;
    const supabase = getSupabaseClient();
    if (!supabase) return;

    // fetch translations joined with content keys
    const { data, error } = await supabase
      .from('translations')
      .select('text, locale, content_keys(key)');

    if (error) {
      console.warn('Supabase translations load error', error);
      return;
    }

    (data || []).forEach((row: { content_keys?: { key?: string }; locale?: string; text?: string }) => {
      const key = row.content_keys?.key;
      const locale = row.locale;
      const text = row.text;
      if (!key || !locale) return;
      // merge into existing resources
      i18n.addResourceBundle(locale, 'translation', { [key]: text }, true, true);
    });
  } catch (err) {
    // ignore — application should still work without Supabase
    console.warn('Could not load runtime translations:', err);
  }
}

export default i18n;
