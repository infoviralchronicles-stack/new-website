'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import Link from 'next/link';
import { LayoutDashboard, Search, Check, Sparkles, ExternalLink, Trash2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [message, setMessage] = useState<string | null>(null);

  function fetchPosts() {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPosts(data.posts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.filter(p => p.id !== id));
        setMessage('Post deleted successfully');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleToggleStatus = async (post: any) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
        setMessage(`post updated to ${newStatus}`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      alert('Failed to update post');
    }
  };


  const handleToggleFeatured = async (post: any) => {
    const newVal = post.featured ? 0 : 1;
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, featured: newVal })
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, featured: newVal } : p));
      }
    } catch (err) {}
  };

  const filtered = posts.filter((post) => {
    if (selectedStatus !== 'all' && post.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.category_name?.toLowerCase().includes(q);
    }
    return true;
  });

  const totalViews = posts.reduce((a, b) => a + (b.views || 0), 0);
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminNav />


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}


        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Content & Posts Manager</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Oversee, filter, edit, and publish all editorial articles across your 7 niches.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/ai-studio"
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 flex items-center gap-2 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 transition"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI Studio
            </Link>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total Articles</div>
            <div className="text-2xl font-extrabold mt-1">{posts.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Published</div>
            <div className="text-2xl font-extrabold mt-1 text-emerald-600">{publishedCount}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Drafts</div>
            <div className="text-2xl font-extrabold mt-1 text-amber-600">{draftCount}</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Reader Views</div>
            <div className="text-2xl font-extrabold mt-1 text-indigo-600">{totalViews.toLocaleString()}</div>
          </div>
        </div>


        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title or niche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <div className="flex items-center gap-2 w-full sm:w-auto">
            {([ { key: 'all', label: 'All' }, { key: 'published', label: 'Published' }, { key: 'draft', label: 'Drafts' } ]).map((stat) => (
              <button
                key={stat.key}
                onClick={() => setSelectedStatus(stat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedStatus === stat.key
                    ? 'bg-indigo-600 text-white'
                    : 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100'
                }`}
              >
                {stat.label}
              </button>
            ))}
          </div>
        </div>


        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/50 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-4">Article Title</th>
                  <th className="px-4 py-4">Niche</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Featured</th>
                  <th className="px-4 py-4">Views</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                      Loading editorial posts...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                      No articles found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((post) => (
                    <tr key={post.id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-2 mt-0.5">
                          <span>By {post.author || 'Editorial'}</span>
                          <span>₧</span>
                          <span>{post.reading_time} min read</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: `${post.category_color || '#6366f1'}20`, color: post.category_color || '#6366f1' }}
                        >
                          {post.category_name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleStatus(post)}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                            post.status === 'published'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleToggleFeatured(post)}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            post.featured
                              ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                              : 'text-zinc-400 hover:text-zinc-600'
                          }`}
                        >
                          {post.featured ? '  Featured' : '₄ Standard'}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-zinc-600 dark:text-zinc-400">
                        {post.views || 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/post/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-indigo-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                            title="Preview Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
