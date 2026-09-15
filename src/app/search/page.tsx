import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import AdSlot from '@/components/ads/AdSlot';
import { getAllCategories, getPublishedPosts } from '@/lib/blog-service';
import { Search as SearchIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: any) {
  const params = await searchParams;
  const q = (params.q || '').trim();
  const categories = getAllCategories();
  const { posts, total } = getPublishedPosts(24, 0, undefined, q);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header categories={categories} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
            <SearchIcon className="w-4 h-4" />
            <span>Search Results</span>
          </div>
          <h1 className="text-3-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {q ? `Query: \"${q}\"` : 'All Published Stories'}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Found {total} articles across Technology, Business, Health, Lifestyle, Entertainment, Travel & Sports.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
             ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">No results matching your search</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-md mx-auto">
              Try searching for different keywords or browse by category from the top navigation.
            </p>
          </div>
        )}

        <div className="mt-14">
          <AdSlot type="footer" />
        </div>
      </main>


      <Footer />
    </div>
  );
}
