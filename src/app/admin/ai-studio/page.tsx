'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import { Sparkles, RefreshCw, Pen, Check, AlertCircle, ExternalLink, Loader } from 'lucide-react';
import Link from 'next/link';

export default function AIStudioPage() {
  const [categories, ] = useState<string[]>([
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Entertainment',
    'Travel',
    'Sports'
  ]);

  const [selectedNiche, setSelectedNiche] = useState('Technology');
  const [topics, setTopics] = useState<string[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [autoPublish, setAutoPublish] = useState(true);
  const [generatingTopic, setGeneratingTopic] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTopics = async (nicheName = selectedNiche) => {
    setLoadingTopics(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/ai/topics?niche=' + encodeURIComponent(nicheName) + '&count=4');
      const data = await res.json();
      if (data.success) {
        setTopics(data.topics);
      } else {
        setErrorMessage(data.error || 'Failed to discover topics');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoadingTopics(false);
    }
  };

  useEffect(() => {
    fetchTopics(selectedNiche);
  }, [selectedNiche]);


  const handleGenerate = async (topicToRun: string) => {
    if (!topicToRun.trim()) return;
    setGeneratingTopic(topicToRun);
    setErrorMessage(null);
    setLastGenerated(null);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: selectedNiche,
          topic: topicToRun,
          draft: !autoPublish
        })
      });
      const data = await res.json();
      if (data.success) {
        setLastGenerated(data);
        setCustomTopic('');
      } else {
        setErrorMessage(data.error || 'Article generation failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setGeneratingTopic(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminNav />


      <main className="max-w-7xl mx-auto px-4 sm;px-6 lg:x-8 py-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            NexusSphere Investigative AI Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Content Studio & Topic Orchestrator
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl">
            Discover high-traffic trending topics across all 7 niches, generate shockwave SEO articles with curated, copyright-safe images, and publish in one-click.
          </p>
        </div>


        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}


        {lastGenerated && (
          <div className="mb-6 p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:bg-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Article Generated Successfully!</div>
                <h3 className="font-bold text-lg mt-0.5">{lastGenerated.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{lastGenerated.excerpt}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                href={`/post/${lastGenerated.slug}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center gap-2 transition"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Post
              </Link>
            </div>
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-bold text-lg">1. Select Editorial Niche</h3>
                  <p className="text-xs text-zinc-500">Choose which vertical you want to discover new topics for</p>
                </div>
                <button
                  onClick={() => fetchTopics(selectedNiche)}
                  disabled={loadingTopics}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingTopics ? 'animate-spin' : ''}`} />
                  Refresh Trends
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedNiche(n)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
                      selectedNiche === n
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>


            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-lg mb-1">2. Discovered Trending Algorithmic Topics</h3>
              <p className="text-xs text-zinc-500 mb-5">
                Analyzed from current vertical metrics for maximum reader engagement.
              </p>

              {loadingTopics ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
                  <Loader className="w-6 h-6 animate-spin text-indigo-600" />
                  <span className="text-sm">Gemini analyzing trends in ${selectedNiche}...</span>
                </div>
              ) : topics.length === 0 ? (
                <div className="py-10 text-center text-zinc-400">
                  No topics yet. Click Refresh Trends above.
                </div>
              ) : (
                <div className="space-y-3">
                  {topics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-zinc-100 dark:bg-zinc-950/60 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="font-semibold text-sm">{topic}</span>
                      </div>

                      <button
                        onClick={() => handleGenerate(topic)}
                        disabled={generatingTopic !== null}
                        className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                      >
                        {generatingTopic === topic ? (
                          <><Loader className="w-3.5 h-3.5 animate-spin" /> Generating...</>
                        ) : (
                          <><Sparkles className="w-3.5 h-3.5" /> Generate Post</>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-lg mb-1">Custom Topic Generator</h3>
              <p className="text-xs text-zinc-500 mb-4">
                Input any specific headline or investigation you want AI to write.
              </p>


              <form onSubmit={(e) => { e.preventDefault(); handleGenerate(customTopic); }} className="space-y-4">
                <textarea
                  required
                  rows={3}
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g., How Autonomous Drone Logistics are Transforming Island Economies..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />


                <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:bg-indigo-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold">Publish Status</div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoPublish}
                        onChange={(e) => setAutoPublish(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.25px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {autoPublish ? 'Publish immediately to live blog' : 'Save as Draft for preview first'}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!customTopic.trim() || generatingTopic !== null}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  {generatingTopic === customTopic ? (
                    <><Loader className="w-4 h-4 animate-spin" /> Generating Article...</>
                  ) : (
                    <><Pen className="w-4 h-4" /> Generate Custom Article</>
                  )}
                </button>
              </form>
            </div>


            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:bg-indigo-900/40">
              <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mb-2">Image & SEO Compliance</h4>
              <ul className="text-xs text-indigo-800/80 dark:text-indigo-300/80 space-y-2">
                <li>‣ high-resolution, copyright-free Unsplash images curated per niche.</li>
                <li>‣ open graph, twitter card, and SEO-friendly meta slugs automatically built.</li>
                <li>₣articles include structured headings, excerpts, and reading times.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
