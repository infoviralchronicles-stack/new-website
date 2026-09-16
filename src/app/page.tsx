import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import NewsletterBox from '@/components/blog/NewsletterBox';
import AdSlot from '@/components/ads/AdSlot';
import { 
  getAllCategories, 
  getFeaturedPosts, 
  getTrendingPosts, 
  getPublishedPosts 
} from '@/lib/blog-service';
import { TrendingUp, ArrowRight, Layers } from 'lucide-react';

import { SITE_CONFIG } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const categories = getAllCategories();
  const featured = getFeaturedPosts(4);
  const trending = getTrendingPosts(5);
  const { posts: latestPosts } = getPublishedPosts(12, 0);

  const mainFeatured = featured[0];
  const secondaryFeatured = featured.slice(1, 4);

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.siteUrl}/#website`,
        url: SITE_CONFIG.siteUrl,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: {
          '@id': `${SITE_CONFIG.siteUrl}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: SITE_CONFIG.legalName,
        url: SITE_CONFIG.siteUrl,
        logo: `${SITE_CONFIG.siteUrl}/favicon.ico`,
        sameAs: []
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <Header categories={categories} />


      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase flex-shrink-0 z-10 bg-white dark:bg-zinc-900 pr-2">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 z-10" />
          <div className="relative flex-1 overflow-hidden">
            <div className="animate-marquee items-center space-x-8 text-sm">
              {[...trending, ...trending].map((p, i) => (
                <Link
                  key={`${p.id}-${i}`}
                  href={`/post/${p.slug}`}
                  className="flex items-center whitespace-nowrap text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mr-6"
                >
                  <span className="font-bold text-zinc-400 mr-2">#0{(i % trending.length) + 1}</span>
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {mainFeatured && (
                <PostCard post={mainFeatured} variant="featured-large" />
              )}
            </div>

            <div className="flex flex-col gap-4">
              {secondaryFeatured.map((post) => (
                <PostCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center">
              <Layers className="w-4 h-4 mr-2 text-indigo-600" />
              Explore Coverage by Niche
            </h2>
            <span className="text-xs text-zinc-400">7 Verified Domains</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="group p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 flex flex-col items-center text-center hover:border-indigo-500 transition-all"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full mb-1.5 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Latest Stories</h2>
                <p className="text-sm text-zinc-500">Independent, filtered, and AI-augmented reporting</p>
              </div>
              <Link
                href="/category/technology"
                className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <aside className="space-y-8">

            <div className="p-5 pb-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center mb-4">
                <TrendingUp className="w-4 h-4 mr-2 text-red-500" />
                Most Read Across Niches
              </h3>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {trending.map((post) => (
                  <PostCard key={post.id} post={post} variant="trending-item" />
                ))}
              </div>
            </div>

            <NewsletterBox />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
