import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import SocialShare from '@/components/blog/SocialShare';
import NewsletterBox from '@/components/blog/NewsletterBox';
import AdSlot from '@/components/ads/AdSlot';
import { getAllCategories, getPostBySlug, getRelatedPosts } from '@/lib/blog-service';
import { formatMarkdownDate } from '@/lib/utils';
import { Clock, Eye, Tag, ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: any) {
  const resolved = await params;
  const post = getPostBySlug(resolved.slug);
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexussphere.magazine';
  const postUrl = siteUrl + '/post/' + post.slug;
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: postUrl,
      siteName: 'NexusSphere',
      images: [{ url: post.cover_image || 'https://images.unsplash.com/photo-1518770660968-6d967f161d5a?q=80&w-1200', width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author || 'Nexus Editorial']
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: [post.cover_image || 'https://images.unsplash.com/photo-1518770660968-6d967f161d5a?q=80&w=1200']
    },
    alternates: { canonical: postUrl }
  };
}

export default async function PostDetailPage({ params }: any) {
  const resolved = await params;
  const slug = resolved.slug;
  const categories = getAllCategories();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.category_id, post.id, 3);
  const tagsList = post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexussphere.magazine';
  const postUrl = siteUrl + '/post/' + post.slug;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: [post.cover_image || 'https://images.unsplash.com/photo-1518770660968-6d967f161d5a?q=80&w=1200'],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: [{ '@type': 'Person', name: post.author || 'Nexus Editorial' }],
    publisher: { '@type': 'Organization', name: 'NexusSphere', logo: { '@type': 'ImageObject', url: siteUrl + '/icon.png' } },
    mainEntityOfPage: { '@type': 'WebPage', 'id': postUrl }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header categories={categories} />
      <main className="flex-1 max-w-7xl wull mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href={'/category/' + post.category_slug} className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to {post.category_name}
          </Link>
        </div>
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <Link href={'/category/' + post.category_slug} style={{ backgroundColor: post.category_color || '#3b82f6' }} className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
              {post.category_name}
            </Link>
            <span className="text-xs text-zinc-500 flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.reading_time} min read</span>
            <span className="text-xs text-zinc-500 flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {post.views} views</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed font-medium">
            {post.excerpt}
          </p>
          <div className="py-4 border-y border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              {post.author_avatar ? (
                <img src={post.author_avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {post.author ? post.author[0] : 'N'}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{post.author}</p>
                <p className="text-xs text-zinc-500">{formatMarkdownDate(post.published_at)}</p>
              </div>
            </div>
            <SocialShare url={'/post/' + post.slug} title={post.title} />
          </div>
          <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-10">
            <img src={post.cover_image || '/fallback.jpg'} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <AdSlot type="inarticle" />
          <div className="prose dark:prose-invert prose-indigo max-w-none leading-relaxed text-base sm:text-lg">
            {post.content.split('\n\n').map((block: string, i: number) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Horizontal Rule
              if (trimmed === '---' || trimmed === '***') {
                return <hr key={i} className="my-8 border-zinc-200 dark:border-zinc-800" />;
              }

              // Headings: H1, H2, H3, H4
              if (trimmed.startsWith('# ')) {
                return <h1 key={i} className="text-3xl sm:text-4xl font-extrabold mt-10 mb-5 text-zinc-900 dark:text-white tracking-tight">{trimmed.replace(/^#\s+/, '')}</h1>;
              }
              if (trimmed.startsWith('## ')) {
                return <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-zinc-900 dark:text-white tracking-tight pb-2 border-b border-zinc-100 dark:border-zinc-800">{trimmed.replace(/^##\s+/, '')}</h2>;
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={i} className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-zinc-900 dark:text-white">{trimmed.replace(/^###\s+/, '')}</h3>;
              }
              if (trimmed.startsWith('#### ')) {
                return <h4 key={i} className="text-lg font-bold mt-6 mb-2 text-zinc-800 dark:text-zinc-200">{trimmed.replace(/^####\s+/, '')}</h4>;
              }

              // Blockquotes
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={i} className="pl-5 border-l-4 border-indigo-600 dark:border-indigo-500 italic text-zinc-700 dark:text-zinc-300 my-6 bg-indigo-50/40 dark:bg-indigo-950/20 py-3 rounded-r-xl">
                    {trimmed.replace(/^>\s+/, '')}
                  </blockquote>
                );
              }

              // Bullet lists or checklists
              if (trimmed.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* ') || /^-\s*\[[ x]\]/i.test(line.trim()))) {
                return (
                  <ul key={i} className="space-y-2 my-5 list-disc pl-6 text-zinc-800 dark:text-zinc-200">
                    {trimmed.split('\n').map((item, idx) => {
                      const cleanItem = item.replace(/^[-*]\s*(\[[ x]\]\s*)?/i, '').trim();
                      const parts = cleanItem.split(/(\*\*.*?\*\*)/g);
                      return (
                        <li key={idx} className="leading-relaxed">
                          {parts.map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={pIdx} className="font-bold text-zinc-900 dark:text-white">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </li>
                      );
                    })}
                  </ul>
                );
              }

              // Tables
              if (trimmed.includes('|') && trimmed.includes('\n')) {
                const rows = trimmed.split('\n').filter(r => r.trim() && !r.includes('---'));
                if (rows.length > 1) {
                  const headers = rows[0].split('|').map(c => c.trim()).filter(Boolean);
                  const dataRows = rows.slice(1);
                  return (
                    <div key={i} className="overflow-x-auto my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/80">
                          <tr>
                            {headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 py-3 text-left font-bold text-zinc-900 dark:text-white">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                          {dataRows.map((r, rIdx) => {
                            const cells = r.split('|').map(c => c.trim()).filter(Boolean);
                            return (
                              <tr key={rIdx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                                {cells.map((c, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{c}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              // Standard Paragraph with bold formatting (**text**)
              const parts = trimmed.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={i} className="mb-6 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {parts.map((part, pIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={pIdx} className="font-bold text-zinc-900 dark:text-white">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>
          {tagsList.length > 0 && (
            <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center mr-2"><Tag className="w-3.5 h-3.5 mr-1" /> Tagged:</span>
              {tagsList.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">#{tag}</span>
              ))}
            </div>
          )}
          <div className="my-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:bg-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Enjoyed this analysis?</h4>
              <p className="text-xs text-zinc-500">Share it with leaders and peers in your network.</p>
            </div>
            <SocialShare url={'/post/' + post.slug} title={post.title} />
          </div>
          <AdSlot type="footer" />
        </article>
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-2xl font-extrabold tracking-tight mb-8">Related Stories in {post.category_name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel: any) => (
                <PostCard key={rel.id} post={rel} />
              ))}
            </div>
          </section>
        )}
        <div className="mt-16"><NewsletterBox /></div>
      </main>
      <Footer />
    </div>
  );
}
