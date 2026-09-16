import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllCategories } from '@/lib/blog-service';

import { SITE_CONFIG } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Disclaimer & Affiliate Disclosure | ${SITE_CONFIG.name}`,
  description: `Editorial disclaimer, financial/medical disclosures, and affiliate notice for ${SITE_CONFIG.name}.`,
  alternates: { canonical: `${SITE_CONFIG.siteUrl}/disclaimer` }
};

export default async function DisclaimerPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={categories} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Disclaimer & Affiliate Disclosure
        </h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: September 2026</p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            The information provided by NexusSphere Magazine on our platform is for general educational, cultural, and informational purposes only.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">1. No Financial or Investment Advice</h3>
          <p>
            None of the business, startup, crypto, or market reporting constitutes financial, investment, or legal advice. Always consult with a certified financial advisor before executing investment decisions.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">2. No Medical Advice</h3>
          <p>
            Our health, longevity, and biohacking articles do not constitute medical diagnosis or treatment plans. Always seek individualized counsel from a board-certified physician.
          </p>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">3. Affiliate & Advertising Links</h3>
          <p>
            Some links on NexusSphere may be affiliate or sponsored links, for which we may receive a commission at no additional cost to you. We protect editorial independence and only recommend products and services we truly verify.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
