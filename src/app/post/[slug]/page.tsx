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

import { SITE_CONFIG } from '@/lib/site-config';

export async function generateMetadata({ params }: any) {
  const resolved = await params;
  const post = getPostBySlug(resolved.slug);
  if (!post) return {};
  const siteUrl = SITE_CONFIG.siteUrl;
  const postUrl = `${siteUrl}/post/${post.slug}`;
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const imageUrl = post.cover_image || SITE_CONFIG.defaultOgImage;

  return {
    title,
    description,
    keywords: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
    authors: [{ name: post.author || 'Nexus Editorial' }],
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: SITE_CONFIG.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: [post.author || 'Nexus Editorial']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.social.twitter
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
  const siteUrl = SITE_CONFIG.siteUrl;
  const postUrl = `${siteUrl}/post/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    headline: post.title,
    description: post.excerpt,
    image: [post.cover_image || SITE_CONFIG.defaultOgImage],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: [{
      '@type': 'Person',
      name: post.author || 'Nexus Editorial',
      url: `${siteUrl}/about`
    }],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`
      }
    },
    articleSection: post.category_name,
    keywords: post.tags
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category_name,
        item: `${siteUrl}/category/${post.category_slug}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header categories={categories} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
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
            {(() => {
              // Function to render inline formatted text (links [anchor](url) and bold **text**)
              const renderInlineContent = (rawText: string) => {
                const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
                const tokens = rawText.split(tokenRegex);

                return tokens.map((token, tIdx) => {
                  if (token.startsWith('**') && token.endsWith('**')) {
                    return <strong key={tIdx} className="font-bold text-zinc-900 dark:text-white">{token.slice(2, -2)}</strong>;
                  }
                  const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
                  if (linkMatch) {
                    const [, anchorText, linkHref] = linkMatch;
                    const isInternal = linkHref.startsWith('/') || linkHref.includes('new-eta-rosy.vercel.app');
                    return (
                      <Link
                        key={tIdx}
                        href={linkHref}
                        className="font-semibold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4 hover:text-indigo-800 dark:hover:text-indigo-300 hover:decoration-indigo-500 transition-colors"
                        {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {anchorText}
                      </Link>
                    );
                  }
                  return token;
                });
              };

              return post.content.split(/\n\s*\n/).map((block: string, i: number) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

              // Horizontal Rule
              if (trimmed === '---' || trimmed === '***') {
                return <hr key={i} className="my-8 border-zinc-200 dark:border-zinc-800" />;
              }

              // Multi-line block that starts with heading: split heading from rest of paragraph if needed
              if (/^#{1,4}\s+/.test(trimmed)) {
                const lines = trimmed.split('\n');
                const firstLine = lines[0].trim();
                const restLines = lines.slice(1).join('\n').trim();

                const renderHeading = (line: string, keyIdx: string | number) => {
                  if (line.startsWith('# ')) {
                    return <h2 key={keyIdx} className="text-3xl sm:text-4xl font-extrabold mt-10 mb-5 text-zinc-900 dark:text-white tracking-tight">{line.replace(/^#\s+/, '')}</h2>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={keyIdx} className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-zinc-900 dark:text-white tracking-tight pb-2 border-b border-zinc-100 dark:border-zinc-800">{line.replace(/^##\s+/, '')}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={keyIdx} className="text-xl sm:text-2xl font-bold mt-8 mb-3 text-zinc-900 dark:text-white">{line.replace(/^###\s+/, '')}</h3>;
                  }
                  if (line.startsWith('#### ')) {
                    return <h4 key={keyIdx} className="text-lg font-bold mt-6 mb-2 text-zinc-800 dark:text-zinc-200">{line.replace(/^####\s+/, '')}</h4>;
                  }
                  return null;
                };

                return (
                  <React.Fragment key={i}>
                    {renderHeading(firstLine, `h-${i}`)}
                    {restLines && (
                      <p className="mb-6 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                        {renderInlineContent(restLines)}
                      </p>
                    )}
                  </React.Fragment>
                );
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
                  <ul key={i} className="space-y-2.5 my-5 list-disc pl-6 text-zinc-800 dark:text-zinc-200">
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

              // Numbered lists (1. Item)
              if (trimmed.split('\n').every(line => /^\d+\.\s+/.test(line.trim()))) {
                return (
                  <ol key={i} className="space-y-2.5 my-5 list-decimal pl-6 text-zinc-800 dark:text-zinc-200">
                    {trimmed.split('\n').map((item, idx) => {
                      const cleanItem = item.replace(/^\d+\.\s+/, '').trim();
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
                  </ol>
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

              return (
                <p key={i} className="mb-6 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {renderInlineContent(trimmed)}
                </p>
              );
            });
          })()}
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
