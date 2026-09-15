import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllCategories } from '@/lib/blog-service';
import { Shield, Cpu, Globe, Award, Sparkles } from 'lucide-react';

export default async function AboutPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={categories} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            OUR MISSION & ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            About NexusSphere Magazine
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            NexusSphere is an elevated multi-domain publication dedicated to discovering, rigorously analyzing, and broadcasting the most consequential developments across global society.
          </p>
        </div>

        <div className="space-y-10">
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Rigorous, Modern Content For Discerning Minds</h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              We span 7 definitive niches: <strong>Technology, Business, Health, Lifestyle, Entertainment, Travel, and Sports</strong>. Our publication pairs investigative journalism with state-of-the-art AI automation to monitor world-wide trends, extract empirical data, and produce high-value deep-dives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Globe className="w-8 h-8 text-indigo-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Global Perspective</h3>
              <p className="text-sm text-zinc-500">Covering markets, cultures, and innovations from Silicon Valley to Tokyo and Berlin.</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Shield className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Integrity & Essence</h3>
              <p className="text-sm text-zinc-500">Filtering the noise of 24/7 hype cycles to deliver only actionable knowledge.</p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Award className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-bold text-base mb-2">Premium Editorial</h3>
              <p className="text-sm text-zinc-500">Crafted for high-performing executives, researchers, and lifelong learners.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
