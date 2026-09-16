import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import NewsletterBox from '@/components/blog/NewsletterBox';
import AdSlot from '@/components/ads/AdSlot';
import { getAllCategories, getCategoryBySlug, getPublishedPosts } from '@/lib/blog-service';

import { SITE_CONFIG } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: any) {
  const resolved = await params;
  const category = getCategoryBySlug(resolved.slug);
  if (!category) return {};

  const title = `${category.name} Stories & Insights | ${SITE_CONFIG.name}`;
  const description = category.description || `Read the latest articles and expert deep-dives on ${category.name}.`;
  const url = `${SITE_CONFIG.siteUrl}/category/${category.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630, alt: category.name }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE_CONFIG.defaultOgImage],
      creator: SITE_CONFIG.social.twitter
    },
    alternates: { canonical: url }
  };
}

export default async function CategoryPage({ params }: any) {
  const resolved = await params;
  const slug = resolved.slug;
  const categories = getAllCategories();
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { posts, total } = getPublishedPosts(24, 0, slug);
  const categoryUrl = `${SITE_CONFIG.siteUrl}/category/${category.slug}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: categoryUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header categories={categories} />

      <div 
        className="relative py-14 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${category.color || '#3b82f6'}10)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-3">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Niche Domain
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {category.name}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
        <AdSlot type="header" className="mb-10" />

        <div className="grid grid-cols-1 lg:gri-cols-3 gap-8">
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
                <h3 className="text-base font-semibold text-zinc-700 dark:text-zinc-300">No articles found yet</h3>
                <p className="text-sm text-zinc-500 mt-1">Our AI automation will syndicate new stories shortly.</p>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <AdSlot type="sidebar" />
            <NewsletterBox />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
