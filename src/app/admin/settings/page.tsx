'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { Key, Layers, Check, Loader, AlertCircle, Save } from 'lucide-react';
export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'NexusSphere',
    site_description: 'The Premier Cross-Niche Journal & Digital Dispatch',
    gemini_api_key: '',
    auto_generate_enabled: '1',
    auto_publish: '1',
    ads_enabled: '1',
    google_analytics_id: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('System settings saved successfully!');
        setTimeout(() => setMessage(null), 3500);
      } else {
        setErrorMessage(data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminNav />


      <main className="max-w-4xl mx-auto px-4 sm;px-6 lg:x-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Platform Settings & Automation Config
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Configure our proprietary Gemini AI engine, monetization ad placements, and scheduled auto-pilot publishing.
          </p>
        </div>


        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-2.5">
            <Check className="w-5 h-5" />
            <span>{message}</span>
          </div>
        )}


        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5" />
            <span>{errorMessage}</span>
          </div>
        )}


        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base">AI Configuration (Gemini 2.5)</h3>
                <p className="text-xs text-zinc-500">Connect Google Gemini for autonomous article generation</p>
              </div>
            </div>


            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                Gemini API Key
              </label>
              <input
                type="password"
                value={settings.gemini_api_key || ''}
                onChange={(e) => setSettings({ ...settings, gemini_api_key: e.target.value })}
                placeholder="AIzaSy... (Leave empty to use built-in niche fallback engine)"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-zinc-500 mt-1">
                When no key is found, the system automatically switches to high-definition editorial articles.
              </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60">
                <div>
                  <div className="font-semibold text-sm">Scheduled Automation</div>
                  <div className="text-xs text-zinc-500">Allow background cron generation</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.auto_generate_enabled === '1' || settings.auto_generate_enabled === 'true'}
                  onChange={(e) => setSettings({ ...settings, auto_generate_enabled: e.target.checked ? '1' : '0' })}
                  className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60">
                <div>
                  <div className="font-semibold text-sm">Auto-Publish Dispatch</div>
                  <div className="text-xs text-zinc-500">Publish directly without draft stage</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.auto_publish === '1' || settings.auto_publish === 'true'}
                  onChange={(e) => setSettings({ ...settings, auto_publish: e.target.checked ? '1' : '0' })}
                  className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>


          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base">Monetization & Ads</h3>
                <p className="text-xs text-zinc-500">Control responsive ad slots across header, in-feed, and sidebar</p>
              </div>
            </div>


            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60">
              <div>
                <div className="font-semibold text-sm">Enable Display Advertising</div>
                <div className="text-xs text-zinc-500">When disabled, all ad placeholders and banners are hidden</div>
              </div>
              <input
                type="checkbox"
                checked={settings.ads_enabled === '1' || settings.ads_enabled === 'true'}
                onChange={(e) => setSettings({ ...settings, ads_enabled: e.target.checked ? '1' : '0' })}
                className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>


          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-400 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              {saving ? (
                <><Loader className="w-4 h-4 animate-spin" /> Saving Config...</>
              ) : (
                <><Save className="w-4 h-4" /> Save Configuration</>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
