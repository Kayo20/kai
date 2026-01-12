import React, { useEffect, useState, useMemo } from 'react';
import { Save, Search, Menu, X, LayoutDashboard, Users, Settings, BarChart3, TrendingUp, ChevronDown, Lock, ShieldCheck } from 'lucide-react';
import getSupabaseClient from '@/lib/supabase';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { loadSupabaseTranslations } from '@/i18n';

type ContentKey = {
    id: string;
    key: string;
    page: string | null;
    section: string | null;
    type: string | null;
    default_text: string | null;
};

type Translation = {
    id: string;
    content_key_id: string;
    locale: string;
    text: string | null;
};

export default function AdminPage() {
    const supabase = getSupabaseClient();
    const [keys, setKeys] = useState<ContentKey[]>([]);
    const [translations, setTranslations] = useState<Record<string, Translation[]>>({});
    const [loading, setLoading] = useState(false);
    const [editedText, setEditedText] = useState<Record<string, Record<string, string>>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [activeNav, setActiveNav] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('admin_authenticated') === 'true';
    });
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const LOCALES = ['en', 'es', 'fr'];

    useEffect(() => {
        if (!supabase || !isAuthenticated) return;
        fetchKeys();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supabase, isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'KaisgcAdmin190') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setLoginError(false);
            toast.success('Welcome back, Admin');
        } else {
            setLoginError(true);
            toast.error('Invalid password');
        }
    };

    async function fetchKeys() {
        setLoading(true);
        const s = getSupabaseClient();
        if (!s) return;
        const { data, error } = await s.from('content_keys').select('*').order('page').limit(2000);
        if (error) {
            console.error(error);
            toast.error('Failed to fetch keys');
        }
        setKeys((data || []) as ContentKey[]);

        const edits: Record<string, Record<string, string>> = {};
        const translationsMap: Record<string, Translation[]> = {};

        const ids = (data || []).map((k: ContentKey) => k.id).filter(Boolean);
        if (ids.length) {
            const { data: tdata, error: terr } = await s.from('translations').select('*').in('content_key_id', ids);
            if (terr) console.error(terr);

            (tdata || []).forEach((tr: Translation) => {
                translationsMap[tr.content_key_id] = translationsMap[tr.content_key_id] || [];
                translationsMap[tr.content_key_id].push(tr);
            });
            setTranslations(translationsMap);
        } else {
            setTranslations({});
        }

        (data || []).forEach((k: ContentKey) => {
            edits[k.id] = edits[k.id] || {};
            LOCALES.forEach((loc) => {
                const existing = (translationsMap[k.id] || []).find(t => t.locale === loc);
                edits[k.id][loc] = existing ? existing.text || '' : '';
            });
        });
        setEditedText(edits);
        setLoading(false);
    }

    async function saveGroup(groupKey: string, groupKeys: ContentKey[]) {
        if (!supabase) return;
        setLoading(true);
        let updateCount = 0;
        for (const k of groupKeys) {
            const editsForKey = editedText[k.id] || {};
            for (const locale of LOCALES) {
                const newText = editsForKey[locale];
                if (typeof newText === 'undefined' || newText === '') continue;
                const payload = { content_key_id: k.id, locale, text: newText, updated_at: new Date().toISOString() };
                const { error } = await supabase.from('translations').upsert(payload, { onConflict: 'content_key_id,locale' });
                if (!error) updateCount++;
            }
        }
        if (updateCount > 0) {
            toast.success(`Saved section: ${groupKey}`, { description: `Updated ${updateCount} translation(s).` });
            await loadSupabaseTranslations();
            await fetchKeys();
        } else {
            toast.info('No changes to save in this section');
        }
        setLoading(false);
    }

    async function saveAll() {
        if (!supabase) return;
        setLoading(true);
        let updateCount = 0;
        for (const k of keys) {
            const editsForKey = editedText[k.id] || {};
            for (const locale of LOCALES) {
                const newText = editsForKey[locale];
                if (typeof newText === 'undefined' || newText === '') continue;
                const payload = { content_key_id: k.id, locale, text: newText, updated_at: new Date().toISOString() };
                const { error } = await supabase.from('translations').upsert(payload, { onConflict: 'content_key_id,locale' });
                if (!error) updateCount++;
            }
        }
        if (updateCount > 0) {
            toast.success('Saved successfully', { description: `Updated ${updateCount} translation(s).` });
            await loadSupabaseTranslations();
            await fetchKeys();
        } else {
            toast.info('No changes to save');
        }
        setLoading(false);
    }

    // Grouping logic
    const groupedKeys = useMemo(() => {
        const groups: Record<string, ContentKey[]> = {};
        keys.forEach(k => {
            if (searchQuery &&
                !k.key.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !k.default_text?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return;
            }
            const page = (k.page || 'other').toUpperCase();
            const section = (k.section || 'General').toUpperCase();
            const groupKey = `${page}: ${section}`;

            if (!groups[groupKey]) groups[groupKey] = [];
            groups[groupKey].push(k);
        });
        return groups;
    }, [keys, searchQuery]);

    const sortedPages = Object.keys(groupedKeys).sort();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden">
                    <div className="bg-[#0B4C6A] p-8 text-center text-white relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck className="w-24 h-24" />
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'M PLUS Rounded 1c' }}>Admin Access</h2>
                        <p className="text-slate-200 mt-2 text-sm font-medium">Please enter your password to continue</p>
                    </div>
                    <CardContent className="p-8 bg-white">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className={`h-12 border-slate-200 focus:border-[#0B4C6A] focus:ring-[#0B4C6A] transition-all text-center text-lg tracking-widest ${loginError ? 'border-red-500 bg-red-50 animate-shake' : ''}`}
                                    autoFocus
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 bg-[#0B4C6A] hover:bg-[#07384d] text-white font-bold text-lg rounded-xl transition-all shadow-lg active:scale-[0.98]"
                                style={{ fontFamily: 'M PLUS Rounded 1c' }}
                            >
                                Unlock Dashboard
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">


            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">

                            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 w-64 bg-gray-50 border-gray-200"
                                />
                            </div>

                            {/* User Dropdown */}
                            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">Seesam</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        <Button
                            onClick={saveAll}
                            disabled={!supabase || loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>

                    {/* System Configuration Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {sortedPages.map((groupKey) => (
                            <Card key={groupKey} className="bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col">
                                <CardHeader className="border-b border-gray-100 pb-4 flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg font-semibold text-gray-700 uppercase tracking-wider">
                                        {groupKey}
                                    </CardTitle>
                                    <Button
                                        size="sm"
                                        onClick={() => saveGroup(groupKey, groupedKeys[groupKey])}
                                        disabled={loading || !supabase}
                                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                    >
                                        <Save className="w-3 h-3" />
                                        <span>Send</span>
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-6 flex-1">
                                    <div className="space-y-8">
                                        {groupedKeys[groupKey].map((k) => (
                                            <div key={k.id} className="space-y-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-blue-600 truncate max-w-[200px]" title={k.key}>
                                                        {k.key}
                                                    </span>
                                                    {k.type === 'text' && (
                                                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                                                            Multiline
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {LOCALES.map((locale) => (
                                                        <div key={locale} className="space-y-1.5">
                                                            <div className="flex items-center justify-between">
                                                                <label className="text-[10px] font-semibold text-gray-400 uppercase">
                                                                    {locale}
                                                                </label>
                                                                {locale === 'en' && k.default_text && (
                                                                    <span className="text-[9px] text-gray-300 italic truncate max-w-[100px]" title={k.default_text}>
                                                                        Ref: {k.default_text}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {k.key.toLowerCase().includes('text') || k.key.toLowerCase().includes('description') || k.key.toLowerCase().includes('bio') ? (
                                                                <Textarea
                                                                    value={editedText[k.id]?.[locale] || ''}
                                                                    onChange={(e) => setEditedText(prev => ({
                                                                        ...prev,
                                                                        [k.id]: { ...prev[k.id], [locale]: e.target.value }
                                                                    }))}
                                                                    className="min-h-[100px] text-sm bg-gray-50/30 border-gray-200 focus:bg-white resize-none"
                                                                    placeholder={k.default_text || k.key}
                                                                />
                                                            ) : (
                                                                <Input
                                                                    value={editedText[k.id]?.[locale] || ''}
                                                                    onChange={(e) => setEditedText(prev => ({
                                                                        ...prev,
                                                                        [k.id]: { ...prev[k.id], [locale]: e.target.value }
                                                                    }))}
                                                                    className="h-9 text-sm bg-gray-50/30 border-gray-200 focus:bg-white"
                                                                    placeholder={k.default_text || k.key}
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Empty State */}
                    {sortedPages.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-gray-200">
                            <LayoutDashboard className="w-12 h-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No content keys found</h3>
                            <p className="text-gray-500 text-sm">Your database appears to be empty.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
