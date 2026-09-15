import React from 'react';
import Link from 'next/link';
import { Clock, Eye, Sparkles } from 'lucide-react';
import { Post } from '@/lib/db';
import { formatMarkdownDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'featured-large' | 'trending-item';
  showExcerpt?: boolean;
}

export default function PostCard({ post, variant = 'default', showExcerpt = true }: PostCardProps) {
  const catColor = post.category_color || '#3b82f6';
  const catName = post.category_name || 'General';
  const catSlug = post.category_slug || 'technology';

  if (variant === 'featured-large') {
    return (
      <article className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col justify-end min-h-[420px] lg:min-h-[500px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={post.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200'}
            alt={post.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
        </div>

        <div className="relative z-10 p-6 lg:p-8 flex flex-col items-start">
          <div className="flex items-center space-x-3 mb-3">
            <Link
              href={`/category/${catSlug}`}
              style={{ backgroundColor: catColor }}
              className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
            >
              {catName}
            </Link>
            <span className="text-xs font-medium text-zinc-400 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" /> {post.reading_time} min read
            </span>
          </div>

          <h2>
            <Link 
              href={`/post/${post.slug}`}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors line-clamp-3 mb-3"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base line-clamp-2 mb-4 max-w-3xl">
            {post.excerpt}
          </p>

          <div className="flex items-center space-x-3 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-200">{post.author}</span>
            <span>&middot;</span>
            <span>{formatMarkdownDate(post.published_at)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'trending-item') {
    return (
      <article className="group flex items-start space-x-3.5 py-3.5 border-b border-zinc-200 dark:border-zinc-800/80 last:border-0">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
          <img
            src={post.cover_image || '/fallback.jpg'}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/category/${catSlug}`}
            style={{ color: catColor }}
            className="text-[11px] font-bold uppercase tracking-wider mb-1 inline-block"
          >
            {catName}
          </Link>
          <h3>
            <Link
              href={`/post/${post.slug}`}
              className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-zinc-500">
            <span>{formatMarkdownDate(post.published_at)}</span>
            <span>&middot;</span>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </article>
    );
  }

  // Default grid card
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={post.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <Link 
          href={`/category/${catSlug}`}
          style={{ backgroundColor: catColor }}
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white uppercase tracking-wider shadow-sm"
        >
          {catName}
        </Link>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-2">
          <span>{formatMarkdownDate(post.published_at)}</span>
          <span>&middot;</span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.reading_time} min read
          </span>
        </div>

        <h3 className="mb-2">
          <Link 
            href={`/post/${post.slug}`}
            className="text-lg font-bold line-clamp-2 text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug"
          >
            {post.title}
          </Link>
        </h3>

        {showExcerpt && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {post.author}
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:underline">
            Read Story →
          </span>
        </div>
      </div>
    </article>
  );
}
