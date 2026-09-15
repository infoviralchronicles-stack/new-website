import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllCategories } from '@/lib/blog-service';

export default async function TermsPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={categories} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: September 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Welcome to NexusSphere Magazine. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the platform.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">1. Intellectual Property</h3>
          <p>
            All original text, graphics, logos, and compilations presented on NexusSphere are owned by or licensed to NexusSphere Media Inc. and are protected by international copyright laws.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">2. AI-generated and Syndicated Content</h3>
          <p>
            Our platform utilizes ai-assisted research and generation tools to audt public trends. While we strive for pinnacle faitness and factual accuracy, content is provided for informational purposes only.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">3. Limitation of Liability</h3>
          <p>
            NexusSphere shall not be held liable for any indirect, incidental, or consequential damages arising from your reliance on articles, advertisements, or links contained herein.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
