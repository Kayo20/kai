
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n, { loadSupabaseTranslations } from './i18n';

// Attempt to merge Supabase-managed translations at startup when env is configured.
loadSupabaseTranslations().catch((err) => console.warn('runtime translations failed', err)).finally(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
